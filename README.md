# Kanban board 

### Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Drag & drop: `@hello-pangea/dnd`

### Setup instructions
- run `npm install`
- run `npm run dev`

### Features
- Three columns: `ToDo`, `InProgress`, `Done`
- Drag & drop within and across columns
- Create tasks (title + optional description), inline edit titles
- Global filter by title/description
- localStorage persistence with simulated API delays
- Loading/saving indicators and root error boundary



### Architecture (brief)
- Context + Reducer: centralized state via `AppContext` and `useAppReducer`
- Separation of concerns:
  - `useAppReducer`: pure state/reducer logic
  - `useLoadTasks`: persistence layer (simulated API via `localStorage`)
  - `AppContext`: orchestration + optimistic updates
- Filtering: centralized in context
- Ordering: `orderIndex` computed as the mean between neighbors for stable reordering

#### Data Dlow
```
User Action → Context Action → Reducer → State Update → Component Re-render
                    ↓
              Persistence Layer (simulate API calls with localStorage)
```
