# Merian

## Workflow

```txt
nx serve customer-portal // Angular admin app
nx build my-new-app
nx serve my-new-app --prod // NextJS AMP testbed
nx serve sibylla --prod // NextJS AMP frontend
```

### Scaffolding

```txt
nx g @nrwl/next:lib my-new-lib
nx g @nrwl/next:page my-new-page --project=my-new-app
nx g @nrwl/next:component my-new-component --project=my-new-app
```

## React first workspace creation

If a workspace is created with a React app to start following [this document](https://nx.dev/getting-started/nx-and-react).

npm install -g nx

Or use npx:

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
 ——————————————————————————————————————————————————————————————————————
 >  NX   First time using Nx? Check out this interactive Nx tutorial.
   https://nx.dev/react-tutorial/01-create-application
   Prefer watching videos? Check out this free Nx course on Egghead.io.
   https://egghead.io/playlists/scale-react-development-with-nx-4038
```

npx nx serve amp

## Angular

Add the Angular app:

```shell
>nx generate @nrwl/angular:app customer-portal --routing
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

nx serve customer-portal

## The Core first then Angular approach fails

These are notes about the failed core workspace with Angular first approach.

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
 —————————————————————————————————————————————————————————————————————————————————
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

I added some comments on [this GitHub on Nx](https://github.com/nrwl/nx/issues/8778#issuecomment-1107446490) for the issue, but it doesn't matter as going with the React project first solves the issue.

## NextJS

npm install --save-dev @nrwl/next

nx g @nrwl/next:app sibylla

### React CLI commands

nx g @nrwl/next:lib my-new-lib
nx g @nrwl/next:page my-new-page --project=my-new-app
nx g @nrwl/next:component my-new-component --project=my-new-app
nx serve sibylla --prod

### The Nx React todo example

<https://nx.dev/react-tutorial/01-create-application>

We will use the my-new-app trash app to do this.

By default, Nx uses Cypress to run E2E tests.

nx e2e my-new-app -e2e --watch

Doesn't work.

### AMP

AMP inside a NextJS app.

The [official docs](https://nextjs.org/docs/advanced-features/amp-support/introduction) point to this [GitHub example](https://github.com/vercel/next.js/tree/canary/examples/amp)

Using the pages and components for that demonstrates using normal page (non-AMP), an AMP only page, and a hybrid AMP page.

But there is an error in index.tsx:

```html
<amp-img
  alt="Mountains"
  ...
```

Property 'amp-img' does not exist on type 'JSX.IntrinsicElements'.ts(2339)
No quick fixes available

There are a few fixes available according to [these SO answers]():

```tsx
declare namespace JSX {
 interface IntrinsicElements {
  [elemName: string]: any;
 }
}
```

I'm not sure exactly where these would be used, but putting this in the index.tsx files doesn't work.

Another answer says that this works:

```tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
```

But neither of those are working for the index.tsx file.

### Typescript and AMP

<https://nextjs.org/docs/advanced-features/amp-support/typescript>

There is a [road map discussion](https://nextjs.org/docs/advanced-features/amp-support/typescript) that is now closed.

At the end of the discussion someone links to [this example](https://github.com/ampproject/amphtml/pull/37370):

```ts
import {compile} from './compile';

[globalThis as any]('compile') = compile;
globalThis.compile = compile;
```

### Prod build failing

```txt
> nx run my-new-app:build:production

Failed to compile.

./pages/index.tsx:14:5
Type error: JSX expressions must have one parent element.

  12 |
  13 |   return (
> 14 |     <Layout>
     |     ^
  15 |       <Head>
  16 |         <title>The Cat</title>
  17 |       </Head>
info  - Checking validity of types .
 ——————————————————————————————————————————————————————————————————————————————————————

 > NX   Ran target build for project my-new-app (4s)
 ```

After some attempts to ignore the errors, the nx serve is not having this issue also:

```shell
wait  - compiling...
error - ./pages/index.tsx
Error:
  x Unexpected token `Layout`. Expected jsx identifier
    ,----
 14 | <Layout>
    :  ^^^^^^
    `----

Caused by:
    0: failed to process input file
    1: Syntax Error
error - Error: Cannot find module 'C:\Users\timof\repos\merian\dist\apps\my-new-app\.next\server\pages\index.js'
Require stack:
- C:\Users\timof\repos\merian\node_modules\next\dist\server\require.js
```

Nx serve on vanilla NextJS app sibylla works fine.

Tried about 15 different approaches to ignoring ts lint errors to no avail.  This is indeed a show-stopper.

I'm not sure at what point the error changed to this:

```shell
JSX expressions must have one parent element.ts(2657)
```

Puttint <>...</> tags around it fixed the <Layout> tag error.

The <amp-img> tag now has this:

Property 'amp-img' does not exist on type 'JSX.IntrinsicElements'.ts(2339)

And that solution hasn't actually fixed anything:

```err
Error:
  x Expression expected
    ,----
 14 | <>
```

But then this error:

Unexpected token `Layout`. Expected jsx identifier

The issue is, it's not recognizing the closing layout tag.  When it gets to the AMP tags, the parsing is failing.

```html
<amp-img>
  <amp-img></amp-img>
</amp-img>
```

If I rename the file to index.ts, then this is one of the errors:

'Head' refers to a value, but is being used as a type here. Did you mean 'typeof Head'?ts(2749)

If I rename the file to index.js, then this is one of the errors:

JSX expressions must have one parent element.ts(2657)

If I remove all the other html tags and leave only the AMO tags, then this I assume is the root cause of the situation:

Property 'amp-img' does not exist on type 'JSX.IntrinsicElements'.ts(2339)

According to this non-SO answer: *this did the trick for me*:

```tsx
declare global {
   namespace JSX {
     interface IntrinsicElements {
       [elemName: string]: any;
     }
   }
 }
```

This actually works to make that error above, but now, that whole global block has errors:

ES2015 module syntax is preferred over custom TypeScript modules and namespaces.eslint@typescript-eslint/no-namespace

Putting this at the top of the file solves the issue in a bad way, and allows the images to show, which is promising.  Lets put the other tags back and make it work with the other html tags as well.

It took a bit of other fixing and then erasing the contents of the <p> tag to get the file to load again due to some un-needed demo text, and the file loads.  Worth committing this step.

## Building a NextJS AMP app

After solving the issues with the amp tags detailed above, the build is failing:

```txt
Amp Validation
error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets

/dog?amp=1  error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets

AMP Validation caused the export to fail. https://nextjs.org/docs/messages/amp-export-validation        
———————————————————————————————————————————————————————————————————————————————
 >  NX   Ran target build for project my-new-app (28s)
    ×    1/1 failed
    √    0/1 succeeded [0 read from cache]
```

Do you think those who created the NextJS AMP plugin tested out their demo?

Or maybe there is a Nx/NextJS build step missing?

Anyhow, the simple approach is to move the style tag into the head tag.  That works somewhat, but there is still a failure:

```txt
Amp Validation
/dog?amp=1  error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
/           error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
            error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
AMP Validation caused the export to fail. https://nextjs.org/docs/messages/amp-export-validation        
 ———————————————————————————————————————————————————————————————————————————————————————
 >  NX   Ran target build for project my-new-app (16s)
    ×    1/1 failed
    √    0/1 succeeded [0 read from cache]
```

Wait, that looks like the same error, so maybe the change made was not needed/didn't work.

The only hint of where the error came from is: /dog?amp=1

And actually, the styles put into the head are not working anyhow.  Maybe even the file wasn't being compiled.   I just saw this error:

```err
thread '<unnamed>' panicked at 'called `Option::unwrap()` on a `None` value', crates\styled_jsx\src\lib.rs:531:44
error - ./pages/index.tsx
Error: failed to process
```

I'm not sure how the styles for NextJS could be used for AMP.

Anyhow, getting rid of the dog.js file and trying the build again also doesn't work.

```txt
> nx run my-new-app:build:production
info  - Checking validity of types  
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data .events.js:352
      throw er; // Unhandled 'error' event
      ^
Error: EPERM: operation not permitted, open 'C:\Users\timof\repos\merian\dist\apps\my-new-app\.next\trace'
Emitted 'error' event on WriteStream instance at:
    at internal/fs/streams.js:335:14
    at FSReqCallback.oncomplete (fs.js:180:23) {
  errno: -4048,
  code: 'EPERM',
  syscall: 'open',
  path: 'C:\\Users\\timof\\repos\\merian\\dist\\apps\\my-new-app\\.next\\trace'
}
 ————————————————————————————————————————————————————————————————————————————————————
 >  NX   Ran target build for project my-new-app (8s)
    ×    1/1 failed
    √    0/1 succeeded [0 read from cache]
```

I was about to raise a bug on the Nx Github, but then read [this on the Next.js site](https://github.com/vercel/next.js/issues/30564):

*dev server should not be online while building, but building static page require API and my API's are running by express so the solution was to run a production mode and then build and restart the production again*

I did indeed have the serve going.  So stopping that and we are back to an old error:

```txt
Amp Validation
/  error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
   error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
   error  The parent tag of tag 'style amp-custom' is 'body', but it can only be 'head'.  https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/#stylesheets
AMP Validation caused the export to fail. https://nextjs.org/docs/messages/amp-export-validation        
 ————————————————————————————————————————————————————————————————————————————————————
 >  NX   Ran target build for project my-new-app (13s)
    ×    1/1 failed
    √    0/1 succeeded [0 read from cache]
```

I have a feeling this is related to the build step shown in the examples:

```json
"build": "next build",
```

Where would an issue about this be raised?  Nx?  Next.js? AMP?  The Nx Next.js plugin?  A separate Next.js AMP team project?  It's not clear at this point.

Here is one option:

[The plugin page](https://nx.dev/next/overview).

It says *There is no need to build the library prior to using it. When you update your library, the Next.js application will automatically pick up the changes.*

## NextJS AMP examples

On the NextJS.org site, there are [three examples](https://nextjs.org/examples).

- AMP First Boilerplate
- Google AMP Story
- Google AMP
- [Example app with google analytics & amp](https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics-amp)

(I might note [the page](https://nextjs.org/examples) that has links to those examples has a vast array of popular integrations and React best-practice examples in general).

I'm thinking that the last one there is what we are using.  It has the same two components:

Byline.js
Layout.js

Those are components with styles, which is great for re-usability.  However, I'm not sure how they will make it into the head tag at build time.

And, bear in mind these are NextJS examples, not Nx versions.  About a year ago, Nx started providing NextJS support (they call it Next.js, maybe we should also).  It's very possible that there may be major issues with trying to then also throw in AMP.

I created [an issue on the Nx GitHub](https://github.com/nrwl/nx/issues/9988) detailing this issue.

### AMP Story

This is an interesting example.  Yes, it's designed for video, but could work for image and story posts as well.

Being able to use the power of Nx with Next.js to create stories would be a great tool.

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
