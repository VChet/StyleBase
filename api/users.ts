import type { Request, Response } from "express";

export default function getCurrentUser(req: Request, res: Response) {
  if (!req.user) return res.status(200).json({ error: "User session not found" });
  return res.status(200).json({ user: req.user });
}
