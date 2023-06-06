#!/bin/bash
node -v
pnpm -v
echo pnpm install
pnpm install
echo pnpm run build
pnpm build:nodejs

cd packages/nodejs/docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
git init
git add .
git commit -m 'deploy site page'
git status
git push -f git@github.com:aaronlamz/open-ebook.git main:gh-pages

