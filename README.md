# daarongonzalez.com

Personal portfolio for D'Aaron Gonzalez — built with [Astro](https://astro.build) and [React](https://react.dev), styled with [Tailwind CSS v4](https://tailwindcss.com).

## Stack

- **Astro** — routing, layouts, static site generation
- **React** — interactive components (nav menu, blog filter) rendered as islands; presentational components render to static HTML with no client-side JS
- **Tailwind CSS v4** — utility-first styling, design tokens defined in `src/styles/global.css`

## Structure

```
src/
  components/     shared React components (Button, cards, Nav, Footer, icons, ...)
  data/           site content — projects, blog posts, events, nav links
  layouts/        base page Layout.astro
  pages/          Astro routes (index, about, blog, events, work/[slug])
  styles/         global.css with design tokens (colors, type, bento/pill utilities)
```

Images are currently placeholders (`ImagePlaceholder` component) — real photos/screenshots need to be dropped in.

## Commands

| Command           | Action                                      |
| :----------------- | :------------------------------------------- |
| `npm install`       | Install dependencies                        |
| `npm run dev`       | Start local dev server at `localhost:4321`  |
| `npm run build`     | Build production site to `./dist/`          |
| `npm run preview`   | Preview the production build locally        |
| `npm run check`     | Type-check `.astro` files                   |
