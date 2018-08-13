# Omni Common UI

Branch | Build | Coverage
------ | --- | ---
master | [![Build Status – master](https://travis-ci.org/e1-bsd/omni-common-ui.svg?branch=master)](https://travis-ci.org/e1-bsd/omni-common-ui) | [![Coverage Status](https://coveralls.io/repos/github/e1-bsd/omni-common-ui/badge.svg)](https://coveralls.io/github/e1-bsd/omni-common-ui) [![Code Climate](https://img.shields.io/codeclimate/github/e1-bsd/omni-common-ui.svg)](https://codeclimate.com/github/e1-bsd/omni-common-ui)

## Setting up the environment

Follow this steps to setup your development environment.

1. Install [NodeJS](https://nodejs.org/).  
It is **highly** recommended to use [Node Version Manager](https://github.com/creationix/nvm) (for Mac and Linux).  
A [Windows](https://github.com/coreybutler/nvm-windows) version is also available.
2. Install [Yarn](https://yarnpkg.com/) running `npm install -g yarn`.
3. Open a terminal at the root folder of the project.
4. Run `yarn`.

## Committing

All commits should follow the patterns described by [semantic-release](https://github.com/semantic-release/semantic-release).

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Or its simpler version `<type>(<scope>): <subject>`. For example, a fix commit could be:

```
fix(Avatar): Avoided a bug that happened on IE11.
```

Or adding a new feature:

```
feat(Avatar): Allowed passing in a default avatar to show if the user's avatar cannot be loaded.
```

## Starting the development environment

When all your dependencies are installed, you can follow this steps to build the project on your machine for development.

1. Open a terminal at the root folder of the project.
2. Run `yarn start`.

### Running our linting tools

1. Run `yarn lint:css` to run Stylelint.
2. Run `yarn lint:js` to run ESLint.

### Testing during development

1. Open a terminal at the root folder of the project.
2. Run `yarn test -- --watch` or `yarn test -- --watch --silent`.
3. The tests will run.
4. The tests will run again automatically when you change the code.

## Deploying

Make sure your commits follow the [Committing](#committing) section. And just push/merge to the `master` branch. The [CI job](./.travis.yml) will do the rest.

## Frequent problems

### `yarn start` is broken :(

If you meet some error when trying to run `yarn start` or `yarn test`, the most common cause is that someone has added or updated some new dependency into the project.

Run `yarn` to get your environment up to date.

### Some tests keep failing unless I use `--no-cache`

If you have some tests that are always failing unless you use `yarn test -- --no-cache`, that means that the Jest cache is kind of broken. To fix this quickly:

1. Run `yarn test -- --showConfig`
2. Look for the value `cacheDirectory`
3. Remove that directory manually