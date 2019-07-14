#!/bin/bash
#
# This script is supposed to be run from repository root!
#
set -ae

# make sure we're running from repository root
SCRIPT_DIR=$( cd $(dirname $0) ; pwd -P )
ROOT_DIR=$(dirname ${SCRIPT_DIR})
if [ "${ROOT_DIR}" != "$(pwd -P)" ]; then
	cd ${ROOT_DIR}
fi

# Secure ENV (must be injected in CI/CD pipeline)
#
# DOCKER_HOST
# DOCKER_REGISTRY_USER
# DOCKER_REGISTRY_PASSPHRASE
# BLOCKWATCH_API_KEY
# DEPLOY_KEYS_PASSWORD

DEPLOY_TARGET=${1:-tzstats}
BUILD_ARTIFACT=${DEPLOY_TARGET}
BUILD_VERSION=${BUILD_VERSION:-$(git describe --always --dirty)}
BUILD_DATE=${BUILD_DATE:-$(date -u "+%Y-%m-%dT%H:%M:%SZ")}
BUILD_ID=${BUILD_ID:-$(uuidgen)}
BUILD_TARGET=${BUILD_ARTIFACT}:${BUILD_VERSION}

fail () {
	echo "Error: ${1}"
	exit 1
}

# check required variables are defined
[ -z "$DOCKER_REGISTRY_ADDR" ]       || fail "missing DOCKER_REGISTRY_ADDR env variable"

# CI/CD and dev env use different settings
if [ ! -f "./deploy/.env" ]; then
	# check variables are defined in CI/CD environment
	[ -z "$DOCKER_HOST" ]                || fail "missing DOCKER_HOST env variable"
	[ -z "$DOCKER_REGISTRY_USER" ]       || fail "missing DOCKER_REGISTRY_USER env variable"
	[ -z "$DOCKER_REGISTRY_PASSPHRASE" ] || fail "missing DOCKER_REGISTRY_PASSPHRASE env variable"
	[ -z "$BLOCKWATCH_API_KEY" ]         || fail "missing BLOCKWATCH_API_KEY env variable"

	# env that would overwise be defined in .env
	TZSTATS_ENV=production
	TZSTATS_DC=de-hetzner
	TZSTATS_VERSION=${BUILD_VERSION}
	DOCKER_TLS_VERIFY="1"
	DOCKER_CERT_PATH=./keys
	DOCKER_API_VERSION=1.26
	COMPOSE_PROJECT_NAME=tz
	COMPOSE_TLS_VERSION=TLSv1_2
fi


# build docker image
docker build --pull --rm --no-cache -f ./deploy/Dockerfile --build-arg BUILD_DATE=${BUILD_DATE} --build-arg BUILD_VERSION=${BUILD_VERSION} --build-arg BUILD_ID=${BUILD_ID} -t ${DOCKER_REGISTRY_ADDR}/${BUILD_TARGET} .

# work in deploy directory
pushd deploy/

# CI/CD and dev env use different settings
if [ ! -f "./deploy/.env" ]; then
	# login to private registry
	echo "$DOCKER_REGISTRY_PASSPHRASE" | docker login -u "$DOCKER_REGISTRY_USER" --password-stdin -e nomail "$DOCKER_REGISTRY_ADDR"

	# decrypt deploy keys
	echo ${DEPLOY_KEYS_PASSWORD} | gpg --passphrase-fd 0 keys.gpg | tar -xv

	# deploy with docker-compose using current ENV variables and keys from above
	docker-compose -f docker-compose.yml up -d ${DEPLOY_TARGET}

	# remove keys
	rm -rf ./keys
else
	# push image
	docker push ${DOCKER_REGISTRY_ADDR}/${BUILD_TARGET}

	# deploy with docker-compose using .env file
	docker-compose -f docker-compose.yml up -d ${DEPLOY_TARGET}
fi

popd



