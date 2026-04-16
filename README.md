# Portfolio Website

This project is a personal portfolio website built with plain HTML, CSS, and JavaScript, and deployed on Cloudflare.

## Overview

The site introduces Vishnujith A and includes sections for:

- About
- Skills
- Projects
- Education
- Contact

## Features

- Responsive single-page layout
- Dark/light theme toggle with saved preference
- Scroll reveal section animations
- Mouse trail visual effect
- Social and email contact links

## Project Structure

```text
.
|-- index.html
|-- style.css
|-- script.js
```

## Deployment

This portfolio is deployed on Cloudflare as a static site.

## Running Locally

Since this is a static website, you can open `index.html` directly in a browser.

If you prefer a local server, you can run one with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customization

- Update the content in `index.html` to change profile details, skills, education, and contact links.
- Edit `style.css` to adjust layout, colors, and responsive behavior.
- Modify `script.js` to change theme behavior and page animations.

## Notes

- The page references `media/profile.jpg` for the profile image and favicon, so make sure that asset exists if you want the image to display correctly.
