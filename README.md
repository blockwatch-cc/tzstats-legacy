## Tezos Blockchain Explorer

A block explorer for public and private Tezos blockchain networks based on the TzStats/Blockwatch Indexer backend available [here](https://github.com/blockwatch-cc/tzindex).

## Develop

```
# setup dev environment
npm install

# start built-in dev server
yarn start

# build deployable app
yarn build
```

## Running a local block explorer

You can run a local copy of TzStats and link it to your local instance of TzIndex in a few different ways. Easiest is using the Docker images built by the Makefile. If you don't have Docker installed follow the steps below.

Note: TzStats is a single-page Javascript app and the way web browsers work is that you need a local webserver to serve all files to your browser. You can setup a local Nginx or use another light-weight webserver to deliver the pre-built app or you just run the development version using `yarn start`. 

### Running the Dev Version
This is probably easier because it uses the built-in server that comes with yarn. Checkout the TzStats repo, create a new top-level file `development.env` with a single line `TZSTATS_API_URL=http://localhost:8000`, then run `npm install` and `yarn start`. You need NodeJS for this to work.

### Running from Pre-Built App 

Build TzStats with `npm install` and `yarn build` or copy all files from `/var/www/` out of the TzStats Docker image. Then compile a local version of https://github.com/echa/serve and run `serve` with the following env variables: `TZSTATS_API_URL` (defaults to http://localhost:8000), `SV_SERVER_PORT=8001` (smth other than the default port 8000 because TzIndex already uses it), `SV_SERVER_ROOT=./build` (the directory you built/extracted the compiled TzStats files to). Key trick is that the minified TzStats JS file contains a placeholder `<[TZSTATS_API_URL]>` which needs to be replaced with your local API endpoint. The embedded webserver [Serve](github.com/echa/serve) does that for you. Then navigate your browser to `http://localhost:8001`

## Deploy (work in progress)

The contained Makefile requires a docker registry endpoint to be set.

```
DOCKER_REGISTRY_ADDR=<addr> make deploy
```

will run the following steps

1. build React web app using `yarn build`
2. build Docker image based on the [serve](https://github.com/echa/serve) file server
3. publish image to private Docker registry
4. use `docker-compose` to start/replace Docker container on remote host

for the deploy process to work the following ENV variables need to be specified:

```sh
DOCKER_HOST
DOCKER_REGISTRY_USER
DOCKER_REGISTRY_PASSPHRASE
BLOCKWATCH_API_KEY
DEPLOY_KEYS_PASSWORD
```

CI/CD pipelines usually store these in a supposedly secure way, but you'll never know, so be vigilant.
