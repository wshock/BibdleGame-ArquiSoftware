# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Bibdle is a Wordle-style guessing game about biblical characters. The project is split into two main parts:
- **Bibdle Front**: React + Vite frontend with TailwindCSS
- **Bibdle Back**: Express.js REST API backend

## Development Commands

### Frontend (Bibdle Front)
Navigate to `Bibdle Front/` directory first:

- **Development server**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (ESLint check)
- **Preview**: `npm run preview` (preview production build)

### Backend (Bibdle Back)
Navigate to `Bibdle Back/` directory first:

- **Development server**: `npm run dev` (starts Express with nodemon on port 4001)

## Architecture

### Frontend Architecture

**Entry Point**: `src/main.jsx` → `src/App.jsx`

**Game Selection System**: App.jsx uses `react-select` to switch between three game modes:
- Classic (PrincipalGame) - main implemented game
- Phrase (PhraseGame) - placeholder
- Emoji (EmojiGame) - placeholder

**Classic Game Flow** (PrincipalGame.jsx):
1. User selects a biblical character from searchbar (SearchBarAuto component)
2. Frontend sends character data to backend API (`POST /characterOfTheDay`)
3. Backend compares with "character of the day" and returns comparison results
4. Frontend displays results using ResultRow components with color-coded feedback:
   - Green: total coincidence
   - Yellow: partial coincidence  
   - Red: no coincidence
5. Game ends when all attributes match

**Key Components**:
- `SearchBarAuto`: Autocomplete select for character input, manages API calls
- `ResultRow`: Displays guess results with animate.css flip animations
- `TitlePrincipalGame`: Column headers for result display

**Character Data**: Stored in `src/constants/charactersLogic/characters.js`
- Each character has: name, gender, time (Testament), role(s), hint

### Backend Architecture

**Entry Point**: `src/index.js` (Express server on port 4001)

**API Structure**:
- Single POST endpoint: `/characterOfTheDay`
- CORS enabled for frontend communication
- Morgan for request logging

**Comparison Logic** (`src/utils/compareCharacters.js`):
- Compares player's character against the daily character
- Returns three comparison results: gender, time, role
- Handles both string and array comparisons
- Array comparisons detect partial matches (some roles match)

**Controller** (`src/controllers/character.controller.js`):
- Currently hardcoded with "Noé" as character of the day
- TODO: Implement daily rotation logic

## Important Notes

- Backend runs on `localhost:4001`
- Frontend expects backend at `http://localhost:4001` (hardcoded in SearchBarAuto.jsx)
- Character of the day is currently static - needs daily rotation implementation
- Phrase and Emoji game modes are not yet implemented
- The comparison system is designed to be expanded beyond the current 3 attributes (gender, time, role)
