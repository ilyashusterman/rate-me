#############################################################################
# Makefile for Rate-me
#############################################################################

# Prefer bash shell
export SHELL=/bin/bash


ifneq (,$(VERBOSE))
    override VERBOSE:=
else
    override VERBOSE:=@
endif

.PHONY: install
install:
	$(VERBOSE) yarn install
.PHONY: build
build:
	$(VERBOSE) yarn build
	$(VERBOSE) yes | cp -rf ./build/ ./docs/


