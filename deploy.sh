#!/bin/bash
node -v
pnpm -v
echo pnpm install
pnpm install
echo pnpm run build
pnpm build:nodejs
