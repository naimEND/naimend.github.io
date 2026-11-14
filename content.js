/*
 * EDIT YOUR WEBSITE HERE.
 * This file contains the text, project data, services, photos and links.
 * You do not need to touch HTML or CSS to change the portfolio content.
 *
 * Photos currently point at B12's demo-site CDN. Replace them with your OWN
 * files in /assets before publishing a portfolio you intend to keep long-term.
 * Example: image: "assets/my-documentary.jpg"
 */

const SITE_DATA = {
  name: "Wayfare Films",
  pageTitle: "Wayfare Films — Documentary & Commercial Video",
  description: "Independent documentary and commercial filmmaking for people with stories to share.",
  location: "Providence, Rhode Island",

  hero: {
    overline: "INDEPENDENT FILM STUDIO / PROVIDENCE, RI",
    title: "We shoot the parts of the story that don't fit in a press release",
    subtitle: "Independent documentary and commercial filmmaking for people with stories to share",
    image: "https://cdn.b12.io/client_media/cT22wJnR/74d40530-ac3d-11f1-91e0-0242ac110002-zBSulHd8ODw_El9nhIDxT_nlaod7L2.jpg",
    imageAlt: "Working fishing dock at golden hour",
    video: "", // Optional self-hosted MP4: "assets/hero.mp4" (silent loop)
    reelUrl: "" // Optional YouTube/Vimeo/embed URL. Empty = scroll to selected work.
  },

  work: {
    title: "Stories that earned their screen time",
    intro: "Not just something to watch. Something to feel, remember, and talk about."
  },

  // Add, remove, or reorder projects below. type must match one of the filters.
  projects: [
    {
      title: "Tidewater: A Year on the Docks",
      type: "Documentary",
      year: "2025",
      client: "Rhode Island Council for the Humanities",
      image: "https://cdn.b12.io/client_media/cT22wJnR/75eb8d8a-ac3d-11f1-8667-0242ac110002-UVCA8l1QoR22D5em2OR45_kwmvaaGC.jpg",
      description: "A quiet portrait of a working waterfront, told through the people whose days follow the tides.",
      videoUrl: "", // Paste a public YouTube, Vimeo, Rutube or direct MP4 URL
      // Optional: previewVideo: "assets/tidewater-preview.mp4" // enables real hover scrubbing
      durationSeconds: 184
    },
    {
      title: "Morning Bread",
      type: "Documentary",
      year: "2024",
      client: "Providence Monthly",
      image: "https://cdn.b12.io/client_media/cT22wJnR/76f1226f-ac3d-11f1-b964-0242ac110002-mmo9FpLQtZqoOP67h-ulM_vL4j7ak1.jpg",
      description: "An intimate look at the rhythm of a neighborhood bakery before the city wakes.",
      videoUrl: "",
      durationSeconds: 236
    },
    {
      title: "Slow Roast",
      type: "Commercial",
      year: "2025",
      client: "Gray Rock Coffee Roasters",
      image: "https://cdn.b12.io/client_media/cT22wJnR/76db712a-ac3d-11f1-bb3e-0242ac110002-tMBD2-ju1yGVEUF0z6rfg_lxbtrJB2.jpg",
      description: "A tactile brand film that gives the craft, heat, and patience behind a cup of coffee room to breathe.",
      videoUrl: "",
      durationSeconds: 62
    },
    {
      title: "Copper & Grain",
      type: "Commercial",
      year: "2025",
      client: "New England Spirits Co.",
      image: "https://cdn.b12.io/client_media/cT22wJnR/75300b48-ac3d-11f1-bad1-0242ac110002-qljym4MwEtFcDhJLypfQc_5WcsNvmR.jpg",
      description: "An atmospheric look behind the scenes of a small manufacturing workshop, focused on people and process.",
      videoUrl: "",
      durationSeconds: 78
    },
    {
      title: "Salt and Light",
      type: "Music Video",
      year: "2025",
      client: "Maeve Callahan",
      image: "https://cdn.b12.io/client_media/cT22wJnR/764a0a61-ac3d-11f1-a572-0242ac110002-i_x3tImavnFEwINeeVtYY_X40LB0ho.jpg",
      description: "A windswept performance film built around natural light, open space, and a single voice.",
      videoUrl: "",
      durationSeconds: 213
    },
    {
      title: "Blue Hour",
      type: "Music Video",
      year: "2025",
      client: "The Marcus Tate Trio",
      image: "https://cdn.b12.io/client_media/cT22wJnR/75b09470-ac3d-11f1-81fc-0242ac110002-GlBpqPjyb0gr9_caQSiA2_H7CMXHin.jpg",
      description: "A warm, live-feeling performance portrait that leaves room for the energy between musicians.",
      videoUrl: "",
      durationSeconds: 198
    }
  ],

  about: {
    title: "The story behind the lens",
    image: "https://cdn.b12.io/client_media/cT22wJnR/760ba1ea-ac3d-11f1-a2c9-0242ac110002-LqUxzXOx8zQ6daHtb8ByN_dqm67yKE.jpg",
    imageAlt: "Filmmaker and founder holding a camera on a dock",
    paragraphs: [
      "I'm Mateo, a filmmaker working out of Providence, Rhode Island. Eight years behind the camera — including time in regional news — taught me that the best moments are usually the ones nobody planned: a harbor before sunrise, a kitchen preparing for its first customers, or a conversation that keeps going after the interview ends.",
      "I founded Wayfare Films so I could give those moments the time they deserve. I work with small teams, artists, and organizations to make thoughtful films with a clear point of view, from the first conversation through the final cut.",
      "My approach is simple: stay curious, pay attention, and make space for the unexpected. The camera should bring us closer to a person or a place, not get in the way."
    ],
    stats: [
      { value: "8+", label: "Years shooting" },
      { value: "60+", label: "Projects delivered" },
      { value: "RI", label: "Based in Providence" }
    ]
  },

  services: {
    title: "Transparent pricing, no surprises",
    intro: "A straightforward look at the process, day rates, and estimated timelines for each kind of film.",
    note: "Travel, specialist equipment, and additional crew are estimated separately. Ask about shorter shoots.",
    items: [
      {
        name: "Documentary",
        description: "Observational films and interviews that bring a community, idea, or purpose into focus.",
        dayRate: "$1,800",
        turnaround: "4–6 weeks",
        includes: ["Discovery calls and story planning", "On-site production (1–3 days)", "Picture editing and color work", "Audio cleanup and final mix"]
      },
      {
        name: "Commercial",
        description: "Purposeful, natural-looking films about the craft and people behind a brand.",
        dayRate: "$1,500",
        turnaround: "2–4 weeks",
        includes: ["Planning and creative treatment", "Production (1–2 days)", "Editing and finishing", "Export for web and social channels"]
      },
      {
        name: "Music Video",
        description: "Performance pieces and visual storytelling shaped around an artist’s sound.",
        dayRate: "$1,200",
        turnaround: "2–3 weeks",
        includes: ["Concept and visual references", "One production day", "Picture editing and color work", "Final master and social cutdowns"]
      }
    ]
  },

  contact: {
    title: "Have a story worth telling?",
    description: "Tell me about your next idea, even if it's still taking shape. A short note about the people, place, or question behind your project is a great place to begin.",
    email: "mateo@wayfarefilms.com", // IMPORTANT: replace with your own email
    phoneDisplay: "(401) 555-3847",   // IMPORTANT: replace with your own phone
    phoneLink: "+14015553847",
    footnote: "Working from Providence, RI · Available to travel · Email is the best way to get in touch"
  },

  socials: [
    { name: "Vimeo", url: "https://vimeo.com/" },
    { name: "Instagram", url: "https://instagram.com/" },
    { name: "YouTube", url: "https://youtube.com/" }
  ]
};
