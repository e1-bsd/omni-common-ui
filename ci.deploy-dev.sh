#!/bin/bash

openssl aes-256-cbc -K $encrypted_3a8c1431a01a_key -iv $encrypted_3a8c1431a01a_iv -in deploy.enc -out deploy -d && \
chmod 600 deploy && \
eval `ssh-agent -s` && \
ssh-add deploy && \
rm deploy && \

git fetch --all --prune --verbose && \
git stash && \
git checkout master && \
git merge --no-commit $TRAVIS_BRANCH && \
git add --force lib && \
git commit -m "Merged develop ($TRAVIS_COMMIT) into master" && \
git push origin master:master
