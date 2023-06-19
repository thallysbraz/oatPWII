import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export default function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validando token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("JWT Token is missing");
    }
    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, "secret");
        const { sub } = decoded;

        request.user = {
            name: sub,
        };
        return next();
    } catch {

    }
}
