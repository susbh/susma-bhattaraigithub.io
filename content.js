/* ==========================================================================
   TRAVEL WITH SUSMA: site content
   --------------------------------------------------------------------------
   This is the file you edit to update the website. You never need to touch
   the design or the code.

   WHAT YOU CAN DO HERE
   - Add a new destination:  copy the "NEW DESTINATION TEMPLATE" at the bottom
                             and paste it at the end of the "destinations" list.
   - Add photographs:        copy image files next to index.html, then
                             add a line to that destination's "photos" list.
   - Write a travel story:   add paragraphs to that destination's "story".
   - Add videos:             add a line to that destination's "videos" list
                             (YouTube, Vimeo, or a video file you upload).
   - Change contact details: email and social links.

   Save the file and refresh the page. Everything appears automatically.
   Keep every quote mark and comma exactly as in the examples.
   ========================================================================== */

window.SITE = {
  brand: "Travel with Susma",
  name: "Susma Bhattarai",
  location: "Nepal",

  /* ---- Contact ---------------------------------------------------------
     email:        shown in the Contact section; the form opens the visitor's
                   email app addressed to this address.
     formEndpoint: optional. A form service URL (for example from Formspree)
                   lets the form send without opening an email app.
     social:       the accounts you want shown, for example
                   { label: "Instagram", url: "https://instagram.com/yourname" }
  ------------------------------------------------------------------------ */
  email: "",
  formEndpoint: "",
  social: [
    { label: "TikTok", url: "https://www.tiktok.com/@susmabhattarai92" },
    // { label: "Instagram", url: "" },
    // { label: "YouTube",   url: "" },
  ],

  /* ---- Home page video -------------------------------------------------
     video:      the background video (muted, looping). Keep it short and small
                 (under about 4 MB) so the home page stays fast.
     poster:     the still image shown while the video loads, and kept on phones
                 that save data or have "reduce motion" switched on.
     videoWide / posterWide: optional landscape (16:9) versions used on wide
                 screens. Leave them empty to use the files above everywhere.
  ------------------------------------------------------------------------ */
  hero: {
    video: "hero-loop.mp4",
    poster: "hero-poster.jpg",
    videoWide: "",
    posterWide: ""
  },

  /* ---- Optional photographs for the home page and About section --------
     These are empty on purpose: no photograph is used on the home page or in
     the About section unless you choose one. To use one, copy it next to
     index.html and write its file name here, for example
  ------------------------------------------------------------------------ */
  images: {
    portrait: "",
    portraitAlt: ""
  },

  /* ---- Journal -----------------------------------------------------------
     The trek stories are listed automatically. To add another entry, add a
     line here, for example:
     { title: "A day in the mountains", date: "March 2026", excerpt: "One or two sentences.", url: "https://..." }
  ------------------------------------------------------------------------ */
  journal: [],

  /* ---- Destinations ----------------------------------------------------
     Each destination appears in "My Travel Experiences" and has its own
     section in the "Photography Gallery".

     id        letters, numbers and hyphens only; used in links
     visited   optional, for example "2022"
     story     your travel story: each line in quotes is one paragraph
     cover     the photograph shown in "The Journey So Far" (one of its photos)
     hidden    true = not shown on the website for now (content is kept)
     photos    { src, alt, caption }  (alt = short description for screen
               readers; caption is optional). w and h are the picture's size
               in pixels (optional; they keep the gallery from jumping while
               photographs load). For a faster gallery, a smaller copy named
               "sm-" + the file name (for example sm-my-photo.jpg,
               about 720 pixels wide) is used for thumbnails if it exists.
     videos    { title, youtube: "VIDEO_ID" }
               { title, vimeo: "VIDEO_ID" }
               { title, file: "clip.mp4", poster: "clip.jpg" }
               VIDEO_ID is the part after v= in a YouTube link.
  ------------------------------------------------------------------------ */
  destinations: [
    {
      id: "annapurna-base-camp",
      cover: "abc-lodge-2022.jpg",   // photograph shown on the Experiences list
      name: "Annapurna Base Camp",
      region: "Annapurna region, Nepal",
      type: "Trek",
      visited: "2022",
      altitudeLabel: "Altitude",
      elevation: "4,130 m",
      blurb: "The classic Himalayan amphitheatre trek: rhododendron forest, terraced villages and a ring of peaks at the end of the trail.",
      story: [],

      /* FEATURE PAGE
         A destination with a "feature" gets its own full magazine-style page
         (opened from the destination list). Other destinations can get one
         too: copy this block into them and fill it in. Everything below is
         optional; leave out anything you do not want to show. */
      feature: {
        meta: ["Kaski, Gandaki Province, Nepal", "Annapurna Conservation Area", "Visited 2022"],
        standfirst: "The high point of one of Nepal's best-known treks, and the place where my own trekking journey began.",
        intro: [
          "Annapurna Base Camp sits at 4,130 metres (13,550 feet) inside the Annapurna Conservation Area, in Kaski, Gandaki Province, Nepal. The camp lies in a high glacial basin ringed by some of the Himalaya's great peaks, among them Annapurna I, Annapurna South, Hiunchuli and Machhapuchhre, also known as Fishtail.",
          "The trail climbs from villages and forest into open high-mountain terrain, and ends among the peaks."
        ],
        storyTitle: "Where My Trekking Journey Began",
        story: [
          "In 2022, I trekked to Annapurna Base Camp. It was my first-ever trek, and it marked the beginning of my trekking journey.",
          "I reached the camp at 4,130 metres (13,550 feet), with the peaks around it led by Annapurna I at 8,091 metres.",
          "The photographs in this feature are from that trek: the base camp sign, the lodges in the snow, and the white peaks above them."
          // Add your own memories here, one paragraph per line, for example who you
          // went with, the day you arrived, or how the morning felt.
        ],
        elevations: [
          { name: "Annapurna I",              metres: 8091, kind: "peak" },
          { name: "Annapurna South",          metres: 7219, kind: "peak" },
          { name: "Machhapuchhre (Fishtail)", metres: 6993, kind: "peak", approx: true },
          { name: "Hiunchuli",                metres: 6441, kind: "peak" },
          { name: "Annapurna Base Camp",      metres: 4130, kind: "camp" },
          { name: "Machhapuchhre Base Camp",  metres: 3700, kind: "camp", approx: true }
        ],
        elevationNote: "Elevations are in metres above sea level and the bars are drawn to scale. The figures for Machhapuchhre and Machhapuchhre Base Camp are approximate.",
        facts: [
          ["Location", "Kaski, Gandaki Province, Nepal"],
          ["Region", "Annapurna Conservation Area"],
          ["Base Camp elevation", "4,130 m (13,550 ft)"],
          ["Machhapuchhre Base Camp", "approx. 3,700 m"],
          ["Tallest neighbouring peak", "Annapurna I, 8,091 m"],
          ["Visited", "2022"],
          ["My trek", "First-ever trek"]
        ],
        route: {
          intro: "Annapurna Base Camp is reached on foot. This is a general overview of the classic route, not a day-by-day account of my own trek; itineraries vary with the starting point and pace.",
          stages: [
            { name: "Pokhara", note: "Gateway city in Kaski and the usual starting point for the journey" },
            { name: "Trailhead", note: "Routes begin from roadheads near Pokhara, commonly Nayapul" },
            { name: "Villages along the route", note: "Chhomrong, Sinuwa, Bamboo, Dovan, Himalaya and Deurali" },
            { name: "Machhapuchhre Base Camp", note: "Approximately 3,700 m" },
            { name: "Annapurna Base Camp", note: "4,130 m (13,550 ft), the end of the trail" }
          ],
          notes: [
            "Most itineraries take a week or more, depending on the starting point and pace.",
            "Spring and autumn are the most popular trekking seasons."
          ]
        },
        closing: "My first trek took me to 4,130 metres, and it was only the beginning."
      },

      photos: [
        { src: "abc-sign-2022.jpg", w: 1246, h: 1432,  alt: "At the Annapurna Base Camp sign, 4,130 metres, with prayer flags and snow peaks behind", caption: "" },
        { src: "abc-peak-2022.jpg", w: 921, h: 1600,  alt: "Smiling trekker in sunglasses in front of a snow-covered peak and a blue-roofed lodge", caption: "" },
        { src: "abc-snow-2022.jpg", w: 1225, h: 1395,  alt: "Sitting in the snow outside a mountain lodge at Annapurna Base Camp", caption: "" },
        { src: "abc-lodge-2022.jpg", w: 1241, h: 1415, alt: "Standing in front of a lodge with snow-covered Annapurna peaks behind", caption: "" }
      ],
      videos: [
        // { title: "Reaching Annapurna Base Camp", youtube: "VIDEO_ID" },
      ]
    },
    {
      id: "pokhara",
      hidden: true,   // hidden for now: delete this line to show it again
      name: "Pokhara",
      region: "Gandaki Province, Nepal",
      type: "Destination",
      altitudeLabel: "Elevation",
      elevation: "about 820 m",
      blurb: "Lakeside calm beneath the Annapurna range, and the starting point for many of the region's trails.",
      story: [],
      photos: [],
      videos: []
    },
    {
      id: "khumai",
      cover: "khumai-meadow-2023.jpg",   // photograph shown on the Experiences list
      name: "Khumai Danda",
      region: "Kaski, Gandaki Province, Nepal",
      type: "Trek",
      visited: "2023",
      altitudeLabel: "Elevation",
      elevation: "approx. 3,245 m",
      blurb: "A hilltop near Pokhara with views of Machhapuchhre (Fishtail) and the Annapurna range.",
      story: [],

      feature: {
        meta: ["Kaski District, Gandaki Province, Nepal", "Near Pokhara", "Visited 2023"],
        standfirst: "A hilltop near Pokhara with views of Machhapuchhre and the Annapurna range, and the place of my second trek.",
        intro: [
          "Khumai Danda is a hill in Kaski District, Gandaki Province, Nepal, near Pokhara. At approximately 3,245 metres, it is known for beautiful views of Machhapuchhre, also called Fishtail, and the Annapurna range.",
          "Close by, the Korchan Danda viewpoint rises to approximately 3,682 to 3,700 metres."
        ],
        storyTitle: "My Second Trek \u2014 Khumai Danda, 2023",
        story: [
          "In 2023, I trekked to Khumai Danda. It was my second trekking experience, and it is one of my favourite treks.",
          "The people and the moments along the journey made it especially memorable.",
          "The photographs in this feature are from that trek: the Khumai Hill sign at 3,245 metres, prayer flags and lodges, a stone house on a green meadow, and horses and mules along the way."
          // Add your own memories here, one paragraph per line.
        ],
        elevEyebrow: "The heights",
        elevations: [
          { name: "Korchan Danda viewpoint", metres: 3700, kind: "viewpoint", approx: true, label: "\u2248\u00A03,682\u20133,700\u00A0m" },
          { name: "Khumai Danda",            metres: 3245, kind: "hill",      approx: true }
        ],
        elevationNote: "Elevations are in metres above sea level and are approximate. The bars are drawn to scale.",
        facts: [
          ["Location", "Kaski District, Gandaki Province, Nepal"],
          ["Near", "Pokhara"],
          ["Khumai Danda", "approx. 3,245 m"],
          ["Korchan Danda viewpoint", "approx. 3,682\u20133,700 m"],
          ["Known for", "Views of Machhapuchhre (Fishtail) and the Annapurna range"],
          ["Visited", "2023"],
          ["My trek", "Second trek"]
        ],

        /* LOCATION GUIDE. Each place opens in Google Maps. No coordinates are
           stored: Google Maps finds the place by name. To pin an exact spot,
           add lat and lng to a place, for example lat: 28.1234, lng: 84.1234 */
        map: {
          intro: "Khumai Danda lies in Kaski District, near Pokhara. Korchan Danda is a nearby viewpoint. Open any place in Google Maps for directions and the surrounding area.",
          points: [
            { name: "Pokhara", role: "City and starting point", note: "Kaski District, Gandaki Province", query: "Pokhara, Nepal" },
            { name: "Khumai Danda", role: "Destination", note: "Approximately 3,245 m", query: "Khumai Danda, Kaski, Nepal" },
            { name: "Korchan Danda", role: "Nearby viewpoint", note: "Approximately 3,682\u20133,700 m", query: "Korchan Danda, Kaski, Nepal" }
          ],
          note: "These links search Google Maps by place name. Exact positions are shown by Google, not drawn here."
        },

        route: {
          intro: "This is a general overview of the route commonly used to reach Khumai Danda, taken from published accounts. It is not a record of my own route, and details vary with the starting point and pace.",
          stages: [
            { name: "Pokhara", note: "The usual starting point, with road travel to the trailhead" },
            { name: "Saripakha, Ghachok", note: "A trailhead reached by road from Pokhara" },
            { name: "Hile", note: "A stop on the walk between the trailhead and Khumai Danda" },
            { name: "Khumai Danda", note: "Approximately 3,245 m, a hilltop with lodges" },
            { name: "Korchan Danda", note: "Nearby viewpoint, approximately 3,682\u20133,700 m" }
          ],
          notes: [
            "The route is also known as the Great Machhapuchhre Trail, the name on the welcome board in my photograph.",
            "Published accounts put the walk from the trailhead to Khumai Danda at roughly five to eight hours, and the trek at two days or more.",
            "Services are limited on the upper trail, so check conditions locally before you go."
          ],
          sources: [
            { label: "The Kathmandu Post, 2022", url: "https://kathmandupost.com/travel/2022/11/18/finding-solitude-on-the-khumai-trail" },
            { label: "Nepal Traveller", url: "https://nepaltraveller.com/news/khumaidanda-draws-increasing-arrival-of-tourists" }
          ]
        },
        closing: "Khumai remains one of my favourite treks, because of the people and the moments along the way."
      },

      photos: [
        { src: "khumai-sign-2023.jpg", w: 1355, h: 1500,   alt: "Standing beside the Great Machhapuchhre Trail welcome board for Khumai Hill, 3,245 metres, with clouds and blue-roofed lodges behind", caption: "" },
        { src: "khumai-flags-2023.jpg", w: 1289, h: 694,  alt: "Prayer flags above green lodges in clear morning light, with snow-covered peaks in the distance", caption: "" },
        { src: "khumai-meadow-2023.jpg", w: 1116, h: 1500, alt: "Smiling on a green meadow with a walking stick, a blue-roofed stone house and snow peaks behind", caption: "" },
        { src: "khumai-trail-2023.jpg", w: 855, h: 1500,  alt: "Horses and mules carrying loads past flags and a welcome sign on a forested hillside", caption: "" },
        { src: "khumai-grass-2023.jpg", w: 1242, h: 688,  alt: "A selfie on a golden grass hillside with a horse grazing behind", caption: "" }
      ],
      videos: []
    },
    {
      id: "kori",
      cover: "kori-camp-2024.jpg",   // photograph shown on the Experiences list
      name: "Kori Danda",
      region: "Kaski, Gandaki Province, Nepal",
      type: "Trek",
      visited: "2024",
      altitudeLabel: "Elevation",
      elevation: "approx. 3,800\u20133,850 m",
      blurb: "A high ridge above Sikles with views of Annapurna II, Annapurna IV, Lamjung Himal and Machhapuchhre.",
      story: [],

      feature: {
        meta: ["Above Sikles, Kaski District, Gandaki Province, Nepal", "Annapurna Conservation Area", "Visited 2024"],
        standfirst: "A high ridge above Sikles with views of Annapurna II, Annapurna IV, Lamjung Himal and Machhapuchhre, and the place of my third trek.",
        intro: [
          "Kori Danda is a high ridge above the village of Sikles, in Kaski District, Gandaki Province, Nepal, inside the Annapurna Conservation Area. At approximately 3,800 to 3,850 metres, it is known for views of Annapurna II, Annapurna IV, Lamjung Himal and Machhapuchhre.",
          "The trek begins in Sikles village."
        ],
        storyTitle: "My Third Trek \u2014 Kori Danda",
        story: [
          "In 2024, I trekked to Kori Danda. It was my third trekking destination.",
          "Along the way I met rain and then snowfall, and eventually the clouds cleared to give me beautiful views of the mountains.",
          "The photographs in this feature are from that trek: a mossy forest trail, a red rain poncho beside the Kori sign in the cloud, and the peaks in clear light."
          // Add your own memories here, one paragraph per line.
        ],
        elevEyebrow: "The heights",
        elevations: [
          { name: "Kori Danda", metres: 3850, kind: "hill",    approx: true, label: "\u2248\u00A03,800\u20133,850\u00A0m" },
          { name: "Sikles",     metres: 2000, kind: "village", approx: true },
          { name: "Pokhara",    metres: 820,  kind: "city",    approx: true }
        ],
        elevationNote: "Elevations are in metres above sea level and are approximate. Published sources give slightly different figures for Kori Danda. The bars are drawn to scale.",
        facts: [
          ["Location", "Above Sikles, Kaski District, Gandaki Province, Nepal"],
          ["Region", "Annapurna Conservation Area"],
          ["Elevation", "approx. 3,800\u20133,850 m"],
          ["Starting point", "Sikles village"],
          ["Known for", "Views of Annapurna II, Annapurna IV, Lamjung Himal and Machhapuchhre"],
          ["Visited", "2024"],
          ["My trek", "Third trek"]
        ],

        /* LOCATION GUIDE: each place opens in Google Maps by name. No
           coordinates are stored. To pin an exact spot, add lat and lng. */
        map: {
          intro: "The trek starts at Sikles village and climbs to Kori Danda. Open any place in Google Maps for directions and the surrounding area.",
          points: [
            { name: "Pokhara", role: "City and gateway", note: "Kaski District, Gandaki Province", query: "Pokhara, Nepal" },
            { name: "Sikles", role: "Village and starting point", note: "Kaski District", query: "Sikles, Kaski, Nepal" },
            { name: "Kori Danda", role: "Destination", note: "Approximately 3,800\u20133,850 m", query: "Kori Danda, Kaski, Nepal" }
          ],
          note: "These links search Google Maps by place name. Exact positions are shown by Google, not drawn here."
        },

        route: {
          intro: "This is a general reference route taken from published accounts. It is not necessarily my exact route, and itineraries vary with the starting point, pace and season.",
          stages: [
            { name: "Pokhara", note: "The usual starting city, with road travel to Sikles" },
            { name: "Sikles", note: "A Gurung village and the start of the trek, approximately 2,000 m" },
            { name: "Ridge and camps above Sikles", note: "Published accounts name stops such as Hugu, Naula Kharka, Tasa and Deurali" },
            { name: "Kori Danda", note: "Approximately 3,800\u20133,850 m, the high ridge viewpoint" }
          ],
          notes: [
            "Published sources describe the trek as anything from two days of walking to five to seven days, and name different stops, so the exact stages vary.",
            "Weather changes quickly at this height, so check conditions locally before you go."
          ],
          sources: [
            { label: "Nepal Traveller", url: "https://nepaltraveller.com/sidetrack/kori-nepal" },
            { label: "Online Khabar", url: "https://english.onlinekhabar.com/kori-danda-trek-nepal.html" }
          ]
        },
        closing: "Rain, then snow, and at last the mountains in clear light: the view at Kori was worth the wait."
      },

      photos: [
        { src: "kori-forest-2024.jpg", w: 1125, h: 1500, alt: "Standing with a walking stick and backpack on a leaf-covered path beneath tall moss-covered trees", caption: "" },
        { src: "kori-sign-2024.jpg", w: 1125, h: 1500,   alt: "Wearing a red rain poncho beside a hand-lettered wooden sign at Kori, in cloud, with stone cairns around", caption: "" },
        { src: "kori-camp-2024.jpg", w: 1125, h: 1500,   alt: "Sitting on a bench beside a tent in early light, with snow peaks glowing in the distance", caption: "" },
        { src: "kori-peak-2024.jpg", w: 840, h: 1500,   alt: "Seen from behind, looking up at a snow-covered mountain face lit golden by low sun", caption: "" },
        { src: "kori-selfie-2024.jpg", w: 844, h: 1500, alt: "Smiling selfie in sunglasses with snow peaks in warm light and the moon above", caption: "" }
      ],
      videos: []
    },
    {
      id: "mardi-himal",
      cover: "mardi-golden-2024.jpg",   // photograph shown on the Experiences list
      name: "Mardi Himal",
      region: "Kaski, Gandaki Province, Nepal",
      type: "Trek",
      visited: "2024",
      altitudeLabel: "Base Camp elevation",
      elevation: "approx. 4,500 m",
      blurb: "A forest and ridgeline trek in the Annapurna region, with views of Machhapuchhre and the Annapurna range.",
      story: [],

      feature: {
        meta: ["Kaski District, Gandaki Province, Nepal", "Annapurna Conservation Area", "Visited 2024"],
        standfirst: "A forest and ridgeline trek in the Annapurna region, and my fourth trekking destination.",
        intro: [
          "Mardi Himal is a trekking destination in the Annapurna region of Nepal, in Kaski District, Gandaki Province, inside the Annapurna Conservation Area. The trail climbs through forest and then follows a high ridgeline, with open Himalayan scenery and views of Machhapuchhre (Fishtail), Annapurna South and Hiunchuli.",
          "What makes it special is how much it brings together in one trek: forest trails, ridgelines and viewpoints, with the mountains close at hand, reached from Pokhara."
        ],
        storyTitle: "My Fourth Trek \u2014 Mardi Himal, 2024",
        story: [
          "In 2024, I trekked to Mardi Himal. It was my fourth trekking destination, and my second trek of that year, after Kori Danda.",
          "The photographs in this feature are from that trek: frosted prayer cloths, a snow-dusted stone table, a night under the stars, and the peaks in golden light."
          // Add your own memories here, one paragraph per line, for example who you
          // went with, how far you walked each day, or the moment you remember most.
        ],
        journeyTitle: "My trekking journey so far",
        journey: [
          { id: "annapurna-base-camp", year: "2022", label: "First trek" },
          { id: "khumai",              year: "2023", label: "Second trek" },
          { id: "kori",                year: "2024", label: "Third trek" },
          { id: "mardi-himal",         year: "2024", label: "Fourth trek" },
          { id: "panchpokhari",        year: "2025", label: "Fifth trek" }
        ],
        elevEyebrow: "The heights",
        elevations: [
          { name: "Mardi Himal (peak)",           metres: 5587, kind: "peak",      approx: true },
          { name: "Mardi Himal Base Camp",        metres: 4500, kind: "camp",      approx: true },
          { name: "Mardi Himal Upper Viewpoint",  metres: 4200, kind: "viewpoint", approx: true }
        ],
        elevationNote: "The mountain, the Upper Viewpoint and Base Camp are three different places. Trekkers walk to the Upper Viewpoint and Base Camp; the peak itself rises above them. Elevations are in metres above sea level and are approximate. The bars are drawn to scale.",
        facts: [
          ["Destination", "Mardi Himal"],
          ["Location", "Kaski District, Gandaki Province, Nepal"],
          ["Protected area", "Annapurna Conservation Area"],
          ["Mardi Himal peak", "approx. 5,587 m"],
          ["Upper Viewpoint", "approx. 4,200 m"],
          ["Base Camp", "approx. 4,500 m"],
          ["Major mountain views", "Machhapuchhre (Fishtail), Annapurna South, Hiunchuli and the Annapurna range"],
          ["General difficulty", "Moderate, with gradual climbing to high altitude"],
          ["Trekking seasons", "Spring (March\u2013May) and autumn (September\u2013November)"],
          ["Visited", "2024"],
          ["My trek", "Fourth trek"]
        ],

        /* ROUTE MAP. Shows the commonly used route as a profile of its stops in
           trekking order and height, with a Google Maps link for each place. No
           GPS coordinates are stored: Google Maps finds each place by name.
           To pin an exact spot, add lat and lng to that place. elev is the
           height used to draw the profile; elevLabel is what is shown. */
        map: {
          profile: true,
          caption: "The stops of the commonly used route, in trekking order and height. It is not drawn to geographic scale, and it is not my confirmed personal route.",
          intro: "Tap any marker, or any place in the list, to open it in Google Maps.",
          points: [
            { name: "Pokhara",                      short: "Pokhara",         role: "Gateway city",             note: "Approximately 820 m",             elev: 820,  elevLabel: "\u2248\u00A0820\u00A0m",          query: "Pokhara, Nepal" },
            { name: "Kande",                        short: "Kande",           role: "Trailhead",                note: "Approximately 1,770 m",           elev: 1770, elevLabel: "\u2248\u00A01,770\u00A0m",        query: "Kande, Kaski, Nepal" },
            { name: "Forest Camp",                  short: "Forest Camp",     role: "Camp",                     note: "Approximately 2,500\u20132,550 m", elev: 2535, elevLabel: "\u2248\u00A02,500\u20132,550\u00A0m", query: "Forest Camp, Mardi Himal Trek, Nepal" },
            { name: "Low Camp",                     short: "Low Camp",        role: "Camp",                     note: "Approximately 3,000\u20133,150 m", elev: 3075, elevLabel: "\u2248\u00A03,000\u20133,150\u00A0m", query: "Low Camp, Mardi Himal Trek, Nepal" },
            { name: "Badal Danda",                  short: "Badal Danda",     role: "Camp on the ridge",        note: "Approximately 3,200\u20133,270 m", elev: 3235, elevLabel: "\u2248\u00A03,200\u20133,270\u00A0m", query: "Badal Danda, Mardi Himal Trek, Nepal" },
            { name: "High Camp",                    short: "High Camp",       role: "Highest camp",             note: "Approximately 3,540\u20133,600 m", elev: 3570, elevLabel: "\u2248\u00A03,540\u20133,600\u00A0m", query: "High Camp, Mardi Himal Trek, Nepal" },
            { name: "Mardi Himal Upper Viewpoint",  short: "Upper Viewpoint", role: "Viewpoint",                note: "Approximately 4,200 m",           elev: 4200, elevLabel: "\u2248\u00A04,200\u00A0m",        query: "Mardi Himal Upper Viewpoint, Nepal" },
            { name: "Mardi Himal Base Camp",        short: "Base Camp",       role: "Highest point of the trek", note: "Approximately 4,500 m",           elev: 4500, elevLabel: "\u2248\u00A04,500\u00A0m",        query: "Mardi Himal Base Camp, Nepal" }
          ],
          overall: { label: "Open the Mardi Himal trek area in Google Maps", query: "Mardi Himal Trek, Nepal" },
          note: "Google Maps finds each place by name. Some camps may show more than one result, so check the result against the route you are planning. Published elevations differ a little between sources, so ranges are shown."
        },

        route: {
          intro: "This is the commonly used route, described from published accounts. It is not a record of my own route, and itineraries vary with the operator, pace and season.",
          stages: [
            { name: "Pokhara", note: "The usual starting city, followed by a drive to the trailhead" },
            { name: "Kande, approx. 1,770 m", note: "Where the walking begins" },
            { name: "Forest Camp, approx. 2,500\u20132,550 m", note: "Reached on a forest trail that climbs steadily" },
            { name: "Low Camp, approx. 3,000\u20133,150 m", note: "The next camp higher up the ridge" },
            { name: "Badal Danda, approx. 3,200\u20133,270 m", note: "Also called Middle Camp in some accounts" },
            { name: "High Camp, approx. 3,540\u20133,600 m", note: "The highest camp, and the base for the final climb" },
            { name: "Upper Viewpoint, approx. 4,200 m", note: "A viewpoint above High Camp" },
            { name: "Base Camp, approx. 4,500 m", note: "The highest point on the usual trek" }
          ],
          notes: [
            "Published itineraries commonly allow about five to seven days of trekking. Many visit the Upper Viewpoint and Base Camp from High Camp in one long day, then walk back down.",
            "Difficulty is generally described as moderate. The climb is gradual, but the upper section is above 3,500 metres, so take it slowly and watch for signs of altitude sickness.",
            "Spring (March to May) and autumn (September to November) are the most popular seasons.",
            "Permit rules and conditions change, so check locally before you go."
          ],
          sources: [
            { label: "Alpine Adventure Club", url: "https://www.alpineadventureclub.com/mardi-himal-trek" },
            { label: "Trekking in Nepal", url: "https://www.trekking-in-nepal.net/en/trip/mardi-himal-base-camp-trek" },
            { label: "Trail Run Project", url: "https://www.trailrunproject.com/trail/7048293/mardi-himal-base-camp-trek" }
          ]
        },

        highlights: {
          title: "Why Mardi Himal is special",
          items: [
            { title: "Himalayan landscapes", text: "The trail climbs from forest to open high ground and ends among snow peaks." },
            { title: "Forest trails and changing scenery", text: "The lower sections run through forest, including rhododendron woodland, before the landscape opens up higher on the ridge." },
            { title: "Ridges and viewpoints", text: "Much of the upper trail follows a ridgeline, with camps and viewpoints that look out over the mountains." },
            { title: "Machhapuchhre and the Annapurna range", text: "Machhapuchhre (Fishtail), Annapurna South and Hiunchuli are among the peaks in view." },
            { title: "Trekking in the Annapurna region", text: "The route lies inside the Annapurna Conservation Area, one of Nepal's best-known trekking regions." }
          ]
        },

        closing: "Mardi Himal became my fourth trekking destination and my second trek of 2024. Every destination is another chapter in my growing travel story, and I am still walking."
      },

      photos: [
        { src: "mardi-flags-2024.jpg", w: 1125, h: 1500,    alt: "Portrait beside a frost-covered white and red prayer cloth, with a sharp snow-streaked peak behind", caption: "" },
        { src: "mardi-table-2024.jpg", w: 1125, h: 1500,    alt: "A snow-dusted stone table and bench on a ridge, with snow peaks rising through cloud beyond", caption: "" },
        { src: "mardi-standing-2024.jpg", w: 1125, h: 1500, alt: "Standing in a silver puffer jacket and tinted sunglasses, looking toward a pointed peak above a frosted ridge", caption: "" },
        { src: "mardi-golden-2024.jpg", w: 1125, h: 1500,   alt: "A small figure standing on a frosted ridge below a large snow peak glowing gold in low sun, with a band of cloud", caption: "" },
        { src: "mardi-night-2024.jpg", w: 1125, h: 1500,    alt: "At night beside a frosted bench in a rainbow hat holding a cup, with stars above and moonlit peaks over the cloud", caption: "" }
      ],
      videos: []
    },
    {
      id: "panchpokhari",
      cover: "panch-shrine-2025.jpg",   // photograph shown on the Experiences list
      name: "Panch Pokhari",
      region: "Sindhupalchok, Bagmati Province, Nepal",
      type: "Trek",
      visited: "2025",
      altitudeLabel: "Elevation",
      elevation: "approx. 4,100\u20134,150 m",
      blurb: "Five sacred alpine lakes in the Jugal Himal region of Sindhupalchok, visited in the monsoon.",
      story: [],

      feature: {
        meta: ["Panchpokhari Thangpal Rural Municipality, Sindhupalchok District, Bagmati Province, Nepal", "Jugal Himal region", "Visited 2025"],
        standfirst: "A Monsoon Journey, Unhurried by Nature.",
        intro: [
          "Panch Pokhari (\u092a\u093e\u0901\u091a\u092a\u094b\u0916\u0930\u0940) means \u201cFive Lakes\u201d. It is a group of five sacred alpine lakes at approximately 4,100 to 4,150 metres in Sindhupalchok District, Nepal, in the Jugal Himal region. The lakes sit high above the villages, in open mountain country with Dorje Lakpa, the Jugal Himal and other Himalayan peaks around them.",
          "The five lakes are the main attraction. The setting is quiet and wide, and the place is sacred to both Hindu and Buddhist communities, who gather here each year for the Janai Purnima pilgrimage and festival."
        ],
        storyTitle: "My Fifth Trek \u2014 Panch Pokhari, 2025",
        storySubtitle: "A Monsoon Journey, Unhurried by Nature.",
        story: [
          "In 2025, I trekked to Panch Pokhari during the monsoon season. It was my fifth trekking destination.",
          "This journey was about slowing down, enjoying nature and spending unhurried time surrounded by it. What I want to share is simple: nature, peaceful moments and us.",
          "The photographs in this feature are from that trek: pink wildflowers above a sea of cloud, a still lake under a blue sky, a pagoda-style shrine strung with prayer flags, and a lake with a sign reading Sarswatikunda."
          // Add your own memories here, one paragraph per line, for example who
          // you went with, a moment you remember, or what you noticed along the way.
        ],
        journeyTitle: "My trekking journey so far",
        journey: [
          { id: "annapurna-base-camp", year: "2022", label: "First trek" },
          { id: "khumai",              year: "2023", label: "Second trek" },
          { id: "kori",                year: "2024", label: "Third trek" },
          { id: "mardi-himal",         year: "2024", label: "Fourth trek" },
          { id: "panchpokhari",        year: "2025", label: "Fifth trek" }
        ],
        elevEyebrow: "The heights",
        elevations: [
          { name: "Panch Pokhari",  metres: 4125, kind: "lake", approx: true, label: "\u2248\u00A04,100\u20134,150\u00A0m" },
          { name: "Nosyam Pati",    metres: 3700, kind: "stop", approx: true },
          { name: "Kathmandu",      metres: 1400, kind: "city", approx: true }
        ],
        elevationNote: "Elevations are in metres above sea level and are approximate, and published sources differ slightly. The bars are drawn to scale. Kathmandu is shown for comparison.",
        facts: [
          ["Destination", "Panch Pokhari (\u092a\u093e\u0901\u091a\u092a\u094b\u0916\u0930\u0940)"],
          ["Meaning", "Five Lakes"],
          ["Location", "Panchpokhari Thangpal Rural Municipality, Sindhupalchok District, Bagmati Province, Nepal"],
          ["Elevation", "approx. 4,100\u20134,150 m"],
          ["Main attraction", "Five sacred alpine lakes"],
          ["Mountain region", "Jugal Himal region"],
          ["Nearby mountain views", "Jugal Himal, Dorje Lakpa and surrounding Himalayan peaks"],
          ["Cultural significance", "Sacred to Hindu and Buddhist communities"],
          ["Religious event", "Janai Purnima pilgrimage and festival"],
          ["General difficulty", "Moderate to challenging, depending on route, weather and fitness"],
          ["Visited", "2025, in the monsoon season"],
          ["My trek", "Fifth trek"]
        ],
        factsNote: "This feature is about Panch Pokhari in Sindhupalchok. Other places in Nepal have similar names.",

        /* Content blocks. "after" can be "facts" (shown after the facts) or
           left out (shown after the route overview). */
        blocks: [
          {
            after: "facts",
            eyebrow: "The season",
            title: "Panch Pokhari in the Monsoon",
            intro: "In Nepal the monsoon runs roughly from June to September. This is general seasonal information about the region, not a record of the conditions I met.",
            items: [
              { title: "Green mountain landscapes", text: "Regular monsoon rain keeps the hills and valleys green, and the high slopes are at their most vivid." },
              { title: "Seasonal vegetation and alpine surroundings", text: "Above the forest, summer brings out the grass and flowering plants of the alpine meadows around the lakes." },
              { title: "Clouds and changing weather", text: "Cloud and mist can move in and clear again within hours, so views of the peaks come and go." },
              { title: "Travelling in the monsoon", text: "Trails can be wet and slippery and rain can disrupt roads, so plans need to stay flexible. Spring and autumn are the more popular seasons for clear skies." },
              { title: "The quiet of being in nature", text: "A slower pace suits the season: time beside the water, in the cloud and the green, without hurry." }
            ]
          },
          {
            eyebrow: "Culture",
            title: "Culture and significance",
            intro: "Panch Pokhari is a place of worship as well as a place of natural beauty, and visitors are asked to treat it with respect.",
            items: [
              { title: "A sacred place", text: "The five lakes are revered as holy. In Hindu tradition they are described as the source of the Indrawati River." },
              { title: "Hindu and Buddhist communities", text: "The lakes are sacred to both Hindus and Buddhists. Local tradition also links the area with the Buddhist teachers Padmasambhava and Milarepa." },
              { title: "Lord Shiva", text: "Hindu tradition associates the site with Lord Shiva and Parvati, and each lake is said to represent one of their daughters." },
              { title: "Janai Purnima", text: "Every August, on Janai Purnima, many devotees make the pilgrimage to bathe in the cold water and to change their sacred thread (janai)." },
              { title: "Five lakes, one landscape", text: "The five lakes are the heart of Panch Pokhari, and their cultural and natural importance cannot be separated: the sacred water sits in a high, wild mountain setting." }
            ]
          }
        ],

        /* ROUTE MAP. The commonly used approach as an ordered diagram. No GPS
           coordinates are stored: Google Maps finds each place by name. To pin an
           exact spot, add lat and lng to a place. phase "trek" marks the trekking
           approach. */
        map: {
          profile: true,
          caption: "The stops of the commonly used approach, in order. It is not drawn to scale, and it is not my confirmed personal route.",
          legend: [["Journey from Kathmandu", "journey"], ["Trekking approach", "trek"]],
          intro: "Tap any marker, or any place in the list, to open it in Google Maps.",
          points: [
            { name: "Kathmandu",         short: "Kathmandu",         role: "Capital city and usual starting point", note: "Approximately 1,400 m",             elevLabel: "\u2248\u00A01,400\u00A0m", phase: "journey", query: "Kathmandu, Nepal" },
            { name: "Melamchi",          short: "Melamchi",          role: "Town on the way",                       note: "",                                  phase: "journey", query: "Melamchi, Sindhupalchok, Nepal" },
            { name: "Bhotang / Yarsa",   short: "Bhotang / Yarsa",   role: "Where the trekking approach begins",    note: "",                                  phase: "journey", query: "Bhotang Yarsa, Sindhupalchok, Nepal" },
            { name: "Nosyam Pati",       short: "Nosyam Pati",       role: "Stop on the trekking approach",         note: "Approximately 3,700 m",             elevLabel: "\u2248\u00A03,700\u00A0m", phase: "trek",    query: "Nosyam Pati, Sindhupalchok, Nepal" },
            { name: "Panch Pokhari",     short: "Panch Pokhari",     role: "The five lakes",                        note: "Approximately 4,100\u20134,150 m", elevLabel: "\u2248\u00A04,100\u20134,150\u00A0m", phase: "trek", query: "Panch Pokhari, Sindhupalchok, Nepal" }
          ],
          overall: { label: "Open Panch Pokhari in Google Maps", query: "Panch Pokhari, Sindhupalchok, Nepal" },
          note: "Google Maps finds each place by name, so check each result against the route you are planning. Place names are spelled in several ways, for example Nosyam Pati, Nasim Pati and Noshyampati."
        },

        route: {
          intro: "This is a general visitor reference to the commonly used approach, taken from published accounts. It is not my personal itinerary, and route options and travel times vary.",
          stages: [
            { name: "Kathmandu", note: "The usual starting point, followed by a long road journey into Sindhupalchok" },
            { name: "Melamchi", note: "A town on the way; the popular approach passes through it" },
            { name: "Bhotang / Yarsa", note: "Where the trekking approach commonly begins, through Sherpa and Tamang villages" },
            { name: "Nosyam Pati, approx. 3,700 m", note: "A stop on the way up to the lakes" },
            { name: "Panch Pokhari, approx. 4,100\u20134,150 m", note: "The five lakes, at the end of the trail" }
          ],
          notes: [
            "Route options and travel times vary. Some itineraries start from Sano Okhareni, by way of Chautara, instead of Bhotang.",
            "Published itineraries range from about four days upwards, depending on the starting point and pace.",
            "The difficulty is generally described as moderate to challenging, depending on the route, the weather and your fitness.",
            "Spring and autumn are the most popular seasons for clear views. Janai Purnima in August brings many pilgrims.",
            "Conditions change, so check roads, trails and permits locally before you go."
          ],
          sources: [
            { label: "Nepal Traveller: a short yet rewarding escape", url: "https://nepaltraveller.com/sidetrack/panch-pokhari-a-short-yet-rewarding-himalayan-escape-in-sindhupalchok" },
            { label: "Nepal Traveller: the sacred lakes", url: "https://nepaltraveller.com/sidetrack/2255" },
            { label: "Alpine Adventure Club", url: "https://www.alpineadventureclub.com/panch-pokhari-trek" }
          ]
        },

        closingTitle: "Five Treks, Countless Memories.",
        closing: "Panch Pokhari became my fifth trekking destination in 2025. Trekking is not always about rushing towards a destination. Sometimes it is about slowing down, noticing nature and appreciating the journey itself."
      },

      photos: [
        { src: "panch-flowers-2025.jpg", w: 842, h: 1500, alt: "Standing with arms open on a ridge of pink wildflowers, looking out over a sea of cloud under a bright blue sky", caption: "" },
        { src: "panch-lake-2025.jpg", w: 861, h: 1500,    alt: "Standing on a rocky shore in a green headscarf, with a still blue lake reflecting the sky and a grassy ridge behind", caption: "" },
        { src: "panch-summit-2025.jpg", w: 844, h: 1500,  alt: "Smiling on a rocky ridge with a small bunch of pink flowers, clouds and green mountainsides below", caption: "" },
        { src: "panch-shrine-2025.jpg", w: 844, h: 1500,  alt: "A pagoda-style shrine with a rust-red roof, strung with colourful prayer flags, below a green mountainside", caption: "" },
        { src: "panch-sign-2025.jpg", w: 844, h: 1500,    alt: "A still mountain lake reflecting a green slope, with a sign reading Sarswatikunda beside the water", caption: "" }
      ],
      videos: []
    },
    {
      id: "thailand",
      hidden: true,   // hidden for now: delete this line to show it again
      name: "Thailand",
      region: "Thailand",
      type: "Destination",
      blurb: "A change of landscape, from Himalayan trails to Thailand's warmth and colour.",
      story: [],
      photos: [],
      videos: []
    }

    /* ---- NEW DESTINATION TEMPLATE ----------------------------------------
       Copy everything from the opening { to the closing }, add a comma after
       the destination above it, and paste it here. Then fill it in.

    ,{
      id: "my-new-place",
      name: "My New Place",
      region: "Region, Country",
      type: "Trek",
      visited: "2026",
      blurb: "One sentence shown in the destination list.",
      story: [
        "First paragraph of the story.",
        "Second paragraph of the story."
      ],
      photos: [
        { src: "my-new-place-1.jpg", alt: "What the photo shows", caption: "" },
        { src: "my-new-place-2.jpg", alt: "What the photo shows", caption: "" }
      ],
      videos: [
        { title: "My video", youtube: "VIDEO_ID" }
      ]
    }
    ------------------------------------------------------------------------ */
  ]
};
