# Merian

## React

<https://nx.dev/getting-started/nx-and-react>

npx create-nx-workspace@latest

```shell
C:\Users\timof\repos>npx create-nx-workspace@latest
npx: installed 58 in 10.745s
√ Workspace name (e.g., org name)     · merian
√ What to create in the new workspace · react
√ Application name                    · amp
√ Default stylesheet format           · css
C:\Users\timof\AppData\Roaming\npm-cache\_npx\18788\node_modules\create-nx-workspace\bin
√ Use Nx Cloud? (It's free and doesn't require registration.) · No
 > NX   Nx is creating your v14.0.2 workspace.
   To make sure the command works reliably in all environments, and that the preset is applied correctly,
   Nx will run "npm install" several times. Please wait.
√ Installing dependencies with npm
√ Nx has successfully created the workspace.
 ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
 >  NX   First time using Nx? Check out this interactive Nx tutorial.
   https://nx.dev/react-tutorial/01-create-application
   Prefer watching videos? Check out this free Nx course on Egghead.io.
   https://egghead.io/playlists/scale-react-development-with-nx-4038
```

npx nx serve todos

## Angular

```shell
>nx generate @nrwl/angular:app customer-portal --routing
ENOENT: no such file or directory, open 'C:\Users\timof\repos\demo-app\packages\customer-portal\project.json'
>nx serve customer-portal
...
>nx generate @nrwl/angular:app customer-portal --routing
√ Which stylesheet format would you like to use? · scss
UPDATE nx.json
UPDATE package.json
UPDATE .gitignore
UPDATE workspace.json
CREATE apps/customer-portal/.browserslistrc
...
```

## The Core first then Angular approach fails

There are different approaches to creating a workspace.  Some are tailored to a particular framework, and some are framework agnostic.  Creating a "core" workspace should make this workspace work for any type of framework.

<https://nx.dev/getting-started/nx-core>

```shell
>npx create-nx-workspace@latest
npx: installed 58 in 14.11s
√ Workspace name (e.g., org name)     · demo-app
√ What to create in the new workspace · core
C:\Users\timof\AppData\Roaming\npm-cache\_npx\16348\node_modules\create-nx-workspace\bin
√ Use Nx Cloud? (It's free and doesn't require registration.) · No
 > NX   Nx is creating your v14.0.2 workspace.
   To make sure the command works reliably in all environments, and that the preset is applied correctly,
   Nx will run "npm install" several times. Please wait.
√ Installing dependencies with npm
√ Nx has successfully created the workspace.
 —————————————————————————————————————————————————————————————————————————————————————
 > NX   First time using Nx? Check out this interactive Nx tutorial.
   <https://nx.dev/core-tutorial/01-create-blog>
```

Nx started out as an Angular-only affair.  It's creators were on the Angular team and left to focus on corporate-level issues when creating enterprise Angular apps.

Maybe for this reason I have had issues using Angular in a core workspace.  The big difference is instead of an angular.json, there is a workspace.json.  There may be advice and plugins out there that don't work with this change, so understand when you go the multi-framework route, there is a bit more to worry about sometimes.

There is actually [a section about splitting angular.json into multiple project.json files](https://nx.dev/getting-started/nx-and-angular#angularjson), one for each project.  I wish I had read that some time ago.

*anything written about project.json or workspace.json applies to angular.json in the same way. For instance, everything in project.json and nx.json applies to angular.json in the same way.*

First install the Angular plugin.

npm install @nrwl/angular

We run into this issue immediately when starting a new app:

nx generate @nrwl/angular:app customer-portal --routing

ENOENT: no such file or directory, open 'C:\Users\timof\repos\demo-app\packages\customer-portal\project.json'

## Original Readme

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@merian/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
