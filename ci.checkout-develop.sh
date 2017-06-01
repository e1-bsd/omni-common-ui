#!/bin/bash

if [[ "$TRAVIS_PULL_REQUEST" = false ]] && [[ "$TRAVIS_BRANCH" = "develop" ]]; then
  echo "Will clone the repo again and checkout $TRAVIS_COMMIT"

  git clone git@github.com:$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG && \
  cd $TRAVIS_REPO_SLUG && \
  git checkout -qf master && \
  git merge --no-commit --no-ff $TRAVIS_COMMIT && \
  echo "Second cloned repo is ready. Merged $(git rev-parse HEAD) into master"
else
  echo "No need to clone the repo again"
fi
