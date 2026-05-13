# Change Request Template

Use this template to scope future Codex work on VECTOR.

## Request Summary

`<One or two sentences describing the change.>`

## Primary Agent

`<Product Steward | Print/Layout Engineer | Design Systems Agent | Generator Engineer | QA / Verification Agent | Documentation Agent>`

## Reviewer Agent

`<Role responsible for reviewing the change.>`

## Files Allowed To Change

- `<path>`

## Files Not Allowed To Change

- `<path>`

## Product Intent

`<What product outcome should be preserved or improved?>`

## Non-Goals

- `<What should not change?>`

## Acceptance Criteria

- `<Observable result required for completion.>`

## Verification Commands

```bash
npm run verify
```

## Documentation Updates Required

- `<README.md | FINDINGS.md | ENHANCEMENTS.md | DESIGN_STANDARDS.md | none>`

## Filled Example

## Request Summary

Refine Daily Orientation page spacing and reduce box-heavy feel without changing page content, page size, or generator architecture.

## Primary Agent

Design Systems Agent

## Reviewer Agent

Print/Layout Engineer

## Files Allowed To Change

- `src/planner.js`
- `src/styles.css`
- `output/vector-planner.html`
- `ENHANCEMENTS.md`

## Files Not Allowed To Change

- `src/config.json`
- `scripts/render-pdf.js`
- `package.json`

## Product Intent

Daily Orientation should feel like a premium printable planner page with calm hierarchy, useful handwriting space, and reduced form-builder density.

## Non-Goals

- Do not change A5 page size.
- Do not add or remove planner sections.
- Do not change PDF rendering behavior.
- Do not introduce dependencies.

## Acceptance Criteria

- Primary Vector remains prominent.
- Mission Critical keeps three numbered rows.
- Physical State remains compact and writable.
- Friction Scan remains the major lower section.
- The page uses fewer heavy boxes and more rules/whitespace.

## Verification Commands

```bash
npm run verify
```

## Documentation Updates Required

- `ENHANCEMENTS.md`
