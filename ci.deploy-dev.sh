#!/bin/bash

git stash && \
git checkout -qf master && \
git merge --no-commit --no-ff $TRAVIS_COMMIT && \
git add --force lib && \
git commit -m "Merged $TRAVIS_BRANCH ($TRAVIS_COMMIT) into master" && \
git push origin master:master
#test
