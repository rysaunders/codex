# Vector Planner Codebase Findings

## Purpose

Vector Planner is a config-driven printable planner generator. The current product target is a physical daily planner artifact, not a web app. The codebase should therefore optimize for deterministic paper output, easy regeneration, and clear planner-system customization.

The planner is currently branded as `VECTOR` / `Operator Journal` and appears tuned around a daily operating loop:

- Orient on the day.
- Select high-leverage work.
- Reduce friction before execution.
- Execute across training, work, connection, and recovery.
- Calibrate in the evening.

## Repository Shape

```text
vector-planner/
  package.json
  README.md
  FINDINGS.md
  output/
    vector-planner.html
  scripts/
    render-pdf.js
  src/
    config.json
    index.html
    planner.js
    styles.css
```

The implementation is intentionally small. `planner.js` is the main generator, `styles.css` controls page geometry and print appearance, `config.json` controls planner metadata and date range, and `render-pdf.js` converts generated HTML to PDF through Playwright.

## Build Pipeline

The intended pipeline is:

1. Read `src/config.json`.
2. Read and inline `src/styles.css`.
3. Generate static HTML pages in memory.
4. Write `output/vector-planner.html`.
5. Use Playwright Chromium to print that HTML to `output/vector-planner.pdf`.

The HTML generation works when invoked from either the package directory or the repository root:

```bash
cd vector-planner
npm run build:html
```

Observed output:

```text
Generated 21 pages at /Users/kernel/code/codex/vector-planner/output/vector-planner.html
```

`planner.js` and `render-pdf.js` now resolve paths from their own file locations instead of the caller's current working directory.

The PDF step was not runnable in the current workspace because `playwright` is declared in `devDependencies` but dependencies are not installed.

## Configuration Surface

Current `src/config.json`:

```json
{
  "title": "VECTOR",
  "subtitle": "Operator Journal",
  "edition": "Edition 01",
  "range": "Daily",
  "startDate": "2026-05-11",
  "days": 7,
  "phase": "Hyrox Base",
  "pageSize": "A5",
  "theme": "field-manual"
}
```

The effective customization surface is smaller than the config suggests:

- `title` is used only in the generated HTML document title.
- `subtitle` appears on the cover.
- `edition` appears on the cover.
- `range` appears on the cover.
- `startDate` and `days` drive daily spread generation.
- `phase` appears on weekly and daily pages.
- `pageSize` is not currently used by code or CSS.
- `theme` is not currently used by code or CSS.

For the current config, the daily spread covers May 11, 2026 through May 17, 2026.

## Page Model

The planner currently generates 21 A5 portrait pages:

- 1 cover page.
- 1 Vector Method page.
- 1 Quarterly Compass page.
- 1 Weekly Planning page.
- 14 daily pages, generated as 2 pages per day for 7 days.
- 1 Weekly Review page.
- 1 dot-grid notes page.
- 1 second dot-grid notes page.

Daily page 1 focuses on planning:

- Date and phase header.
- Primary Vector.
- Mission Critical 01-03.
- Physical State.
- Friction Scan.

Daily page 2 focuses on execution and review:

- Date and execution header.
- Training / Movement.
- Notes / Observations.
- Evening Calibration.

This is a coherent planner loop. The strongest product idea is the friction scan paired with evening calibration: it makes the planner more than a todo list.

## Print And Layout Assumptions

The CSS is print-first:

- `@page` is fixed to A5 portrait.
- `.page` is fixed to `148mm x 210mm`.
- Pages have asymmetric left/right padding for facing-page binding margins.
- `.page.right` swaps the larger margin to the outside edge.
- Print mode removes preview spacing and applies `break-after: page`.

The visual direction is a field-manual style:

- Warm paper background.
- Muted ink and rule colors.
- Thin rules and restrained section dividers.
- Dot-grid writing surfaces for notes and larger free-writing areas.
- Black cover.

The current font stack is `"Helvetica Neue"`, `Helvetica`, `Arial`, `sans-serif`. There is no embedded font, so printed output depends on system font availability unless the PDF renderer has access to those fonts.

## Architecture Findings

Strengths:

- The project is small enough to understand quickly.
- The output is deterministic for a given config.
- The date handling uses UTC, avoiding local timezone rollover bugs.
- The physical page size is explicit in CSS.
- The planner concept is already encoded as a repeatable operating loop.
- The generator is split into explicit page-builder functions.
- Output directory creation is handled by the generator.

Risks:

- Config fields exist that are not used, which makes customization misleading.
- `index.html` is not part of the generation path and currently acts as an unused stub.
- There are no tests or snapshot checks, so layout regressions will be hard to detect.
- PDF generation depends on Playwright being installed, but there is no lockfile in the repository.

## Recommended Next Changes

1. Either use every config field or remove unused fields until they are implemented.
2. Add a simple validation pass for `config.json`, especially `startDate`, `days`, and `pageSize`.
3. Add deterministic build checks, starting with a test that confirms page count and key labels for a known config.
4. Decide whether generated `output/` artifacts are source-controlled deliverables or ignored build products.
5. Add a page inventory or manifest if the planner will expand into multiple editions, date ranges, or themes.
6. Add visual regression snapshots or PDF page screenshots before larger layout changes.

## LLM Maintenance Notes

Future changes should preserve the simple data flow:

```text
config -> page builders -> complete HTML -> optional PDF
```

Avoid introducing a frontend framework unless the planner needs interactive editing. The current artifact is static print output, so the most useful improvements are better config validation, clearer page-builder structure, stronger print layout controls, and reproducible PDF generation.
