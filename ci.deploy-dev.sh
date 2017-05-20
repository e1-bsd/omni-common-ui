#!/bin/bash

git stash && \
git fetch --all --prune --verbose && \
git checkout -qf master && \
TAG="$(git describe --abbrev=0 --tags)" && \
npm config set git-tag-version false && \
npm version "$TAG-dev.$TRAVIS_BUILD_NUMBER" && \
git merge --no-commit --no-ff $TRAVIS_COMMIT && \
git add --force lib && \
git commit -m "Merged $TRAVIS_BRANCH ($TRAVIS_COMMIT) into master" && \
git push origin master:master
