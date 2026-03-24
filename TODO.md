# March Madness Referral Hub — TODO

## High Priority

### 1. Wire up leaderboard
API route returns empty mock data with a TODO for Google Sheets integration. Core engagement driver — needs to be live.

### 2. Fix silent error handling on leaderboard fetch
`.catch(() => {})` swallows errors. Should show an error state to users.

### 3. Move contest end date to env variable
`"2026-04-10T23:59:59-04:00"` is hardcoded in `CountdownTimer.tsx`. Should be `NEXT_PUBLIC_CONTEST_END`.

### 4. Extract inline data into a `data/` folder
16 role descriptions, 11 FAQs, 5 prize tiers, bonus tiers — all hardcoded inside components. Extracting into shared data files keeps components pure UI and makes copy edits easier.

### 5. Remove `canvas-confetti` dependency
In `package.json` but never imported anywhere. ~24KB dead weight.

---

## Medium Priority

### 6. Consolidate scanlines pattern
Duplicated in `BonusTiers`, `PrizeTiers`, `RoleBlurbs`, and `globals.css` with different opacities. Should be one shared constant or Tailwind utility.

### 7. Consolidate glow effects
`.glow-blue` / `.glow-orange` exist in CSS but some components also use inline `textShadow` with the same values. Pick one approach.

### 8. Shared tier color map
`BonusTiers`, `PrizeTiers`, and `RoleBlurbs` each maintain their own tier color mapping. One shared `TIER_COLORS` constant eliminates drift.

---

## Low Priority

### 9. OutreachBuilder modal accessibility
- No focus trap (tab escapes the modal)
- No Escape key to close
- Custom checkboxes lack `aria-checked`

### 10. Component memoization
Role cards, prize rows, FAQ items — none are memoized. Free insurance with `React.memo`.

### 11. Replace hand-rolled cookie helper
`getCookie()` in `page.tsx` is a regex parser. `js-cookie` or Next.js `cookies()` would be more robust.
