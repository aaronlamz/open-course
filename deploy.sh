#!/bin/bash
node -v
pnpm -v
echo pnpm install
pnpm install
echo pnpm run build
pnpm build:nodejs
pnpm build:interview

cd packages/nodejs/docs/.vitepress/dist
cd packages/interview/docs/.vitepress/dist

git init
git branch -m master main
git config --global init.defaultBranch main
git config --global user.email "aaronlamz2022@gmail.com"
git config --global user.name "aaronlamz"
git add .
git commit -m 'deploy site page'
git status
git push -f git@github.com:aaronlamz/open-ebook.git main:gh-pages

