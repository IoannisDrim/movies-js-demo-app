# MovieRama

A demo application built entirely with **vanilla JavaScript** — no frameworks, no libraries, no magic. Just ES6+ classes, the native DOM API, and a deliberately structured component architecture to prove that reactivity, routing, and clean UIs don't require a framework.

Live: [movies-js-demo-app.vercel.app](https://movies-js-demo-app.vercel.app/)

---

## What it demonstrates

| Pattern | Where |
|---|---|
| Hash-based client-side router with page lifecycle | `src/utils/router.util.js`, `src/components/page/page.js` |
| Component model — render / afterRender / unmount | every component under `src/components/` |
| Frozen singleton for shared services | `src/components/modal/modal.js`, `src/components/loader/loader.js` |
| Safe DOM templating — `{{ token }}` replacement, no eval | `src/components/movieCard/movie-card.component.js` |
| XSS prevention — `escapeHtml` on all API-supplied values | `src/utils/dom-utils.js` |
| Reusable modal — accepts a plain string or any DOM node | `src/components/modal/` |
| Accessible modal — ARIA attributes, focus trap, focus restoration | `src/components/modal/modal.js` |
| Infinite scroll — native scroll events with `isFetching` guard | `src/utils/infinite-scroll.util.js` |
| Skeleton loading — measured card row, shimmer animation | `src/components/movieContainer/movie-container.component.js` |
| Parallel async fetching with `Promise.all` | `src/components/movieContainer/movie-container.component.js` |
| Composable detail components — `render()` returns a DOM node | `src/components/movieContainer/components/` |

---

## Pages

**Now in Theaters** — paginated listing of currently playing films. Infinite scroll loads the next page as the user approaches the bottom; skeleton cards reserve space while the request is in flight. Clicking *Details* on any card opens a modal with the film's trailer, reviews, and similar titles.

**About** — static page describing the architecture and linking to the data source.

**404** — shown for any unrecognised hash route.

Movie data is provided by the [TMDB API](https://developer.themoviedb.org/).

---

## Project structure

```
src/
├── components/
│   ├── app/          # Root bootstrap — wires router, nav, modal
│   ├── loader/       # Full-screen spinner singleton (first load only)
│   ├── modal/        # Reusable modal singleton
│   ├── movieCard/    # Individual card — poster, title, rating, Details button
│   ├── movieContainer/
│   │   ├── components/   # MovieTrailer, MovieReviews, MovieSimilarMovies
│   │   └── ...           # Container — infinite scroll, skeleton loading, modal open
│   ├── navigationBar/
│   └── page/         # Page wrapper — mounts / unmounts page controllers
├── pages/
│   ├── inTheatersPage/
│   ├── aboutPage/
│   └── notFoundPage/
├── services/
│   ├── movie-api.service.js   # TMDB API calls
│   └── service-helper.service.js  # fetch wrapper
├── styles/
│   └── _base.scss    # Global resets, skip link, visually-hidden utility
└── utils/
    ├── dom-utils.js         # escapeHtml
    ├── infinite-scroll.util.js
    └── router.util.js
```

---

## Getting started

```sh
git clone https://github.com/IoannisDrim/movies-js-demo-app.git
cd movies-js-demo-app
npm install
cp .env.sample .env   # fill in MOVIES_API and MOVIES_API_KEY
npm start
```

Open [http://localhost:8080](http://localhost:8080).

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Development server with HMR |
| `npm run build` | Production bundle → `dist/` |
| `npm test` | Jest in watch mode |
| `npm run lint` | ESLint |
| `npm run format` | Prettier — formats all `src/**/*.{js,html,scss}` |

---

## Design decisions and known limitations

**No scroll position persistence** — the router unmounts and recreates pages on every navigation. Navigating to About and back resets the listing to page 1. Fixing this without a state library would require a show/hide strategy (keeping page DOM nodes alive) rather than the current mount/unmount lifecycle. That tradeoff was out of scope for this demo.

**Skeleton cards fill one row** — on infinite scroll, the container measures the current card width to calculate how many cards fit per row, then inserts that many skeleton divs before the fetch starts. This reserves the correct amount of vertical space regardless of viewport width.

**Global loader on first load only** — the full-screen spinner runs once, on the initial data fetch before any cards are in the DOM. All subsequent fetches use skeleton cards instead.

**Single XHR instance replaced with `fetch`** — the original `XMLHttpRequest` was reused across calls, silently aborting concurrent requests. Each `fetch` call is independent.

---

## Stack

![JavaScript](https://img.icons8.com/color/48/000000/javascript.png)
![Webpack](https://img.icons8.com/color/48/000000/webpack.png)
![Babel](https://img.icons8.com/?size=48&id=v-t4czA7zToV&format=png&color=000000)
![ESLint](https://img.icons8.com/color/48/000000/eslint.png)
![Jest](https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-jest-can-collect-code-coverage-information-from-entire-projects-logo-shadow-tal-revivo.png)
![Sass](https://img.icons8.com/color/48/000000/sass.png)
![HTML](https://img.icons8.com/color/48/000000/html-5.png)
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8D-IfTA58NONTORVfigb72pKqp8hHiEm7SA&s" height="48" />

---

## License

MIT
