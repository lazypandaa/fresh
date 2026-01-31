# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# FreshMart Frontend

A modern e-commerce frontend built with React, Vite, and Tailwind CSS.

## 🚀 Live Demo

- **Backend API**: https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io

## 📋 Features

- User Authentication (Login/Signup/Guest)
- Product Browsing & Search
- Shopping Cart Management
- Checkout & Order Processing
- Bundle Recommendations
- Event Tracking & Analytics
- Responsive Design

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## 🚀 Deployment Options

This project includes GitHub Actions workflows for three deployment platforms:

### Option 1: Azure Static Web Apps (Recommended - matches your backend)

1. **Create Azure Static Web App**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Create a new "Static Web App" resource
   - Choose "GitHub" as deployment source
   - Select your repository and branch
   - Copy the deployment token

2. **Add GitHub Secret**:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: Paste the deployment token from Azure

3. **Deploy**:
   - The workflow file is already configured: `.github/workflows/azure-static-web-apps.yml`
   - Push to main branch, and GitHub Actions will automatically deploy
   - Your site will be live at: `https://<your-app-name>.azurestaticapps.net`

### Option 2: Vercel

1. **Get Vercel Token**:
   - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
   - Generate a new token

2. **Create Vercel Project**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel link` in your project directory
   - This creates `.vercel/project.json` with your project ID and org ID

3. **Add GitHub Secrets**:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: From `.vercel/project.json`
   - `VERCEL_PROJECT_ID`: From `.vercel/project.json`

4. **Deploy**:
   - Push to main branch
   - Or manually: `vercel --prod`

### Option 3: Netlify

1. **Get Netlify Token**:
   - Go to [Netlify User Settings](https://app.netlify.com/user/applications)
   - Create a new personal access token

2. **Create Netlify Site**:
   - Go to [Netlify Sites](https://app.netlify.com/sites)
   - Create new site from GitHub (or drag and drop)
   - Copy your Site ID from Site Settings

3. **Add GitHub Secrets**:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify token
   - `NETLIFY_SITE_ID`: Your site ID

4. **Deploy**:
   - Push to main branch
   - Or use Netlify CLI: `netlify deploy --prod`

## 📦 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 🔧 Configuration

The API backend URL is configured in [`src/config/api.js`](src/config/api.js):

```javascript
export const API_BASE_URL = 'https://freshmart-backend.ambitiousground-569ca432.centralindia.azurecontainerapps.io/api'
```

## 📝 GitHub Actions Workflows

Three workflow files are included (you only need to keep one):

1. **`.github/workflows/azure-static-web-apps.yml`** - For Azure Static Web Apps
2. **`.github/workflows/vercel-deploy.yml`** - For Vercel
3. **`.github/workflows/netlify-deploy.yml`** - For Netlify

**To use a specific platform:**
- Keep only the workflow file for your chosen platform
- Delete the other two workflow files
- Add the required secrets to your GitHub repository

## 🔐 Required GitHub Secrets

### For Azure:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`

### For Vercel:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### For Netlify:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

## 🌐 CORS Configuration

Ensure your Azure backend allows requests from your deployed frontend domain. Update CORS settings in your backend to include:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://your-app.azurestaticapps.net",
        "https://your-app.vercel.app",
        "https://your-app.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📄 License

MIT

## 👤 Author

GitHub: [@lazypandaa](https://github.com/lazypandaa)
