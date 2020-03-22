#!/bin/bash

if [[ "${CIRCLE_BRANCH}" == "master" ]]
then
  set -e

  echo "Raising package version and updating CHANGELOG.md"

  git config --global push.default simple
  git config --global user.email "theo@suteki.nu"
  git config --global user.name "CircleCI Publisher"

  # Stash any prior changes to prevent merge conflicts
  git stash

  # Make sure to get the latest master (if there were any prior commits)
  git pull origin master

  # Re-apply the stash
  # If there is nothing to apply on the stash, a non-zero exit code happens
  # we pipe an empty echo to prevent this
  git stash apply || echo ""

  # Version bump package.json, stamp CHANGELOG.md
  npm run prepare-publish

  # Changelog is now stamped with the version / time info - add to git
  git add CHANGELOG.md
  git add package.json

  # Amend the version commit with a ci skip so when we push the commits from the CI
  # The CI does not end up recursively building it

  # This gets the last commit log message
  PKG_VERSION=`npm run --silent version-bump show-version`

  # Appending [skip ci] to the log message
  # Note: --amend does not trigger the pre-commit hooks
  git commit -m "${PKG_VERSION} [skip ci]"

  git tag v${PKG_VERSION}

  # Push the commits back to master and assign a versioned release tag
  # Had to add --force because the pull was getting rejected each time
  git push && git push origin "v${PKG_VERSION}"

  # Publish the package to npm
  echo "Publishing package"
  npm publish
else
  echo "Skipping - branch is not master"
fi
