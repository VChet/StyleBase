import type { Request, Response } from "express";

import { Style } from "../models/Style";

export function getUser(req: Request, res: Response) {
  if (!req.user) return res.status(200).json({ error: "User session not found" });
  return res.status(200).json({ user: req.user });
}

export function getUserStyles(req: Request, res: Response) {
  const { githubId, codebergId } = req.query;
  if (!githubId && !codebergId) return res.status(400).json({ error: "Missing user id" });

  const ids: Array<number> = [];
  if (typeof githubId === "string") ids.push(parseInt(githubId, 10));
  if (typeof codebergId === "string") ids.push(parseInt(codebergId, 10));
  Style.find({ "owner.id": { $in: ids } }).lean().exec((error, styles) => {
    if (error) return res.status(500).json({ error });
    res.status(200).json({ styles });
  });
}
