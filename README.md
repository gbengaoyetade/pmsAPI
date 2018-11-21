# PMS API

[![Build Status](https://travis-ci.org/gbengaPS/pmsAPI.svg?branch=develop)](https://travis-ci.org/gbengaPS/pmsAPI) [![Test Coverage](https://api.codeclimate.com/v1/badges/2101dfd0c2b2fcbdc9ee/test_coverage)](https://codeclimate.com/github/gbengaPS/pmsAPI/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/2101dfd0c2b2fcbdc9ee/maintainability)](https://codeclimate.com/github/gbengaPS/pmsAPI/maintainability)

PMPS API is a population management system. It helps its users perform CRUD operation on locations.

## Getting Started

Clone the repository

```
$ git clone git@github.com:gbengaPS/pmsAPI.git
```

Change directory into the project

```
$ cd pmsAPI
```

Then install packages

```
$ npm install
```

Change `.env.sample` to `.env` and add the needed values

Start application

```
$ npm start
```

#####Or

```
$ yarn start
```

### Endpoints

| Endpoint             | HTTP Method | Description                                                                         |
| -------------------- | ----------- | ----------------------------------------------------------------------------------- |
| /api/v1/locations    | GET         | Returns all locations with their child up to one level deep                         |
| /api/v1/user         | POST        | Creates a new user                                                                  |
| /api/v1/user/login   | POST        | Generates user access token                                                         |
| /api/v1/location     | POST        | Creates new location. This route requires an access token                           |
| /api/v1/location/:id | PATCH       | Updates a particular location. Another protected route                              |
| /api/v1/location/:id | DELETE      | Delete a location. This action can only be performed by the user with an admin role |

####Note:

1. Only an admin can delete a location
2. Admin credentials are added to the database upon a successful migration
3. There is currently no way to upgrade a user to admin level.
4. Except for create user and user login, all other routes are protected and need the `Authorizatio` header to be set.
5. Token is generated upon login

### Documentation

Visit [API DOC](https://documenter.getpostman.com/view/2057950/RzZFCGdS) for API documentation

### Prerequisites

This application was built with Node js so you'll need the following to get it up and running

- [Node Js](https://nodejs.org/en/download/)
- [Postgres](https://www.postgresql.org/download/)

## Running the tests

Jest is the test framework used for this project
To run tests

```
$ npm run test
```

To see test coverage

```
$ npm run test:cover
```

## Product Limitation

- There is currently no bulk create location endpoint
- You cannot get a particular location details, just get all.
- There is no frontend consuming this API yet.

## Want to Contribute?

- Fork the repository
- Make your contributions
- Ensure your codes follow the [AirBnB Javascript Styles Guide](https://www.gitbook.com/book/duk/airbnb-javascript-guidelines/details)
- Create Pull request against the `develop` branch.

## Author

- [Gbenga Oyetade](https://twitter.com/gbenga_ps)

## Acknowledgments

- Andela Fellowship (https://andela.com/)

## License

[MIT License](./LICENSE)
