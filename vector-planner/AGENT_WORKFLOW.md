# Agent Workflow

Use this workflow for future VECTOR changes. Codex is the execution harness; this document defines the operating discipline.

## Step 1: Classify The Request

Choose one or more categories:

- `product/content`
- `visual/layout`
- `print/PDF`
- `generator/code`
- `QA/testing`
- `docs`

## Step 2: Select Active Roles

Identify:

- Primary agent.
- Reviewer agent.
- Files likely touched.

Use the role definitions and handoff rules in the root `AGENTS.md`.

Spawnable project-scoped agent names:

- `product_steward`
- `print_layout_engineer`
- `design_systems_agent`
- `generator_engineer`
- `qa_verification_agent`
- `documentation_agent`

## Step 3: State Non-Goals

Explicitly list what will not be changed. Examples:

- No page redesign.
- No content changes.
- No page size changes.
- No PDF behavior changes.
- No dependency changes.

## Step 4: Make The Smallest Coherent Change

- Avoid broad refactors during visual tuning.
- Avoid visual edits during infrastructure tasks.
- Keep changes scoped to the active role.
- Preserve the generator flow: `config -> page builders -> complete HTML -> optional PDF`.

## Step 5: Run Verification

Run from `vector-planner/`:

```bash
npm run build:html
npm run check:output
```

Preferred complete command:

```bash
npm run verify
```

Optionally run PDF export if dependencies exist:

```bash
npm run build:pdf
```

Do not require PDF verification when Playwright dependencies are not installed.

## Step 6: Update Docs

- Update `ENHANCEMENTS.md` for user-visible or design changes.
- Update `FINDINGS.md` for discovered architecture, build, or workflow issues.
- Update `DESIGN_STANDARDS.md` for durable design rules.
- Update `README.md` only for usage, build, or workflow entry-point changes.

Do not document speculative features as implemented.

## Step 7: Report Result

Report:

- Files changed.
- What changed.
- Verification performed.
- Remaining risks or assumptions.
