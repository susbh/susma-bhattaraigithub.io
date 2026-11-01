# Travel with Susma: portfolio website

A static website: open `index.html` in a browser, or upload the whole folder to any web host
(Netlify, Vercel, GitHub Pages, or your own hosting). No build step is needed.

## Files

| File | What it does |
| --- | --- |
| `content.js` | **Start here.** Destinations, photos, stories, videos, email and social links |
| `index.html` | Page structure and the text of Home, About, Collaborations and Contact |
| `style.css` | Colours, fonts and layout. Colours are at the top, in `:root` |
| `script.js` | Gallery, photo and video viewer, menu and contact form (no need to edit) |
| `images/` | Your photographs and the logo (`logo.webp`, `logo.png`; `logo-original.png` is the untouched original) |
| `videos/` | Optional: put video files here if you host them yourself |

## Add a new destination

1. Open `content.js` and find `NEW DESTINATION TEMPLATE` at the end of the `destinations` list.
2. Copy the template, paste it after the last destination (add a comma after the one above it), and fill it in.
3. Save and refresh. The destination now has a card in **My Travel Experiences** and its own tab,
   photo collection, story and videos in the **Photography Gallery**. Nothing else needs changing.

## Add photographs to a destination

1. Copy the image files into the `images` folder (JPG or WebP, about 1600px on the long side).
2. In `content.js`, add one line per photo to that destination's `photos` list:
   `{ src: "images/mardi-himal-1.jpg", alt: "What the photo shows", caption: "" }`

## Give a destination its own feature page

Annapurna Base Camp has a full magazine-style page (introduction, story, elevations drawn to scale, facts,
photographs, route overview and a closing line). It is the `feature` block inside that destination in
`content.js`. To give another destination the same page, copy the `feature` block into it and fill it in;
leave out anything you do not need. The destination's list row then opens the feature page automatically.

## Write a travel story

Add paragraphs to the destination's `story` list. Each line in quotes is one paragraph.

## Add videos

In the destination's `videos` list, use one of:

- YouTube: `{ title: "My trek", youtube: "VIDEO_ID" }` (the part after `v=` in the link)
- Vimeo: `{ title: "My trek", vimeo: "VIDEO_ID" }`
- Your own file: `{ title: "My trek", file: "videos/trek.mp4", poster: "images/trek.jpg" }`

Videos play in a full-screen viewer. The Videos area only appears for destinations that have videos.

## Contact form

- With only `email` set, the form opens the visitor's email app with the message filled in.
- For a form that sends directly, create a free form endpoint (for example at Formspree)
  and paste its URL into `formEndpoint`.

## Home page and About photos

No photograph is used on the home page or in the About section unless you choose one. The home page
features your logo. To add a portrait to the About section, copy it into `images/` and set
`images.portrait` in `content.js`.

## Colours

One quiet palette taken from the logo: warm paper (`--paper`), ink-green text (`--ink`), pine green
(`--pine`) and a muted sky blue (`--sky`). Change them in the `:root` block at the top of `style.css`.
Photographs are shown as they are, with no filters or colour overlays.


## Home page video

The home page background is your own video, set in `content.js` under `hero`:
`video` (videos/hero-loop.mp4), `poster` (images/hero-poster.jpg, the still shown while loading or when video is off),
and optional `videoWide` / `posterWide` (landscape 16:9 versions for wide screens). Keep the video muted, short and under about 4 MB.
It starts after the page loads, pauses when scrolled away, and is replaced by the still image for visitors with "reduce motion" or data saving on.


## Redesign notes

- **Menu:** Home, About, Experiences, Gallery, Journal, Contact (index.html, `#menu`).
- **Hidden for now:** Pokhara and Thailand have `hidden: true` in content.js. Delete that line to show them again. The old Collaborations section is kept inside an HTML comment in index.html.
- **Journey so far:** each destination's `cover` photograph (content.js) is shown on its row.
- **Gallery:** every photograph from every visible destination. Small copies named `sm-<file name>` (images/sm-*.jpg) are used for thumbnails; the full photograph opens in the viewer. Add `w` and `h` (pixels) to new photos so the page does not jump while loading.
- **Journal:** trek stories are listed automatically; add extra entries in `journal` in content.js.
- **Colours and fonts:** the `:root` block at the top of style.css (ivory, beige, forest green, soft brown, charcoal; Playfair Display and Jost).
