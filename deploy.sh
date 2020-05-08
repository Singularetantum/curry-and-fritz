#!/usr/bin/env sh

set -e
npm run build
cd dist

echo deploying to gh-pages..
git init
git add -A
git commit -m 'deploy to gh-pages'
git push -f git@github.com:Singularetantum/curry-and-fritz.git gh-pages
cd -
