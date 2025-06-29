# TimeLoop (Letters to Future Self)

## 🚀 Vercel Deployment Guide

This project is now ready for **fullstack deployment on Vercel** (frontend + backend API in one site).

### 1. Push to GitHub
Make sure all your changes are committed and pushed to your GitHub repository.

### 2. Deploy on Vercel
- Go to [vercel.com](https://vercel.com/) and sign up (use GitHub login).
- Click **"New Project"** and import your repo.
- Vercel will auto-detect your React app and the `api/` folder for serverless functions.
- Click **"Deploy"**.
- After a minute, you'll get a live URL (e.g., `yourproject.vercel.app`).

### 3. Set Environment Variables
In your Vercel dashboard, go to your project → Settings → Environment Variables and add:
- `MONGODB_URI` — your MongoDB connection string (e.g., `mongodb+srv://...` or `mongodb://localhost:27017/future_letters`)
- `JWT_SECRET` — a random string for JWT signing
- `EMAIL_USER` — your Gmail address (for email sending)
- `EMAIL_PASS` — your Gmail app password

### 4. API Usage
- All API endpoints are now available at `/api/...` (e.g., `/api/auth`, `/api/letters`, `/api/forum`, `/api/quotes`).
- The frontend is already configured to use these endpoints.

### 5. File Uploads
- File uploads are not supported in this Vercel serverless setup. For attachments, use a third-party service (like Cloudinary or S3) and update the code accordingly.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
