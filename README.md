# Legal Holiday Module

A **Nuxt 3 module** for fetching German public holidays.  
It provides a composable that lets you retrieve holidays for all federal states or filter them by state — including Augsburg-specific rules — for a given year.

---

## ✨ Features

- Fetch all legal holidays in Germany
- Filter by federal state (*Bundesland*)
- Support for Augsburg-only holidays
- Built-in caching layer to reduce API calls
- Written in TypeScript, ready to use

---

## 📦 Installation

Install via your preferred package manager:

```bash
pnpm add @antify/legal-holiday-module
# or
npm install @antify/legal-holiday-module
# or
yarn add @antify/legal-holiday-module
````

Add the module to your `nuxt.config.ts` and configure the data handler:

```ts
export default defineNuxtConfig({
  modules: [
    '@antify/legal-holiday-module'
  ],
  legalHolidayModule: {
    dataHandler: 'path/to/dataHandler',
  },
})
```

---

## 🗄 Data Handler

The **data handler** is used for caching.
It must export a function created via `defineDataHandler`.
Place the file at the path configured in `nuxt.config.ts`.

```ts
export default defineDataHandler({
  async findData(year: number): Promise<CachedLegalHolidays | null> {
    // Load cached data (e.g. from DB or filesystem)
  },
  async saveData(data: CachedLegalHolidays): Promise<CachedLegalHolidays | null> {
    // Persist new data
  },
});
```

---

## 🔧 Usage

The module exposes the `useLegalHolidays` composable.

### Get all holidays for a year

```ts
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

### Get holidays for a specific state

```ts
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

### Augsburg-specific holidays

```ts
const { getHolidays } = useLegalHolidays()

const holidays = await getHolidays(2024, { augsburg: true })
```

---

## 📖 Notes

* `state` uses the official 2-letter abbreviations (`bw`, `by`, `be`, etc.).
* If no cached data is found, the module fetches fresh data from the API and persists it via your `dataHandler`.
