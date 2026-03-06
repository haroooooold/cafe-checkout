# Cafe Checkout System

## Tech Stack

Framework: React + TypeScript
State Management: Redux Toolkit
UI Library: Ionic React
Testing: Jest + React Testing Library (with custom matchMedia mocking)

## Architecture

Feature-based architecture was used to isolate business domains (menu and cart). Utilities handle shared logic such as fuzzy search and price calculation.
Redux Toolkit manages global state, and async data fetching is handled using createAsyncThunk.

## Setup Instructions

Install Dependencies:
npm install

Run Development Server:
npm run dev

Run Tests:
npm run test

## Trade-offs

State Management: Redux was implemented instead of local useState to allow the checkout data to persist across different view layers, despite the extra boilerplate required for the store setup.

## Known Limitations

Persistence: There is currently no middleware (like redux-persist) to save the cart state; data is lost on browser refresh.
Limited UI styling
