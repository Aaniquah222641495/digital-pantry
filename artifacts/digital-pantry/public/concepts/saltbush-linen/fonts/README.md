# Fonts for the Saltbush & Linen concept

All fonts are free under the SIL Open Font License 1.1 (OFL). They are downloaded and self-hosted here (no Google Fonts link, no CDN), loaded with `font-display: swap`. Each family's licence text sits next to the files (`OFL-<family>.txt`).

Source for every file: the Google Fonts project repository, https://github.com/google/fonts (folder `ofl/<family>/`), downloaded 2026-10-12. Licence confirmed from the OFL.txt in the same folder (copyright lines inside each OFL file). No font here has a Reserved Font Name (Tenor Sans was considered and dropped for that reason: subsetting it would have broken its licence terms).

What was done to the originals: subset to Basic Latin + Latin-1 (includes the half and three-quarter signs used on the menu) + curly quotes, converted to WOFF2, and for variable fonts the weight range was trimmed to what the page uses. Kerning, ligatures, lining and tabular numerals and small caps were kept. Done with fontTools (a Python tool) in a scratch folder.

| Family | Role | Source folder | Licence | File | Size |
|---|---|---|---|---|---|
| Cormorant Garamond (roman, wght 300-600) | Option A: headings, treatment names, prices, quotes | ofl/cormorantgaramond | OFL 1.1 | CormorantGaramond.woff2 | 42.0 KB |
| Cormorant Garamond (italic, wght 400-500) | Option A: descriptions, durations, quotes | ofl/cormorantgaramond | OFL 1.1 | CormorantGaramond-Italic.woff2 | 31.6 KB |
| Hanken Grotesk (wght 400-600) | Options A and B: body text, labels, buttons | ofl/hankengrotesk | OFL 1.1 | HankenGrotesk.woff2 | 18.3 KB |
| Pinyon Script (400) | Options A and C: the script wordmark only | ofl/pinyonscript | OFL 1.1 | PinyonScript.woff2 | 34.6 KB |
| Newsreader (roman, wght 300-500, optical size fixed at 28) | Option B: headings, treatment names | ofl/newsreader | OFL 1.1 | Newsreader.woff2 | 48.1 KB |
| Newsreader (italic, same) | Option B: descriptions, quotes, the name | ofl/newsreader | OFL 1.1 | Newsreader-Italic.woff2 | 53.0 KB |
| Albert Sans (wght 200-600) | Option C: everything | ofl/albertsans | OFL 1.1 | AlbertSans.woff2 | 28.2 KB |

Weight actually downloaded by a visitor (the browser fetches only the faces the chosen option uses):
- A (recommended): Cormorant roman + italic + Hanken + Pinyon = about 126 KB
- B: Newsreader roman + italic + Hanken = about 119 KB
- C: Albert Sans + Pinyon = about 63 KB

Switch the whole page with one line in `config.js`: `typeset: "A"` (or "B", "C").

Removed in this pass: Jost and Outfit (the earlier geometric sans) and the Mac's installed Snell Roundhand stand-in. Pinyon Script replaces it as the licensed script for the wordmark; it is the closest open-licence match we found to the lettering on their menu (compared against Ballet, Great Vibes and Allura). Their own lettering file would still be better; ask the client for it.

Not done yet (for a real build): metric-matched fallback fonts to avoid layout shift on slow networks.
