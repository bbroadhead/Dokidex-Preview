# Yanoverse Multi-Dex

A multilingual, multi-game monster encyclopedia for the Yanoverse.

**Live site:** https://bbroadhead.github.io/Yanoverse-Multidex/  
**Repository:** https://github.com/bbroadhead/Yanoverse-Multidex

## What it includes

- **Multi-game selector** for Dokimon: Quest, Dokimon Quest 2, Yami Kids, and Nuumonsters.
- **Monster encyclopedia** with individual profiles, artwork, types, stats, evolutions, moves, forms, and encounter information where data is available.
- **World reference** with localized content and supporting sub-sections.
- **Dokitracker** for tracking collection and completion progress.
- **Multilingual interface and monster data**, including English, Japanese, Spanish, Portuguese, and Korean content where available.
- Responsive desktop and mobile layouts, with a shared game selector across pages.

## Repository structure

| Path | Purpose |
|---|---|
| `index.html` | Main Multi-Dex landing page |
| `dokimon/` | Individual Dokimon profile pages |
| `world/` | World reference pages |
| `dokitracker/` | Dokitracker experience |
| `assets/` | Images, logos, stylesheets, scripts, and supporting assets |
| `styles.css` | Shared site styling |

## Deployment

This repository is configured for **GitHub Pages**.

- Production branch: `main`
- Published URL: https://bbroadhead.github.io/Yanoverse-Multidex/
- GitHub Pages settings: **Settings → Pages**

The site is a static website. Changes merged or pushed to `main` are published by GitHub Pages after its build completes.

## Development workflow

- Make and test changes in the repository before publishing.
- Keep shared navigation, selector behavior, and responsive styling consistent across the landing page, monster profiles, World pages, and Dokitracker.
- Verify both desktop and mobile layouts after changes.
- Keep asset and internal navigation paths rooted at `/Yanoverse-Multidex/` for the GitHub Pages project-site URL.

## Notes

Some game selections may display a development or “data coming soon” notice until their datasets and pages are ready. The presence of a game in the selector does not imply that its full encyclopedia is complete.

---

Yanoverse Multi-Dex is an independent fan-made reference project and is not an official game publication.
