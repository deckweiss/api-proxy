import { env } from '$env/dynamic/private';
import { createApiProxy } from '$lib';

export const handle = createApiProxy({ apiUrl: env.API_URL, basePath: '/api/v1' });
