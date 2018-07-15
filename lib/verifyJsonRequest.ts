import { Config } from "./config";
import { Middleware, Next, Request, Response } from "./middleware";
import { RequestJsonKey } from "./requestJsonKey";

export function verifyJsonRequest(config: Config): Middleware {
  if (!config) {
    throw new Error("No config object provided!");
  }
  return (request: Request, response: Response, next: Next): void => {
    return undefined;
  };
}
