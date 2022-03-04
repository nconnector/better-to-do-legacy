#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git config user.email "nconnector@github.com"
git config user.name "nconnector"
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:nconnector/better-to-do.git master:gh-pages
cd -