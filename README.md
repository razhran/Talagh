# Talagh | طلاقة — Advanced everyday and engineering English

**Talagh (طلاقة)** is an **offline-first, front-end-only** vocabulary trainer built with HTML, CSS and JavaScript. It is designed for a learner at **B2+ to C1** level with an interest in mechanical maintenance and engineering.

## How to launch

1. Unzip the project.
2. **Do not open `index.html` directly using `file://`.** The word-bank JSON, JavaScript modules and browser storage are designed for HTTP(S).
3. For local use, run a small web server inside the `vocablab` directory:

   ```bash
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000` in Chrome, Edge, Safari or Firefox.
5. To deploy, upload the **contents of the `vocablab` directory** to your GitHub Pages repository. GitHub Pages gives the site HTTPS, which is required for PWA installation and service workers.

## What's included

- 148 curated **B2+/C1-oriented** vocabulary entries, including advanced general English, workplace terms, mechanical maintenance, rotating equipment, hydraulics and safety. CEFR labels are editorial estimates, **not certified CEFR classifications**.
- Custom-word creation with duplicate checking, category, definition and example.
- Five-word daily plan, selectable general/technical ratio.
- Start-of-day recall of the most recent prior completed lesson (two questions per word).
- **Carry-forward rule:** two wrong answers to a word in the previous lesson or today's recall ensure it is among the next day's core words, up to five available slots. Older weak words are queued by priority.
- Multiple-choice, typing, fill-in-the-blank and listening challenges (via browser speech synthesis).
- Spaced repetition with review intervals dependent on recall performance.
- Daily progress, weak words, history, streak and accuracy statistics.
- Local IndexedDB storage, JSON export/import, and PWA assets cached for offline use after the first successful load.
- Dark/light appearance, responsive layout for desktop/tablet/mobile.

## Learning rules and constraints

1. The day is based on the device's local calendar. The site does **not** provide tamper-proof time validation.
2. When entering a new day, the previous completed lesson is reviewed before assigning the next five core words. If days have been missed, older overdue items are available in the separate extra-review area.
3. Each learning and checkpoint session asks **two independent questions for each word**. Each submitted answer counts once. Two incorrect responses for the same word flag it as weak.
4. A word flagged weak on the previous day is carried into the new lesson, **even if the morning checkpoint went well**; this gives it a reinforcement session.
5. The word mix setting affects **future** daily plans only; existing plans remain stable.
6. Missed or unfinished work can be resumed and rolled forward. Extra spaced-repetition questions do not count toward the five core daily slots.
7. Audio uses the browser's `speechSynthesis` engine and installed voices. Availability and accent vary by platform.
8. The app cannot send guaranteed daily push notifications or sync between devices without additional services.
9. Stored data belongs to the browser profile; clearing site data will delete it unless you made a JSON backup.
10. Some word meanings have alternatives and English words may have more than one valid answer. The typing exercise uses the bank's displayed answer; if a valid synonym is rejected, review the answer as an instructional limitation. Synonym acceptance can be extended in a later update.

## Project layout

```
vocablab/
  index.html
  manifest.webmanifest
  sw.js
  assets/
    icon.svg
    style.css
    talagh.css
  data/
    words.json
  js/
    app.js
    db.js
    engine.js
```

## Storage

The app uses IndexedDB with object stores `words`, `progress`, `days`, `attempts`, and `meta`. Backups serialize these as JSON, with an application format identifier. Data is not sent to an external server.

## Notes for future enhancements

- Add a pronunciation recording option for supported browsers.
- Add multiple accepted English synonyms for typing answers.
- Add contextual reading comprehension and original sentence-composition tasks.
- Add optional sync (requires a backend or cloud service).
- Add more advanced specialist terms and manually reviewed translations.

## Talagh visual identity and icons

The refreshed design uses light-mode by default, a violet/mint visual system, and Flaticon UIcons (Regular Rounded / Solid Rounded) loaded from the official CDN. The core study features and IndexedDB backup format are unchanged, so previous progress is preserved when deployed to the same origin/path. The UI is responsive, but **Flaticon icons require an internet connection** until you locally host properly licensed font files. Check the [Flaticon UIcons license](https://www.flaticon.com/uicons/get-started) and retain the attribution link in the website footer.
