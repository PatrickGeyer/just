<p align="center">
  <a href="https://www.just.insure" target="blank"><img src="https://www.just.insure/images/logo.svg" width="200" alt="Just Logo" /></a>
</p>

  <p align="center">Test repo for calculating trip cost using hexagonal architecture.</p>

## Description



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Considerations

- Would write stub services for external policy and notification endpoints.
- Injected a logger instead of using console.log/debug
- Error handling queue would be implemented
