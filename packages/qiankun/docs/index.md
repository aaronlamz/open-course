---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Qiankun"
  text: "微前端实践指南"
  tagline: "微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。"

  image:
    src: /qiankun.png
    alt: Hero image
  actions:
    - theme: brand
      text: 开始学习
      link: /guide/
    - theme: alt
      text: 查看Github
      link: https://github.com/aaronlamz/open-course

features:
  - title: 技术栈无关
    details: 主框架不限制接入应用的技术栈，微应用具备完全自主权
  - title: 独立开发、独立部署
    details: 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
  - title: 增量升级
    details: 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
  - title: 独立运行时
    details: 每个微应用之间状态隔离，运行时状态不共享
---