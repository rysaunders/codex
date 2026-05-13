# VECTOR Planner (MVP)

Config-driven printable planner generator.

See [FINDINGS.md](./FINDINGS.md) for the current codebase assessment, build notes, and recommended next changes.
See [ENHANCEMENTS.md](./ENHANCEMENTS.md) for the planner layout direction and enhancement log.
See [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md) for the print product design standards future layout work should follow.
See [AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md) for the Codex-driven agentic workflow.

## Run

```bash
npm install
npm run build
```

Outputs:
- `output/vector-planner.html`
- `output/vector-planner.pdf`

## Configuration

Edit `src/config.json`:
- `startDate`
- `days`
- `phase`
- `pageSize` (layout tuned for A5 in MVP)

## Included MVP pages
- Cover
- VECTOR METHOD page
- Quarterly Compass page
- Weekly Planning page
- Daily spreads (`days * 2` pages)
- Weekly Review page
- Dot-grid notes pages

## Agentic Workflow

Codex is used as the execution harness for this repository. Agent roles and constraints are documented in the root [AGENTS.md](../AGENTS.md).

Project-scoped custom agents are defined in `../.codex/agents/` and can be spawned explicitly by role name when a task benefits from parallel review or specialized execution.

Future changes should be scoped with [CHANGE_REQUEST_TEMPLATE.md](./CHANGE_REQUEST_TEMPLATE.md). Run this before considering a change complete:

```bash
npm run verify
```
