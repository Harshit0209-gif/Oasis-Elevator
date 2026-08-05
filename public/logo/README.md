# Logo asset — known limitation

`oasis-logo.png` is the only source provided (raster, navy/blue on transparent
background, no vector file). There is no true light-on-dark variant.

`components/shared/Logo.tsx` compensates by rendering the mark inside a soft
light "chip" wherever it sits on the site's dark surfaces (nav, footer,
loading screen), so the navy portions of the wordmark stay legible.

Follow-up design deliverable: a vector (SVG) logo with a dedicated
light/reversed variant for direct placement on dark backgrounds without the
chip treatment.
