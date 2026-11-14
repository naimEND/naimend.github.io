# Wayfare Films — GitHub Pages portfolio template

An editable, static HTML/CSS/JavaScript reconstruction of the visual structure of:
https://wayfare-films.b12sites.com/

The site includes a full-bleed cinematic hero, selected-work gallery with category filters, filmstrip-style timeline hover effects, project detail overlays, about, pricing, and contact sections. It is responsive for desktop, tablet, and mobile.

**No subscription, backend, npm installation, or build step required.**

## 1. See it on your computer

Unzip the project and open `index.html` in Chrome or another browser. Or open the folder in VS Code and use the *Live Server* extension (optional).

Internet access is needed initially for the reference photographs and Google Fonts, because they currently use external URLs. Once you replace those with your own local files, the page can run without those image dependencies.

## 2. Publish with GitHub Pages (free)

1. Sign in to GitHub, click **New repository**, and name it `portfolio` (or another name). Set it to **Public** and create it.
2. On the repository page, choose **Add file → Upload files**. Upload the *contents* of this folder directly to the repository root: `index.html`, `styles.css`, `content.js`, `script.js`, `assets/`, etc. Do not upload only the outer ZIP file.
3. Commit the files.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**. Select `main` and `/(root)`, then save.
6. Your site will be at `https://YOUR-USERNAME.github.io/portfolio/` (replace the name with your own). GitHub will display the actual site address in the Pages settings.

If you name the repository `YOUR-USERNAME.github.io`, your homepage will instead be `https://YOUR-USERNAME.github.io/`.

**Future edits:** change a file in your GitHub repository, commit it, and GitHub Pages publishes the updated version. You can also edit files locally and commit/push with GitHub Desktop or Git.

## 3. Edit the content (usually the only file you need)

Open **`content.js`**.

| What you want to edit | Where in `content.js` |
| --- | --- |
| Name, location, browser tab title | `name`, `location`, `pageTitle` |
| Hero headline, background image, subheading | `hero` |
| Projects and their order | `projects` array |
| Videos for specific projects | Each project's `videoUrl` |
| About picture, text, and stats | `about` |
| Services, prices, what is included | `services` |
| Email, phone number, description | `contact` |
| Instagram, YouTube, Vimeo links | `socials` |

### Add a project

In the `projects` array, copy an existing object and edit it. Example:

```js
{
  title: "My First Film",
  type: "Documentary", // or "Commercial", "Music Video", or a new category
  year: "2026",
  client: "My Client",
  image: "assets/my-first-film.jpg",
  description: "A short description of the project.",
  videoUrl: "https://vimeo.com/123456789", // your actual video page URL
  durationSeconds: 135
},
```

Project filters adapt automatically when you add a new `type`. The six existing projects are sample data taken from the reference template, not claims about your own work.

### Add photos

Put photos in the `assets` folder, for example:

```text
assets/
  hero.jpg
  about.jpg
  my-first-film.jpg
```

Then replace the image URL in `content.js` with `"assets/hero.jpg"` or the relevant filename. Paths and filenames are case-sensitive on GitHub Pages.

For performance, aim for JPG or WebP files around 1600–2200 pixels wide for the hero, and 1000–1600 pixels wide for project images. Compress appropriately rather than uploading huge original camera files.

**Rights / reliability:** This starter mirrors the reference's public demo images using the original site's CDN. They are **not packaged locally** and may be removed or changed by that service. Before publishing, use images and credits you have permission to publish, preferably as local `/assets` files. Also replace the sample email, phone, social links, client names, and rates. This is a custom-coded recreation, not an export of B12's proprietary source code.

## 4. Add video

### Project films

For each project, fill in `videoUrl`. Supported values:

- A YouTube watch URL (e.g. `https://www.youtube.com/watch?v=XXXXXXXXXXX`)
- A Vimeo video URL (e.g. `https://vimeo.com/123456789`)
- A Rutube video URL (e.g. `https://rutube.ru/video/VIDEO-ID/`)
- A VK Video **embed URL** supplied by the service (`https://vkvideo.ru/video_ext.php?...`)
- An `.mp4` or `.webm` file in your repository (e.g. `assets/film.mp4`)

Clicking a project opens a dialog containing the video, or the project still if the link is not yet filled in. The template's initial example projects do not contain playable videos.

**Note on big files:** GitHub Pages works best for website code and photos, *not* for hosting large video files. Store long or high-resolution videos on a dedicated video service and embed them. For local files, keep GitHub's repository size and file limits in mind.

### Filmstrip hover preview

Each project thumbnail shows the original design's amber timecode and filmstrip-style scrubber when you move the mouse. By default, it animates the timecode and progress indication but shows the still photograph throughout. For actual frame-accurate scrubbing, add a small preview file to a project:

```js
previewVideo: "assets/my-first-film-preview.mp4",
```

Then the pointer position seeks through that video. Keep preview videos small for fast loading. With *Reduce motion* enabled, the animation is simplified.

### Hero video / showreel

In `hero`:

```js
video: "assets/hero.mp4",        // optional muted looping background
reelUrl: "https://vimeo.com/123456789" // optional playable reel
```

With no `video`, the hero displays the still photograph (matching the reference when a motion file is unavailable). With no `reelUrl`, the **Watch the reel** button scrolls to Selected Work, just like a gallery shortcut. Add a link if you want the button to open a real reel.

## 5. Change the design

Open **`styles.css`**. At the very top, change the CSS variables:

```css
--bg: #0d0d0f;        /* page background */
--text: #f1eee8;      /* text color */
--accent: #e8a33d;    /* warm amber accent */
--gutter: ...;        /* left and right margins */
```

For section order and the HTML structure, edit `index.html`. For gallery filtering, modal behavior, and navigation interactions, edit `script.js`.

The template uses the freely available **Inter Tight** and **Inter** fonts as close alternatives to the reference's commercial PP Neue Montreal font. They are served from Google Fonts and have local system font fallbacks.

## 6. How closely does it match?

This is a custom static rebuild based on the publicly viewable page and the design brief published with its B12 gallery listing. It reproduces the structure, project content, palette, cinematic positioning, and interactions; it is **not an exact B12 code export or pixel-perfect copy**. Some source footage and full behind-the-scenes videos were not publicly available. Replace the demo media with your own files or video embeds for a production-ready portfolio.

## File map

```text
wayfare-portfolio/
├── index.html          Main page structure
├── content.js          ✎ Edit here: photos, texts, projects, pricing, links
├── styles.css          ✎ Edit here: fonts, colors, layout
├── script.js           Filter buttons, timeline, project dialogs, mobile menu
├── .nojekyll           Tells GitHub Pages to serve the site as-is
├── README.md           This guide
└── assets/
    ├── favicon.svg     Small browser icon
    └── README.md       How to replace demo photos
```
