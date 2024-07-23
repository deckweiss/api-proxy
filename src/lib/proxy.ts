import { type RequestEvent, type Handle } from '@sveltejs/kit';

interface Options {
    apiUrl: string;
    basePath: string;
    middleware?: (event: RequestEvent) => void | Promise<void>;
}

export function createApiProxy(options: Options) {
    const handleApiProxy: Handle = async ({ event, resolve }) => {
        if (event.url.pathname.startsWith(options.basePath)) {
            // build the new URL path with your API base URL, the stripped path and the query string
            const urlPath = `${options.apiUrl}${event.url.pathname}${event.url.search}`;
            const proxiedUrl = new URL(urlPath);

            // Strip off header added by SvelteKit yet forbidden by underlying HTTP request
            // library `undici`.
            // https://github.com/nodejs/undici/issues/1470
            event.request.headers.delete('connection');

            if (options.middleware) {
                await options.middleware(event);
            }

            return fetch(proxiedUrl.toString(), {
                // propagate the request method and body
                body: event.request.body,
                method: event.request.method,
                headers: event.request.headers
            }).catch((err) => {
                console.log('Could not proxy API request: ', err);
                throw err;
            });
        }
        return resolve(event);
    };
    return handleApiProxy;
}
