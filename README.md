# Ed AI Interface

This project is a Vite + React application configured for deployment on Vercel.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Create a local `.env` file from `.env.example` and set:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

Add the same variables in your Vercel project settings before deploying.

## Vercel deployment

The included `vercel.json` configures:

- the Vite build command
- `dist` as the output directory
- SPA fallback routing to `index.html`
- immutable caching for compiled assets

You can deploy by importing the repo into Vercel or with:

```bash
vercel
```

## Production build

```bash
npm run build
```
