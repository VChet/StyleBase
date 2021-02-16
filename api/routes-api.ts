import { Router } from "express";
import mcache from "memory-cache";
import rateLimit from "express-rate-limit";

import type { Request, Response, NextFunction } from "express";

import { Style } from "../models/Style";

import {
  getStyles,
  getRepositoryFiles,
  getStyleData,
  addStyle,
  updateAllStyles,
  updateStyle,
  editStyle,
  deleteStyle
} from "./styles";

import { getUser, getUserStats } from "./users";

export const router = Router();

// Cache
const cache = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  const key = `__express__${req.originalUrl}` || req.url;
  const cachedBody = mcache.get(key);
  if (cachedBody) return res.send(cachedBody);

  res.sendResponse = res.send;
  res.send = (body) => {
    if (process.env.NODE_ENV !== "production" && res.statusCode === 200) {
      mcache.put(key, body, duration * 60 * 1000);
    }
    return res.sendResponse(body);
  };
  next();
};
const clearCache = (_req: Request, _res: Response, next: NextFunction) => {
  mcache.clear();
  next();
};

// Rate limiter (allow 30 request per 60 minutes)
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: {
    status: 429,
    message: "Too many update requests made from this IP, please try again after 1 hour"
  },
  skip: () => process.env.NODE_ENV !== "production"
});

const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ error: "Request must contain _id field" });
  const existingStyle = await Style.findById(_id).lean();
  if (!existingStyle) return res.status(404).json({ error: "Style does not exist" });
  req.styleData = existingStyle;

  if (process.env.NODE_ENV !== "production") return next();

  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication is required to perform this action" });
  }
  const isAdmin = req.user.role === "Admin";
  const isOwner = [req.user.githubId, req.user.codebergId].includes(existingStyle.owner.id);
  const userOrgs = req.user.orgs.map((org) => org.id);
  const isMember = userOrgs.includes(existingStyle.owner.id);
  if (!isAdmin && !isOwner && !isMember) {
    return res.status(403).json({ error: "You are not authorized to perform this action" });
  }
  next();
};

router.get("/styles/:owner?", cache(10), getStyles);
router.get("/style/files", cache(10), getRepositoryFiles);
router.get("/style", cache(10), getStyleData);
router.post("/style/add", rateLimiter, addStyle);
router.put("/style/update/all", rateLimiter, clearCache, updateAllStyles);
router.put("/style/update", rateLimiter, clearCache, updateStyle);
router.patch("/style/edit", isAuthorized, clearCache, editStyle);
router.delete("/style/delete", isAuthorized, clearCache, deleteStyle);

router.get("/me", getUser);
router.get("/stats", getUserStats);

export default router;
