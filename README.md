# react-fetchino

[![Build Status](https://travis-ci.org/lssmn/react-fetchino.svg?branch=master)](https://travis-ci.org/lssmn/react-fetchino)
[![codecov](https://codecov.io/gh/lssmn/react-fetchino/branch/master/graph/badge.svg)](https://codecov.io/gh/lssmn/react-fetchino)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A tiny React component to fetch HTTP requests. It requires React >= 16.3.0.

## Getting started

```sh
$ # With npm
$ npm install --save react-fetchino
$ # Or yarn
$ yarn add react-fetchino
```

## Props

| Name    | Type     | Required | Description                      |
|---------|----------|----------|----------------------------------|
| url     | string   | true     | URL of the resource to fetch     |
| options | object   | false    | Overrides the default options {} |
| render  | function | false    | Can be used instead of children  |

## Code examples

```jsx
import React, { Component, Fragment } from 'react';
import Fetchino from 'react-fetchino';

// Pattern: Function as Child Component
// Props: required

class App extends Component {
  render() {
    const url = 'https://swapi.co/api/planets/1/';
    return (
      <Fetchino url={url}>
        {({ loading, error, data }) => (
          <Fragment>
            { loading && <LoadingComponent /> }
            { error && <ErrorComponent message={error} /> }
            { data && <PlanetComponent data={data} /> }
          </Fragment>
        )}
      </Fetchino>
    );
  }
}

// Pattern: Render Props
// Props: all

class App extends Component {
  render() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: {
        test: 'Test',
      }
    };
    return (
      <Fetchino
        url={url}
        options={options}
        render={({ loading, error, data }) => (
          <Fragment>
            {loading && <LoadingComponent />}
            {error && <ErrorComponent message={error} />}
            {data && <PostComponent data={data} />}
          </Fragment>
        )}
      />
    );
  }
}
```

**Note**: if both _render_ and _children_ are functions, _render_ will be ignored.

## Demo

[**Click here to open the live demo.**](https://codesandbox.io/s/ojjy62kn6y)

## Tasks

### Development

```sh
$ npm run test:watch
$ npm run build
```

### Tests & Coverage

```sh
$ npm run test
$ npm run test:coverage
```

## Missing

- Server-side rendering
- Support for “createFetcher” (see [simple-cache-provider](https://github.com/facebook/react/tree/master/packages/simple-cache-provider))
