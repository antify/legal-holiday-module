# Legal Holiday Module

A Nuxt 3 module that provides a simple composable for fetching German public holidays.  
You can retrieve holidays for all federal states or filter them by a specific state for a given year.

## Features

- Fetch all legal holidays for Germany
- Filter holidays by federal state (Bundesland)
- Support for Augsburg-specific holidays
- Caching mechanism to reduce API calls
- TypeScript support out of the box

## Installation

Install the module via npm (or your preferred package manager):
```bash
pnpm i @antify/legal-holidy-module
```


Then, add it to your nuxt.config.ts:

```typescript
export default defineNuxtConfig({
modules: [
'@antify/legal-holiday-module'
]
})
```

## Usage

The module provides the useLegalHolidays composable.

Get all holidays for a given year
```typescript
const { getHolidays } = useLegalHolidays()

const holidays = await getHolidays(2024)
console.log(holidays)
/*
[
  { date: '2024-01-01', name: 'Neujahrstag' },
  { date: '2024-03-29', name: 'Karfreitag' },
  ...
]
*/
```

Get holidays for a specific state
```typescript
const { getHolidays } = useLegalHolidays()

const holidays = await getHolidays(2024, { state: 'bw' }) // Baden-Württemberg
console.log(holidays)
/*
[
  { date: '2024-01-01', name: 'Neujahrstag' },
  { date: '2024-01-06', name: 'Heilige Drei Könige' },
  ...
]
*/
```

Augsburg-specific holidays
```typescript
const { getHolidays } = useLegalHolidays()

const holidays = await getHolidays(2024, { augsburg: true })
```
