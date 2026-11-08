# LeisureWorld Digital Modernisation Initiative

**Status:** In progress 

A full digital platform rebuild for LeisureWorld, a multi-location leisure and swim centre business in Cork, Ireland. Independently diagnosed operational gaps across 3 business locations, then pitched and delivered this rebuild to management, covering the public-facing site, a planned self-serve availability system, and a structured enquiry escalation pipeline.

## What this solves

LeisureWorld previously handled centre information, class schedules, and customer enquiries manually across front desk, membership, and coaching teams. This project:

- Designed to reduce repeat phone and desk enquiries by putting timetables, swim levels and pricing in one place per audience (availability system planned)
- Replaces manual email triage with a **structured PHP-based escalation pipeline** for enquiries and contact form submissions
- Consolidates centre information, class offerings, membership, and policy content into one modern, maintainable site

## Site structure

- `index.html` — homepage
- `centres.html` / `Centres/` — individual centre pages across 3 locations
- `Activities/Swimlessons/` — swim lesson tiers and class information
- `membershipfunnel.html` — membership sign-up funnel
- `pricing.html` — pricing information
- `centre-policies.html` / `Policies/` — centre policies
- `about.html`, `careers.html`, `contact.html`, `help.html`, `accessibility.html` — supporting pages
- `send-mail.php` — handles enquiry/contact form submissions and escalation routing
- `script.js` — front-end interactivity
- `style.css` — site-wide styling
- `Images/`, `fonts/` — static assets, self-hosted web fonts for cross-browser consistency

## Tech stack

JavaScript, PHP, HTML/CSS 

## Engineering notes

- Refactored a 6x-duplicated stylesheet down to a single consolidated `style.css`, cutting CSS from ~21,000 lines to ~4,400 at consolidation, grown with new pages
- Fixed cross-browser font rendering inconsistencies (Safari vs Chrome) using self-hosted `.woff2` files and `@font-face`
- Built with disciplined Git/GitHub workflow, using AI developer tools (Claude, GitHub Copilot) across the project lifecycle

## About

Built and maintained by [Nikita Joisa](https://github.com/nikitajoisa)
