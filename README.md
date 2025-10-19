# Kanban board 
### Setup instructions
1. run `npm install`
2. run `npm run dev`

### Brief notes
#### State Management Architecture
* Context + Reducer Pattern: Centralized state management using AppContext with useAppReducer
* Separation of Concerns:
  * useAppReducer: State logic with reducer pattern
  * useLoadTasks: Data persistence layer (simulate API calls with localStorage)
  * AppContext: Business logic orchestration


#### Component Architecture
* Container/Presentational Pattern:
  * App.tsx: Main container with drag-drop logic
  * Column.tsx: Column container managing task lists
  * TaskComponent.tsx: Presentational task component
* Composition over Inheritance: Small, focused components with clear responsibilities

#### Data Dlow
```
User Action → Context Action → Reducer → State Update → Component Re-render
                    ↓
              Persistence Layer (simulate API calls with localStorage)
```
