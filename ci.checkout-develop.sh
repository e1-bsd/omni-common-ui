#!/bin/bash

if [[ "$TRAVIS_PULL_REQUEST" = false ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
  git clone git@github.com:$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG && \
  cd $TRAVIS_REPO_SLUG && \
  git checkout -qf $TRAVIS_COMMIT && \
  git fetch --all --prune --verbose && \
  echo "Second cloned repo is ready"
else
  echo "No need to clone the repo again"
fi
