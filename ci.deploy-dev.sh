#!/bin/bash

openssl aes-256-cbc -K $encrypted_3a8c1431a01a_key -iv $encrypted_3a8c1431a01a_iv -in deploy.enc -out deploy -d && \
chmod 600 deploy && \
eval `ssh-agent -s` && \
ssh-add deploy && \
rm deploy && \

git stash && \
git checkout -qf master && \
git merge --no-commit --no-ff $TRAVIS_COMMIT && \
git add --force lib && \
git commit -m "Merged $TRAVIS_BRANCH ($TRAVIS_COMMIT) into master" && \
git push origin master:master
