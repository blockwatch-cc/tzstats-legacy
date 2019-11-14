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

## Deploy (work in progress)

The contained Makefile requires a docker registry endpoint to be set.

```
DOCKER_REGISTRY_ADDR=<addr> make deploy
```

will run the following steps

1. build React web app using `yarn build`
2. build Docker image based on [SPA-ng](https://github.com/echa/spang) file server
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
