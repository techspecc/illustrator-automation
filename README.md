# Illustrator Automation Scripts

Two scripts for selecting objects in Adobe Illustrator by size:

- `selectcirclesbyrange.jsx`: Select circles within a diameter range.  
  Usage: Run script, enter min/max diameter (mm or pt).

- `selectobjectsbybounds.jsx`: Select objects by width and height ranges.  
  Usage: Run script, enter min/max width and height (mm or pt).

Ensure your document is open and objects are unlocked and visible before running.

# HOW TO: Illustrator Selection Scripts

This guide explains how to install and run two Adobe Illustrator ExtendScript (JSX) utilities for selecting objects by size.

## Scripts Covered

- **selectcirclesbyrange.jsx** — Selects circular items (including symbol instances) within a diameter range.
- **selectobjectsbybounds.jsx** — Selects any items by width/height ranges.

## One‑Time Run

1) Open your Illustrator document.
2) Save the desired script as a `.jsx` file.
3) Illustrator → File → Scripts → Other Script… → choose your `.jsx`.
4) Follow the prompts.

## Permanent Install (Menu Integration)

Copy `.jsx` files into the Illustrator Scripts folder, then restart Illustrator.

- macOS: `/Applications/Adobe Illustrator [version]/Presets/en_US/Scripts`
- Windows: `C:\\Program Files\\Adobe\\Adobe Illustrator [version]\\Presets\\en_US\\Scripts`

The scripts will appear under File → Scripts.

## Input & Units

- Accepted units: `mm` and `pt`.
- If no unit is entered, the scripts default to `mm`.
- A small internal tolerance is used to handle rounding (no exact match required).

## Usage Details

### selectcirclesbyrange.jsx
- Prompts for Minimum diameter and Maximum diameter (leave blank for none).
- Treats items with `width ≈ height` as circles.
- Scans visible, unlocked items (paths, compound paths, symbol instances by rendered bounds).
- Result: matching items are selected; a dialog displays the count.

**Examples**
- Min: `50mm`, Max: `100mm` → selects circles 50–100 mm in diameter.
- Min: `200pt`, Max: *(blank)* → selects circles ≥ 200 pt.
- Min: *(blank)*, Max: `75mm` → selects circles ≤ 75 mm.

### selectobjectsbybounds.jsx
- Prompts for min/max **width** and min/max **height** (leave any blank for none).
- Matches any PageItem with width/height (paths, groups, compound paths, symbol instances, etc.).
- Skips hidden/locked items.
- Result: matching items are selected; a dialog displays the count.

**Examples**
- Width `>= 20mm` and Height `<= 40mm`.
- Width between `10mm`–`30mm`, Height between `10mm`–`30mm`.

## Best Practices

- Save your document before running selections on large files.
- Lock or hide layers you don’t want processed to reduce scan time.
- Prefer these targeted scripts over Select → Same on very large documents.

## Compatibility Notes

- Illustrator’s ExtendScript engine is ES3-level JavaScript.
- Avoid modern JS features when modifying scripts (e.g., `trim`, `let/const`, arrow functions).
- Use ES3-safe patterns (e.g., manual whitespace trim with regex) as already included in these scripts.

## Troubleshooting

- **Nothing selected**: Check units and ranges; verify items are visible/unlocked and meet criteria.
- **Invalid input**: Enter numeric value plus optional unit (`12`, `34mm`, `48pt`).
- **Script not in menu**: Ensure file extension is `.jsx` and Illustrator was restarted after copying.
- **Symbol instances not caught (circles script)**: Ensure the instances actually render as circles (equal width/height) and fit the range.

## Notes on Performance

- Both scripts run in O(n) over `pageItems` and are faster than appearance-based global selection.
- Tolerance defaults:
  - Circles: ~0.25 pt for width≈height, ±0.5 pt for range checks.
  - Bounds: ~0.25 pt for range checks.
