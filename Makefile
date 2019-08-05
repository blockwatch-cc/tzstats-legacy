.PHONY: default all build test release image clean
THIS_FILE := $(lastword $(MAKEFILE_LIST))

ARTIFACT := tzstats
ifdef TZSTATS_VERSION
	BUILD_VERSION := $(TZSTATS_VERSION)
endif
ifndef BUILD_ID
	BUILD_ID := $(shell uuidgen)
endif
ifneq ("$(wildcard VERSION)","")
	BUILD_VERSION ?= $(shell cat VERSION)
endif
BUILD_VERSION ?= $(shell git describe --always --dirty)
BUILD_DATE := $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")

ifndef DOCKER_REGISTRY_ADDR
$(error DOCKER_REGISTRY_ADDR is not set)
endif

TARGET_IMAGE := $(DOCKER_REGISTRY_ADDR)/$(ARTIFACT):$(BUILD_VERSION)
export ARTIFACT TARGET_IMAGE BUILD_ID BUILD_VERSION BUILD_DATE DOCKER_REGISTRY_ADDR

default: build

all: build test

build:
	@echo $@
	@yarn build

container: build
	@echo $@
	@echo "Building $(TARGET_IMAGE)"
	@docker build --pull --rm --no-cache -f ./deploy/Dockerfile --build-arg BUILD_DATE=$(BUILD_DATE) --build-arg BUILD_VERSION=$(BUILD_VERSION) --build-arg BUILD_ID=$(BUILD_ID) -t $(TARGET_IMAGE) .
	@echo
	@echo "Container image complete. Continue with "
	@echo " List:         docker images"
	@echo " Push:         docker push $(TARGET_IMAGE)"
	@echo " Inspect:      docker inspect $(ARGET_IMAGE)"
	@echo " Run:          docker run --rm --name $(ARTIFACT) $(TARGET_IMAGE)"
	@echo

deploy: build
	@echo $@
	@echo "Building and deploying $(TARGET_IMAGE)"
	@deploy/deploy.sh

clean:
	@echo $@
	rm -rf build/*
