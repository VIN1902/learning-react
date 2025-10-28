# Why React

State is a variable that holds the info about current situation of something like a component.  
State is managed by JS engine.

UI is managed by DOM api, which belongs to runtime environment.

Issue was the sync between JS (state) and DOM (UI), which react aims to handle.  
Caused inconsistency with UI on complex operations. Like the Facebook's phantom messages problem.

So, react is used to build UI using JS. Primarily by using components and state managment.

# React is a library

In a framework you are forced within set of constraints and rules as to how to build and work.  
In a Library however, is more free-form in its nature and doesn't impose as strict rules to do stuff.

React library offers two more additional libraries as its extensions:

1. react-dom
    - Provides methods to interact with real DOM on web browser using react's virtual DOM.
1. react-native
    - Build UI for mobile platforms instead of web.

# What to learn

1. Foundation of react library
    1. Core of the library
        - state and UI manipulation
        - JSX - Javascript XML (HTML within JS)
    1. Component reusablitiy
        - make once, use everywhere
        - pass props (object properties) in components
    1. Propogate changes
        - using hooks
1. Additional technologies/libraries with react (add-ons)
    1. Router for multi-page application (MPA), as opposed to SPA
    1. Redux, Zustand, Context API for State managment
    1. Class based components as opposed to modern functional
    1. Appwrite, Firebase, Superbase for backend-as-a-service (BAAS) application

# Getting started

To make a react app, there are few ways for which refer official [documentation](https://react.dev/learn/).
1. Use frameworks
    - next.js, rect-router, expo
    - These provide their own solutions for routing, etc. and impose constraints to achieve them.
1. Use bundlers
    - vite, parcel, rsbuild
    - These combine multiple JS files and assets into one file called bundle, for performance by reducing requests.
    - vite is a build tool that combines all the stuff react is composed of to make the app.
1. Use `npx create-react-app appName` (deprecated)
    - Was a CLI tool designed to simplify setup of react apps.
    - It provided a pre-configured development environment, handling complexities like Webpack, Babel, and ESLint, allowing developers to focus immediately on writing React code.
    - It had a extremely slow setup time and restrictive for more advanced use cases.

## Using Vite

1. Scaffolding a project using vite using this command and then choose react as framework and js as language within the CLI only.

    ```bash
    npm create vite@latest my-app
    ```

1. Pre-select the react framework and scaffold the project using vite, all at once.

    ```bash
    npm create vite@latest my-app -- --template react
    ```

After any of the two options you have to first install the dependencies into node_modules using npm and start the dev server.  
This can be either done manually (`npm install` `npm run dev`) or by choosing the option during scaffolding-phase within the CLI.