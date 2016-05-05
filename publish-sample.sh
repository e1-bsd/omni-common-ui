#!/bin/bash
eval "$(ssh-agent -s)"
chmod 600 deploy_key.pem
ssh-add deploy_key.pem
cd dist-sample
git init
git remote add origin git@github.com:e1-bsd/omni-common-ui.git
git config --global user.name "$GIT_NAME"
git config --global user.email $GIT_EMAIL
git fetch
git checkout gh-pages || git checkout --orphan gh-pages
git add --all .
git commit -m "Sample site published"
git push -f -q origin gh-pages:gh-pages
cd ..
