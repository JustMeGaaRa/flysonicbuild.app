# FlySonic Build App

This is a simple app that allows to visualize the drone assembly by connecting hardware components with one another. The nodes represent the components like flight controller, esc, motors, camera and other. The connections between those nodes represent a way to integrate and connect those components.

The target user audience are hobbyists who want to get into drone hobby and build their own drone, or just to explore the assembly and integration diagrams to learn. A specific vendor might want to define an extension package listing the components they offer for people to use. This should help to build the community and promote their hardware and help explore various possible builds.

The app offers a canvas where users can explore new build by trying to play around with various components and trying to connect them. Whenever the components don't integrate due to incompatible protocols or connectors, the app highlights those warning on the canvas but still leaves the user in control.

Another way to visualize the drone assembly is by writing a simple typescript script. The user creates an empty file, imports the vendors extension packs and starts writing simple code (using the fluent API). The output of this script is a metadata file that can be visualized on the canvas.

## Quick Start

```
TODO: showcase
```

## Features

The following section outlines some main features supported.

### Core Package

Has the abstractions like component, interface, connector, protocol, and others. The component describes a logical component that can perform certain actions. An interface is the API that the component has and exposes. Each component might have one or more interfaces, where each interface has one or more protocols supported. A protocol is just a description and schema of how two components talk to each other. A connector is a definition that the component is able to connect to a certain interface via protocol. A component can have one or more connectors implemented.

-   [x] Data model
-   [x] Fluent builder
-   [x] Converter function from model to reactflow model

### Command Line Tool

An application running in watch mode, monitoring the user defined typescript file. The file should be loaded and executed on changes. The changes are throttled, to not overwhelm the executing app. Given that the script is written properly and can be compiled, it is executed and produces a json metadata file with all required data for rendering the nodes on a canvas.

-   [x] Watcher mode to track changes
-   [x] Executor to build, convert, and save data as JSON
-   [x] Schema validation

### Fluent Builder UI

The app is reading the json metadata and renders it as a set of nodes and connections. The app also allows to manually edit the nodes and connections, add new ones, and edit their properties. The manually made changes are synchronized to the json metadata file.

-   [x] Node-based rendering
-   [x] Custom node with ports
-   [x] Custom edge with colors
-   [x] Real-time updates from from the script
-   [x] Manually connect components
-   [x] Manually add component type placeholder
-   [x] Auto layout for the graph
-   [ ] Collapse/expand nodes for cleaner view

### Server Watcher API

-   [x] Watcher mode to track changes
-   [x] Updates via websockets
-   [ ] Schema validation and serialization

### Agentic Prompting

-   [x] JSON schema for structured responses
-   [ ] API to connect to ChatGPT platform
-   [ ] Streaming JSON data to show results progressively

### Visual Studio Code Extension

-   [ ] Run diagrams preview in web panel
-   [ ] Watch current document changes

## What's inside?

This is a monorepo (created via turborepo) and includes the following packages and apps.

### Apps and Packages

| **Component**                    | **Technology**     |
| -------------------------------- | ------------------ |
| **Core Package**                 | TypeScript, ESM    |
| **Command Line Tool**            | Deno, TypeScript   |
| **Server Watcher API**           | Deno, TypeScript   |
| **Fluent Builder UI**            | React, ReactFlow   |
| **Visual Studio Code Extension** | Visual Studio COde |

-   `@flysonic/cli`: a cli tool for executing and saving the build
-   `@flysonic/web`: a fluent node-based ui builder application
-   `@flysonic/api`: a server api for watching and serving updates via websockets
-   `@flysonic/core`: a core package with core types and model builder
-   `@flysonic/watcher`: a library with shared functions to watch and load user script
-   `@flysonic/schema`: a shared library with serde schema
-   `@flysonic/ui`: a shared component library
-   `@flysonic/eslint-config`: shared `eslint` configurations
-   `@flysonic/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting
