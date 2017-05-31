#!/bin/bash

git add --force lib && \
git commit -m "no message" && \
TAG="$(git describe --abbrev=0 --tags)" && \
npm version "$TAG-dev.$TRAVIS_BUILD_NUMBER" && \
git add package.json && \
git commit --amend -m "Merged $TRAVIS_BRANCH ($TRAVIS_COMMIT) into master" && \
git push origin master:master
#test
