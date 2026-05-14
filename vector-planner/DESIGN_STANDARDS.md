# VECTOR Planner Design Standards

## Product Intent

VECTOR is a printable A5 operator journal. It should feel like a premium physical planner, not a web form exported to PDF.

The design language is:

- Premium field notebook.
- Swiss typography.
- Leica/manual restraint.
- Aviation checklist clarity.
- Subtle training-log utility.

## Global Rules

- Keep A5 portrait sizing and print-safe margins.
- Use warm off-white paper and muted ink.
- Prefer thin rules, dividers, columns, labels, and whitespace over full rectangular boxes.
- Prefer open handwriting space over horizontal writing lines. Use ruled lines sparingly only when they clarify structure or measurement.
- Use small uppercase labels with generous tracking.
- Keep hierarchy deliberate and restrained.
- Make all writing areas usable with pen.
- Use dot-grid texture only inside large writing areas.
- Keep dot/grid texture away from small tables, labels, and scorecards.
- Ensure grayscale printing remains clean and legible.

## Page Standards

Vector Method should read as a designed manual page: numbered process ladder, concise copy, subtle connectors, and an Operating Standard panel.

Quarterly Compass should feel like a compact strategic map: subtitle `Big picture. Clear direction.`, left-side Theme and Focus Areas, right-side Outcomes, and a boxed North Star module at bottom-right. Do not reintroduce Standards, Constraints, or Risks/Friction unless the user explicitly changes the page concept.

Daily Orientation should feel calm and writable: large Primary Vector, numbered Mission Critical rows, compact Physical State rows, and an important lower Friction Scan split into derail/reduce prompts.

Daily Execution should have a clean two-column Training / Movement section: dot-grid writing area on the left and a separate stats panel on the right. Notes / Observations stays dot-grid. Evening Calibration uses refined rules and choice circles.

Weekly Planning should feel like a weekly command brief: one open Primary Vector, a Mission Critical block with numbered commitments, compact support targets, and lower friction/pre-commitment controls. Avoid stacked equal-weight form boxes and avoid horizontal writing lines unless they add structure.

Weekly Review should use a two-column structure: reflection prompts on the left and a compact scorecard plus Next Week vector on the right.

## Current Implementation Notes

The generator uses explicit page-builder functions in `src/planner.js` and print-first styling in `src/styles.css`.

Primary reusable classes:

- `.page-header`
- `.eyebrow`
- `.section-label`
- `.ruled-area`
- `.dot-grid-area`
- `.two-column`
- `.thin-rule`
- `.scorecard`
- `.method-step`
- `.stat-panel`

When adding new planner sections, start from these primitives before creating new layout patterns.
