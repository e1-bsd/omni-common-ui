if [[ $TRAVIS_TAG == "develop" ]]; then
  git clone git@github.com:$TRAVIS_REPO_SLUG.git $TRAVIS_REPO_SLUG && \
  cd $TRAVIS_REPO_SLUG && \
  git checkout -qf $TRAVIS_COMMIT && \
  git fetch --all --prune --verbose
fi
