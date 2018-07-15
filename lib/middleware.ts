import { Config } from "./Config";

/**
 * Interface for a request object containing parsed json on the body property
 */
export interface Request {
  body: object;
}

/**
 * Interface for a response object
 */
export interface Response {
  status: (responseStatus: number) => Response;
  json: (responseJson: object) => Response;
}

/**
 * called by middleware to continue the middleware chain
 */
export type Next = () => void;

/**
 * function type for express style middleware
 */
export type Middleware = (
  request: Request,
  response: Response,
  next: Next,
) => void;
