#!/bin/bash
node -v
pnpm -v

echo git branch
git branch
echo git pull
git reset --hard origin/main
git pull
echo pnpm install
pnpm install --no-frozen-lockfile
echo pnpm run build
pnpm build:nodejs
pnpm build:interview
pnpm build:qiankun
pnpm build:algorithm
pnpm build:home

echo pwd
# /home/runner/work/open-course/open-course
pwd
ls
rm -rf dist
echo mkdir dist
mkdir dist

echo cp -rf packages/nodejs/docs/.vitepress/dist/* dist
echo cp -rf packages/interview/docs/.vitepress/dist/* dist
echo cp -rf packages/qiankun/docs/.vitepress/dist/* dist
echo cp -rf packages/algorithms/docs/.vitepress/dist/* dist
echo cp -rf packages/home/dist/* dist

cp -rf packages/nodejs/docs/.vitepress/dist/* dist
cp -rf packages/interview/docs/.vitepress/dist/* dist
cp -rf packages/qiankun/docs/.vitepress/dist/* dist
cp -rf packages/algorithms/docs/.vitepress/dist/* dist
cp -rf packages/home/dist/* dist


echo cd dist
cd dist

echo ls
pwd
ls

git init
git branch -m master main
git config --global init.defaultBranch main
git config --global user.email "aaronlamz2022@gmail.com"
git config --global user.name "aaronlamz"
git add .
git commit -m 'deploy site page'
git status
git push -f git@github.com:aaronlamz/open-course.git main:gh-pages

