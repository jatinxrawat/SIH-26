# Git & Deployment Workflow Rules

- **Push ONLY to `feature` branch (`origin/feature`)**:
  All commits must strictly be pushed only to the `feature` branch.
- **NEVER push to or merge with `main`**:
  The user will test, review, and merge to `main` themselves when ready.
- **NEVER deploy to Vercel**:
  Do not run `vercel` or `npx vercel --prod` commands automatically. Deployment will be triggered by the user or when they merge to main.
- **Local Verification Only**:
  Verify builds with `npm run build` and test locally on `http://localhost:5173`.
