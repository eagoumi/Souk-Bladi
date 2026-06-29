# How to Host "Souk Bladna" on GitHub Pages

Since your project is a React/Vite app, the easiest way to host it for free is using **GitHub Pages**.

## Step 1: Create a Repository on GitHub
1. Go to [GitHub.com/new](https://github.com/new).
2. Name your repository (e.g., `souk-bladna`).
3. Make it **Public** (GitHub Pages is free for public repos).
4. Do **not** initialize with README, license, or gitignore (we already have these).
5. Click **Create repository**.

## Step 2: Link Your Local Project
Copy the commands shown on GitHub under "…or push an existing repository from the command line" and run them in your terminal. They will look like this:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

## Step 3: Configure Deployment (The Easy Way)

We will use the `gh-pages` tool to automate deployment.

### 1. Install the tool
Run this in your terminal:
```bash
npm install gh-pages --save-dev
```

### 2. Update `package.json`
Add these lines to your `package.json` file.
**Note**: Replace `<username>` and `<repo-name>` with your actual details.

```json
{
  "homepage": "https://<username>.github.io/<repo-name>",
  "scripts": {
    // ... other scripts
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Update `vite.config.ts`
Set the base URL to match your repository name:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/', // e.g. '/souk-bladna/'
})
```

## Step 4: Deploy!
Run this command whenever you want to update your live site:

```bash
npm run deploy
```

This will build you application and publish it to a `gh-pages` branch. Your site will be live at the URL you configured in `homepage`.
