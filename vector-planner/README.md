# VECTOR Planner (MVP)

Config-driven printable planner generator.

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
- Dot Grid notes
- Grid notes
