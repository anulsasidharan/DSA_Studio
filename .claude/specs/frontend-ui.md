# Frontend UI — DSA Studio

*Extracted from `.claude/rules/CLAUDE.md` § User Interface Components*

Stack: React 18+, TypeScript, Tailwind, shadcn/ui, Monaco, Recharts/Chart.js.

---

## Global navigation

```
[🏠 DSA Studio]  [📚 Learn]  [💻 Practice]  [📊 Track]  [🤖 Assistant]
```

- **Learn** → Topic browser and theory  
- **Practice** → Question list / direct question by slug  
- **Track** → Analytics dashboard  
- **Assistant** → AI chat (Phase 5; can stub earlier)

---

## Page: Dashboard (`/`)

| Section | Content |
|---------|---------|
| Quick stats | Streak, solved count, topics mastered, rank (optional) |
| Daily tracker | Today’s date, solved vs goal, time spent, goal met badge |
| Continue learning | Current topic progress bar + CTA |
| Due for revision | Top N items with priority color + View All |

Wireframe reference: `rules/CLAUDE.md` § Dashboard Page.

---

## Page: Topic learning (`/learn/:topicSlug`)

**Tabs:** Theory | Practice Questions | Notes

| Tab | UI |
|-----|-----|
| Theory | Concept text, complexity, when-to-use bullets, optional diagram |
| Practice | Lists grouped by Basic / Intermediate / Advanced with status icons (✅ solved, ❌ wrong, ⭕ not attempted) |
| Notes | User notes for topic (optional Phase 2+) |

---

## Page: Question practice (`/practice/:questionSlug`)

**Layout:** Header (title, difficulty, tags, bookmark) · Tabs: Description | Solutions | Submissions | Discuss (discuss = future)

| Zone | Components |
|------|------------|
| Left | Monaco editor, language select, Run / Submit |
| Right | Test case results (sample), execution time |
| Footer | Personal notes, Mark for revision, difficulty emoji rating |

**Interactions:**

- Run → sample tests only  
- Submit → full grading + update progress  
- Show Hints → progressive modal (tier 1..n)  
- Solutions tab → gated per product policy  

---

## Page: Analytics (`/track`)

**Tabs:** Overview | Topics | Performance | Streaks

| Visualization | Data source |
|---------------|-------------|
| Overall progress bar | `/api/progress` |
| 30-day heatmap | `/api/progress/analytics` |
| Topic mastery bars | Per-topic completion % |
| Achievements | Badges + streak records |

---

## Page: Import questions (`/import`)

**Tabs:** Manual Entry | CSV Import | JSON Import | URL Import

- Drag-drop upload for CSV/JSON  
- Template download links  
- Import history table  
- Preview before save  

---

## Page: Revision (`/revision`)

- Due today list with priority badges (🔴 🟡)  
- Upcoming week count  
- One-click “Start revision session”  

---

## Component conventions (shadcn/ui)

| Pattern | Component |
|---------|-----------|
| Data tables | `Table` + pagination |
| Filters | `Select`, `Command` combobox for tags |
| Modals | `Dialog` for hints, confirm submit |
| Toasts | `Sonner` or shadcn toast for submit result |
| Loading | Skeleton on question and dashboard loads |

---

## Accessibility

- Keyboard navigation in Monaco toolbar  
- Focus trap in hint/solution dialogs  
- Sufficient contrast for difficulty badges  
- `aria-live` region for test run results  

---

## Responsive behavior

- **Desktop:** side-by-side editor + tests  
- **Tablet:** stacked editor above tests  
- **Mobile:** editor full width; tests in collapsible panel; simplify dashboard charts  

---

## Design tokens (suggested)

| Token | Usage |
|-------|--------|
| `--difficulty-basic` | Green tones |
| `--difficulty-intermediate` | Amber |
| `--difficulty-advanced` | Red |
| `--streak-fire` | Streak emphasis |

Align with ui-ux skill if project adopts a formal design system later.
