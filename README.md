# ID Unban Request - Vercel

## Deploy
1. Upload this folder/repository to GitHub, or import the project directly into Vercel.
2. Deploy with the default settings. No build command is required.
3. Open the deployed URL.
4. Enter a real numeric player UID and press CHECK ID.

The browser calls `/api/info?uid=...`, and the Vercel serverless function securely forwards the request to:
`https://dm-info7.vercel.app/info?uid=...`

This avoids the browser-side CORS problem caused by calling the external API directly from a local `file://` HTML page.
