# Finance Backend

This is a simple backend implementation for a personal finance manager application.

## Features

- User authentication (login/register) with JWT
- CRUD operations for transactions
- GraphQL API

## Project Structure

- `config/`: Configuration files (e.g., JWT)
- `data/`: In-memory database files
- `graphql/`: GraphQL schema and resolvers
- `middlewares/`: Express middlewares (e.g., authentication)
- `models/`: Database models (e.g., Transaction, User)
- `routes/`: REST API routes
- `utils/`: Utility functions and helpers

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

