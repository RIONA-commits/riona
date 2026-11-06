# riona website
Static site: no build step. Edit `script.js` first (top of file): currency, WhatsApp number (country code, no +), email.
## Host on GitHub Pages
1. Create a new public repository on github.com (e.g. `riona`).
2. Upload everything in this folder (keep `assets/` and `.nojekyll`) to the repository root.
3. Repository Settings > Pages > Build and deployment: Source "Deploy from a branch", Branch `main`, folder `/ (root)`, Save.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/riona/`.
Prices and products live in each page's `.prod` blocks (change the name, `data-p` price and text together).
