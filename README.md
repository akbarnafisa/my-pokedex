<div>
  <h1 align="center">Pokedex</h1>
  <p>
    This codebase contains a Pokedex list for Pokemon trainers. Click <a href="https://my-pokedex-woad.vercel.app/" target="_blank">this link</a> for a demo. You can also see the wireframe of the project in <a href="https://www.figma.com/file/GMTlkUPzqct896baz0Cqp8/Pokedex?type=design&node-id=0-1&mode=design" target="_blank">here</a>.
  </p>
</div>

# Features

- Displays a list of Pokemon
- Allows favoriting of Pokemon
- Provides detailed views of individual Pokemon
- Filters Pokemon by type

# Getting started

To get the frontend running locally:

1. Clone this repo
2. `yarn` to install all the dependencies defined in a `package.json` file.
3. `yarn dev` to start Vite dev server.

# Features

- 💚 Vue 3 - A JavaScript library for creating user interfaces
- 📜 Vue Router - A routing library for Vue.js applications
- 🔨 Tanstack Query - Opionated data management for handling data
- 🔍 Typescript - JavaScript static typing for enhanced code quality
- 📑 ESlint - Tool for identifying and reporting on patterns found in code
- 📲 Prettier - An opinionated code formatter
- 🎨 Tailwind CSS - A utility-first CSS framework for rapidly building custom user interfaces
- 🤘 Vueuse - A collection of essential Vue Composition APIs

# Scripts

- `yarn build` - build for production. The generated files will be on the ./output folder.
- `yarn dev` - start a development server with hot reload.
- `yarn preview` - locally preview the production build.

# Folders' structure overview

- `src/pages` - app's views - basically all screens, that user sees
- `src/components` - reusable components used in pages
- `src/hooks` - reuseable react state based from each use case
- `src/utils` - various helper utilities

# Design

### API Request

| Path                                                  | Page                                  | Description                                                                     |
|-------------------------------------------------------|---------------------------------------|---------------------------------------------------------------------------------|
| `https://pokeapi.co/api/v2/type`                      | `Landing Page`,  `Pokemon Type Page`  | Fetches a list of all Pokemon types                                             |
| `https://pokeapi.co/api/v2/pokemon?limit=21&offset=0` | `Landing Page`                        | Fetches the Pokemon with limit 21, then using infinite scroll to fetch the data |
| `https://pokeapi.co/api/v2/pokemon/:id/`              | `Landing Page`, `Pokemon Detail Page` | Fetches detailed information about a specific Pokemon                           |
| `https://pokeapi.co/api/v2/type/:id`                  | `Landing Page`,  `Pokemon Type Page`  | Fetches a list of Pokemon of a specific type                                    |


### Main View
| Page                  | Path           | Description                                                                                                               |
|-----------------------|----------------|---------------------------------------------------------------------------------------------------------------------------|
| `Landing Page`        | `/`            | The main page where users can view a list of Pokemon                                                                      |
| `Pokemon Detail Page` | `/detail/:id`  | Displays detailed information about a specific Pokemon                                                                    |
| `Favorite Page`       | `/favorite`    | Shows a list of Pokemon that the user has marked as favorites, we are using indexDB to save the favorited Pokemon locally |
| `Pokemon Type Page`   | `/type?id=:id` | Displays a list of Pokemon of a specific type                                                                             |



### UI

All UI components are located inside the `components` folder, which contains three subfolders:
- `common`: This folder contains components that are shared across all pages.
- `icon`: This folder contains a list of all icons.
- `ui`: This folder contains reusable components.

There are two components that handle business logic:
- `PokeCard.vue`: This component handles API requests to get detailed information about a Pokemon. Due to the design of the API response, we need to fetch the data individually.
- `SelectType.vue`: This component handles the display of a list of Pokemon types and also manages redirection to the type page.