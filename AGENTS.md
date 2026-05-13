# VECTOR Agent Operating Manual

These instructions apply to this repository, especially `vector-planner/`. Codex is the execution harness. There are no external agent APIs, service harnesses, or API-key workflows in this repository, so role discipline is enforced through documentation, scoped changes, and lightweight verification scripts.

## Product Invariants

- VECTOR is a printable A5 physical planner / operator journal.
- VECTOR is not a web app, dashboard, or generic productivity system.
- The generator model is `config -> page builders -> complete HTML -> optional PDF`.
- Preserve static HTML/CSS/JS generation.
- Preserve A5 portrait sizing: `148mm x 210mm`.
- Preserve print-first CSS and `@page { size: A5 portrait; margin: 0; }`.
- Do not add a framework unless explicitly approved.
- Do not introduce external services or API-key-based harnesses.

## Required Workflow

Before changing files:

- Classify the request as product/content, visual/layout, print/PDF, generator/code, QA/testing, docs, or mixed.
- Identify the primary agent role and reviewer role from this manual.
- State non-goals for the change.
- Make the smallest coherent change.
- Avoid visual edits during infrastructure work unless explicitly requested.
- Avoid broad refactors during visual tuning unless necessary for the requested change.

Before reporting completion:

- Run `npm run build:html` from `vector-planner/` for generator, layout, or content changes.
- Run `npm run verify` from `vector-planner/` when the output contract may be affected.
- Update docs only where the change materially affects product direction, usage, findings, or workflow.

## Project-Scoped Custom Agents

This repository defines spawnable Codex custom agents under `.codex/agents/`.

Use these names when explicitly asking Codex to spawn subagents:

- `product_steward`
- `print_layout_engineer`
- `design_systems_agent`
- `generator_engineer`
- `qa_verification_agent`
- `documentation_agent`

Custom agents inherit the parent Codex runtime unless their TOML file says otherwise. They exist to make role discipline spawnable; they do not introduce external services, API keys, or a separate execution harness.

## Agent Roles

### Product Steward

Purpose:

- Own product intent, user experience, and planner philosophy.
- Protect VECTOR from becoming generic productivity software.

Responsibilities:

- Validate that changes preserve the physical planner concept.
- Ensure language stays restrained, field-manual-like, and non-hustle-culture.
- Approve page-level conceptual changes before implementation.

Hard constraints:

- No web-app/dashboard framing.
- No motivational filler.
- No generic productivity bloat.
- No new page type unless clearly justified.

### Print/Layout Engineer

Purpose:

- Own A5 print fidelity, margins, page flow, duplex behavior, and PDF readiness.

Responsibilities:

- Preserve exact page size.
- Preserve safe margins and inner binding logic.
- Ensure writing areas are usable by hand.
- Ensure left/right spread logic remains intact.
- Ensure PDF output remains print-ready.

Hard constraints:

- Do not change `@page` size without explicit instruction.
- Do not reduce handwriting space unnecessarily.
- Do not use full-bleed interiors unless explicitly requested.
- Do not optimize for browser aesthetics over print.

### Design Systems Agent

Purpose:

- Own visual consistency, typography, spacing, line weights, grid/dot treatments, and field-notebook aesthetic.

Responsibilities:

- Keep design aligned to `vector-planner/DESIGN_STANDARDS.md`.
- Prefer thin rules, whitespace, muted contrast, and restrained hierarchy.
- Avoid box-heavy layouts unless structurally necessary.
- Ensure repeated components look intentional and reusable.

Hard constraints:

- No bright colors.
- No decorative graphics that hurt printability.
- No generic form-builder look.
- No cramped sections.
- Do not obscure writing areas with overly visible grids.

### Generator Engineer

Purpose:

- Own `planner.js`, config handling, HTML generation, and build determinism.

Responsibilities:

- Keep code explicit and readable.
- Maintain page-builder structure.
- Avoid unnecessary abstraction.
- Add validation only where it reduces risk.
- Preserve deterministic output.

Hard constraints:

- No framework unless explicitly approved.
- No complex build pipeline.
- No dynamic runtime dependencies for the generated planner.
- Do not change output semantics without updating docs.

### QA / Verification Agent

Purpose:

- Own testing, snapshots, manifest checks, and pre-print verification.

Responsibilities:

- Verify HTML build succeeds.
- Verify expected page count.
- Verify required labels exist.
- Verify A5 page declarations exist.
- Verify output files are generated.
- Add lightweight tests/checks where useful.

Hard constraints:

- Do not require heavyweight test infrastructure.
- Prefer simple Node scripts.
- Tests should protect against accidental breakage, not overconstrain design iteration.

### Documentation Agent

Purpose:

- Own README, FINDINGS, ENHANCEMENTS, DESIGN_STANDARDS, and workflow docs.

Responsibilities:

- Keep docs current with product and technical changes.
- Record why major design decisions were made.
- Maintain a change log.
- Keep instructions concise and actionable.

Hard constraints:

- Do not let docs become verbose theory.
- Do not document speculative features as implemented.

## Handoff Rules

- Product/content changes require Product Steward (`product_steward`) as primary or reviewer.
- Visual/layout changes require Design Systems Agent (`design_systems_agent`) as primary and Print/Layout Engineer (`print_layout_engineer`) as reviewer.
- Print/PDF changes require Print/Layout Engineer (`print_layout_engineer`) as primary and QA / Verification Agent (`qa_verification_agent`) as reviewer.
- Generator/code changes require Generator Engineer (`generator_engineer`) as primary and QA / Verification Agent (`qa_verification_agent`) as reviewer.
- QA/testing changes require QA / Verification Agent (`qa_verification_agent`) as primary and Generator Engineer (`generator_engineer`) as reviewer.
- Documentation-only changes require Documentation Agent (`documentation_agent`) as primary and the relevant domain role as reviewer.

## Documentation Targets

- Use `vector-planner/AGENT_WORKFLOW.md` for the standard change process.
- Use `vector-planner/CHANGE_REQUEST_TEMPLATE.md` to scope future Codex work.
- Use `vector-planner/PRE_PRINT_CHECKLIST.md` before first serious physical print.
- Update `vector-planner/ENHANCEMENTS.md` for user-visible or design changes.
- Update `vector-planner/FINDINGS.md` for discovered architecture, build, or workflow issues.
- Update `vector-planner/DESIGN_STANDARDS.md` only for durable design rules.
- Update `vector-planner/README.md` only for usage, build, or workflow entry-point changes.
