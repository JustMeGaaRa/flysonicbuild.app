# Drone App

## Context

Below is a description of the architecture from the system landscape perspective. For each app/component I will provide a name and on a new line a description of what it does, how it should work, and when it should be used.

## Components

### Cli tool

An application running in watch mode, monitoring the user defined typescript file. The file should be loaded and executed on changes. The changes are throttled, to not overwhelm the executing app. Given that the script is written properly and can be compiled, it is executed and produces a json metadata file with all required data for rendering the nodes on a canvas.

### Preview app

The app is reading the json metadata and renders it as a set of nodes and connections. The app also allows to manually edit the nodes and connections, add new ones, and edit their properties. The manually made changes are synchronized to the json metadata file.

### Core library

Has the abstractions like component, interface, connector, protocol, and others. The component describes a logical component that can perform certain actions. An interface is the API that the component has and exposes. Each component might have one or more interfaces, where each interface has one or more protocols supported. A protocol is just a description and schema of how two components talk to each other. A connector is a definition that the component is able to connect to a certain interface via protocol. A component can have one or more connectors implemented.

### Core extension library for drones

Contains the implementations for each type of component for a typical FPV drone (FC, ESC, VTX, Camera, RX, motor, vtx antenna, rx antenna, etc).

## Technology Stack

| **Aspect**               | **Technology**                                                      |
| ------------------------ | ------------------------------------------------------------------- |
| **Backend**              | Deno                                                                |
| **Frontend**             | React                                                               |
| **Programming Language** | TypeScript                                                          |
| **IDE**                  | Visual Studio (for user scripts to write in and render the diagram) |
| **Frontend Design**      | Node-based editors (focused on nodes and connections)               |

## Use Cases

When building a diagram from code in our app, the user might connect to that API in various way:

-   by using an official library (e.g. VendorLib, a component in our case) that knows how to talk to the SaaS API (e.g. VendorAPI, a component inpur case). In this case we should ensure compatibility of protocol (https), schema of endpoints, and response format (e.g. json). This should all be defined as interface of the SaaS, and a connector of the official lib.
-   user can implement a custom lib (by deriving from base Component abstraction, naming it CustomVendorLib). In this case it is on the user to specify the same schema, protocol and data format, so that our app can validate by static and runtime checking, that the CustomVendorLib can be connected with VendorAPI

Suggest a solid abstractions hierarchy for our sdk core lib, that will work for these cases and for other software, that works with multiple protocols, schemas, and data formats. It should be open for extension to the users to define any missing component or connector or interface

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

-   `docs`: a vanilla [vite](https://vitejs.dev) ts app
-   `web`: another vanilla [vite](https://vitejs.dev) ts app
-   `@repo/ui`: a stub component & utility library shared by both `web` and `docs` applications
-   `@repo/eslint-config`: shared `eslint` configurations
-   `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting
