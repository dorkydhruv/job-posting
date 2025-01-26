import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Company } from "../model";

declare global {
  namespace Express {
    interface Request {
      company?: any;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    const company = await Company.findById(decoded.id);
    if (!company) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.company = company;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export const checkVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.company.emailVerified) {
    res.status(403).json({ message: "Account not verified" });
    return;
  }
  next();
};
