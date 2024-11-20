# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. Uses Axios, react-query and MSW.

Before running any scripts for frontend, navigate to the client folder:

To instal dependencies:

```
[npm, yarn, pnpm] install
```

Vite should have started dev server, otherwise: To start development server:

```
[npm, yarn, pnpm] run dev
```

Next, open your browser and visit http://localhost:4000/.

## Tests

```
[npm, yarn, pnpm] test:watch

```

or

```
[npm, yarn, pnpm] test:watch <path-to-file>

```

## Tooling:

- **Vite:** Frontend build tool that serves your source files over native ES modules, with rich features and fast _Hot Module Replacement (HMR)_. _Vite_ is fast because it doesn't bundle your code at all. It leverages the native support for ESM (ECMAScript Modules) of modern browsers. It sends your file directly without being bundled
- **@vitejs/plugin-react-swc:** This speeds up your Vite dev server with [SWC](https://swc.rs/) _(~20x faster than Babel)_
- **ESLint and Prettier:** For linting and pretty-printing JavaScript code respectively
- **Jest and @testing-library/react:** for unit testing
- **Vitest:** Modern testing framework
- **MSW:** Mock Service Worker (MSW) is an API mocking library for browser and Node.js. See [stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch). With MSW, you can intercept outgoing requests, observe them, and respond to them using mocked responses. MSW can integrate throughout your entire stack, allowing you to reuse and customize network behavior on demand. Imagine using the same API mocks during development, integration and end-to-end testing, and then in your Storybook or during a live demo.

## POSSIBLE NEXT TODOS

- [ ] Add commitlint (Helps team adhere to a commit convention)
- [ ] Add ContextModule with data and possibility of persistent article edition

## Useful links

- [How to set up a react project with vite](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite)
- [Adding eslint and prettier to a vitejs react project](https://dev.to/marcosdiasdev/adding-eslint-and-prettier-to-a-vitejs-react-project-2kkj)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [How to setup MSW in a React project using Vite](https://www.raisiqueira.io/drops/vite-msw)
- [Vitest](https://vitest.dev/guide/#overview)
