# React Module Federation Template

This is a template repository for creating a React application using Module Federation and TypeScript.

## Features

-   React
-   Module Federation
-   TypeScript
-   CSS Module
-   Webpack
-   Fully Configured ESLint

## Getting Started

To get started with this template, follow these steps:

1. Install dependencies: `yarn install`
2. Start the development server: `yarn dev` and start hacking
3. Configure which component should be exposed in `webpack.config.js`

To import the components from this module:

1. Build this module: `yarn build`
2. Serve the build folder (e.g. port 3001) `cd build && serve -p 3001`
3. Add a remote entry to the host `webpack.config.js` like so

```
    ...
    remotes: {
        module_main: 'module1@http://localhost:3001/remoteEntry.js'
    },
    ...
```

4. Run at least once to get the type definitions (@mf-types folder)
5. Import them

```
    import Counter from 'module_main/Counter';
    import Input from 'module_main/Input'
```
