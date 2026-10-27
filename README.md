# Laiba Asad — Cyber Security Portfolio

Personal portfolio built with React and Vite, deployed to <https://laiba-asad.github.io/>.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci          # install exact dependencies from package-lock.json
npm run dev     # dev server, usually http://localhost:5173/
```

Check the production build:

```sh
npm run build   # outputs to dist/
npm run preview # serves dist/ at http://localhost:4173/
```

## Editing content

All text, links, skills, projects and credentials live in **`src/data/content.js`**. Components read from it, so you rarely need to touch JSX.

Empty URLs (`''`) render as dashed "link pending" placeholders rather than broken links. Fill them in as they become available:

| What | Where in `content.js` |
| --- | --- |
| Email, LinkedIn | `profile.email`, `profile.linkedin` |
| Project repositories / demos | `projects[].repoUrl`, `projects[].demoUrl` |
| Mark CTF platform complete | change `projects[3].status` from `In progress` |
| Credential verification links | `certifications[].verifyUrl` |
| Badge images | put files in `public/badges/`, set `certifications[].image` to `/badges/name.png` |
| Initiative status | `initiatives[].state`: `completed`, `ongoing` or `planned` |
| Project folder stamp | `projects[].status`, e.g. `On file`, `Active`, `In progress` |

## Structure

```
index.html                 page title, meta description, theme colour
public/favicon.svg
src/
  main.jsx                 entry, self-hosted fonts
  App.jsx                  section order
  styles.css               design tokens (CSS variables) and all styles
  data/content.js          editable content
  components/              Navbar, Hero, CaseFile, Ticker, About, Skills, Experience,
                           Projects, Education, Certifications, Initiatives, Contact,
                           Footer, SectionHeader, SmartLink, icons
.github/workflows/deploy.yml
```

## Deploy to GitHub Pages

`vite.config.js` uses `base: '/'` because `Laiba-Asad.github.io` is a user site served from the domain root.

1. Push this project to the `main` branch of `Laiba-Asad/Laiba-Asad.github.io`.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. Each push to `main` (or a manual run from the **Actions** tab) builds `dist/` and deploys it.
