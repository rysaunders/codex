# Vector Planner Enhancement Log

## Current Layout Direction

See [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md) for the durable design standards future agents should follow.

The planner should feel like a physical operating manual: spacious, calm, structured, and easy to write in. The attached product render establishes the target direction:

- A5 print-first pages.
- Large writing regions rather than dense form fields.
- Subtle rules and dot grids.
- Consistent daily operating loop from planning to calibration.
- Physical artifact assumptions such as binding margins and page pairs.

## Implemented In This Pass

- Fixed script path resolution so generation is not tied to the caller's current working directory.
- Created `output/` automatically during HTML generation.
- Refactored `planner.js` into explicit page-builder functions.
- Capitalized the first word of each Vector Method sentence.
- Improved Vector Method spacing by making the five method blocks share available page height.
- Kept `phase` config-driven through `src/config.json`; no page text hardcodes `Hyrox Base`.
- Expanded Weekly Planning blocks to use the full page height.
- Expanded the first Daily Planning page so Primary Vector, Mission Critical, Physical State, and Friction Scan have more writing room.
- Made both notes pages dot-grid pages for consistency.
- Removed ruled writing lines from planner areas that should stay visually quiet.
- Reworked Daily Review into a larger Training / Movement section with a right-side metrics table, a smaller Notes / Observations section, and a structured Evening Calibration section.
- Shrunk the Daily Planning Friction Scan section so it clears the footer cleanly.
- Replaced box-heavy page layouts with thin rules, section dividers, whitespace, dot-grid writing surfaces, and compact utility panels.
- Redesigned Vector Method as an editorial process ladder with an Operating Standard panel.
- Expanded Quarterly Compass into a full-page strategic planning grid.
- Rebuilt Daily Orientation as a hierarchy of Primary Vector, Mission Critical rows, compact Physical State, and lower Friction Scan prompts.
- Rebuilt Weekly Review as a two-column review page with a right-side scorecard and Next Week vector area.
- Added an agent operating model for Codex-driven VECTOR work.
- Added a standard agent workflow document and reusable change request template.
- Added a pre-print checklist for the first physical test print.
- Added lightweight output verification with `npm run verify`.
- Added project-scoped Codex custom agents under `.codex/agents/` for the documented VECTOR roles.
- Adjusted the Daily Execution Training / Movement stat panel so it lives inside the section between continuous horizontal dividers.

## Near-Term Enhancements

- Add config validation for `startDate`, `days`, `phase`, `pageSize`, and future edition settings.
- Decide whether `phase` should be hidden when empty or replaced with a writable blank.
- Add a page manifest so page order and counts are explicit and testable.
- Add simple build tests that verify page count and required labels for a known config.
- Add support for planner editions such as 7-day, 30-day, and 90-day outputs.
- Decide whether generated output files should be committed or treated as ignored build artifacts.
