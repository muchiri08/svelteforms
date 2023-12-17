import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    //event.locals.user = "Muchiri";
    event.locals.user = 'Muchiri';

    return resolve(event);
}