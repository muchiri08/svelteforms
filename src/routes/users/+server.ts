import type { RequestEvent, RequestHandler } from "./$types";

export const GET: RequestHandler = async (request: RequestEvent) => {
    return new Response(request.locals.user);
}