# SvelteKit API-Proxy
This proxy is useful as soon as a man in the middle is required for injecting additional and sensitive information into the request to your backend.

## Installation

### Step 1: Install package
```sh
pnpm i @deckweiss/api-proxy
```

### Step 2: Create hook
```typescript
// src/hooks.server.ts

import { createApiProxy } from '@deckweiss/api-proxy';

export const handle = createApiProxy({
    apiUrl: 'https://example.com',
    basePath: '/api/v1' // if you requested path starts with this string, then it gets forwarded to {apiUrl}
})
```

## Injecting additional information

### Access Token
```typescript
createApiProxy({
     async middleware(event) {
        const accessToken = (await event.locals.auth())?.accessToken;
        if (accessToken) {
            event.request.headers.set('authorization', `Bearer ${accessToken}`);
        }
    }
})
```

### Prevent forwarding of specific headers
```typescript
createApiProxy({
     async middleware(event) {
        event.request.headers.delete('cookie')
    }
})
```
