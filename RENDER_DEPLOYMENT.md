# Deploying Ephemeral Chat to Render.com

This guide will walk you through deploying your Ephemeral Chat application to Render.com for free.

## Prerequisites

- A GitHub account (to host your code)
- A Render.com account (free tier is sufficient)

## Step 1: Push Your Code to GitHub

1. Create a new repository on GitHub
2. Initialize Git in your project folder (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/ephemeral-chat.git
   ```
4. Push your code to GitHub:
   ```
   git push -u origin main
   ```

## Step 2: Deploy to Render.com

1. Sign up for a free account at [Render.com](https://render.com)
2. From your dashboard, click **New** and select **Web Service**
3. Connect to your GitHub repository:
   - Select **GitHub** as your deployment option
   - Connect your GitHub account if not already done
   - Find and select your ephemeral-chat repository

4. Configure your web service:
   - **Name**: ephemeral-chat (or your preferred name)
   - **Environment**: Node
   - **Region**: Choose the region closest to your target audience
   - **Branch**: main (or your default branch)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Click **Create Web Service**

6. Your application will be deployed automatically. This process may take a few minutes.

## Step 3: Access Your Deployed Application

Once the deployment is complete, Render will provide you with a URL like:
```
https://ephemeral-chat.onrender.com
```

Visit this URL to see your live application!

## Troubleshooting

If you encounter any issues:

1. Check the **Logs** tab in your Render dashboard for error messages
2. Verify that your package.json has the correct start script: `"start": "node backend/server.js"`
3. Make sure all dependencies are properly listed in your package.json

## Maintaining Your Application

- Any new commits pushed to your GitHub repository will automatically trigger a new deployment
- You can monitor your application's performance in the Render dashboard
- Free tier has some limitations (like spinning down after inactivity), but is sufficient for demonstration purposes
