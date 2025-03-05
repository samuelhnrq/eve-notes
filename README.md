# allo-challenge

## Dependencies

- Docker (with compose)
- [Bun](https://bun.sh)
- [uv](https://github.com/astral-sh/uv)
- python 3.12

To install dependencies:

```bash
docker compose up -d # should take some seconds for keycloak to start
bun install
```

Then to run:

```bash
bun run dev
```

## Strucutre
The project is a monorepo, the two folders in the packages are the frontend and backend respectively.

Backend is made with python [eve](https://docs.python-eve.org/en/stable/) (with flask underneath)

The frontend is made with next.js and tailwind. Most of the components are RSCs.

## Improvements

The backend is missing tests, but the eve abstraction is so high there is no much to test.

The frontend test coverage is very low.
