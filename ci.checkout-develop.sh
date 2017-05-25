#!/bin/bash

if [[ "$TRAVIS_PULL_REQUEST" = false ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
  echo "Will clone the repo again and checkout $TRAVIS_COMMIT"

  git clone git@github.com:$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG && \
  cd $TRAVIS_REPO_SLUG && \
  git checkout -qf $TRAVIS_COMMIT && \
  git fetch --all --prune --verbose && \
  echo "Second cloned repo is ready. Checked out: $(git rev-parse HEAD)"
else
  echo "No need to clone the repo again"
fi
