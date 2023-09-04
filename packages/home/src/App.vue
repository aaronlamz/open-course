<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '/open-course/animation.js';
  document.body.appendChild(script);
})
</script>

<template>
  <div class="page-container">
    <div class="main-container">
      <a href="https://github.com/aaronlamz/open-course" target="_blank" class="course-title">
        Web Developer Roadmap
      </a>
      <div class="course-container">
        <main class="main flow">
          <div class="main__cards cards">
            <div class="cards__inner">
              <div class="cards__card card">
                <h2 class="card__heading">基础</h2>
                <p class="card__price"></p>
                <ul role="list" class="card__bullets flow">
                  <li><a href="/open-course/algorithm/" class="card__cta cta">《数据结构与算法》</a></li>
                  <li><a href="/open-course/network/" class="card__cta cta">《网络协议学习》</a></li>
                </ul>
              </div>

              <div class="cards__card card">
                <h2 class="card__heading">前端</h2>
                <p class="card__price"></p>
                <ul role="list" class="card__bullets flow">
                  <li><a href="/open-course/interview/" class="card__cta cta">《前端面试系列》</a></li>
                  <li><a href="/open-course/qiankun/" class="card__cta cta">《qiankun 微前端实践指南》</a></li>
                  <li><a href="/open-course/nodejs/" class="card__cta cta">《Node 开发指南》</a></li>
                  <li><a href="/open-course/react/" class="card__cta cta">《React 开发指南》</a></li>
                </ul>
              </div>

              <!-- <div class="cards__card card">
                <h2 class="card__heading">后端</h2>
                <p class="card__price"></p>
                <ul role="list" class="card__bullets flow">
                  <li><a href="/open-course/java/" class="card__cta cta">《Java 开发指南》</a></li>
                </ul>
              </div> -->

              <div class="cards__card card">
                <h2 class="card__heading">运维</h2>
                <p class="card__price"></p>
                <ul role="list" class="card__bullets flow">
                  <li><a href="/open-course/linux/" class="card__cta cta">《Linux 学习指南》</a></li>
                  <li><a href="/open-course/docker/" class="card__cta cta">《Docker 学习指南》</a></li>
                </ul>
              </div>

            </div>
            <div class="overlay cards__inner"></div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
@import '~@/assets/style/global.css';

.header-navbar {
  height: 60px;
  margin: 0 auto;
  max-width: 1920px;
  position: relative;
}

.navbar-container {
  height: 100%;
  padding: 0 50px 0 50px;
  z-index: 234;
}

.navbar-fixed {
  backdrop-filter: blur(14px);
  background: rgba(0, 0, 0, .7);
  border: 1px solid #a4a4a4;
  border-radius: 58px;
  height: 40px;
  left: 50%;
  overflow: hidden;
  position: fixed;
  top: 18px;
  transform: translate(-50%);
  z-index: 235;
}

.menu-list {
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-item {
  font-size: 15px;
  font-weight: 800;
  line-height: 24px;
  white-space: nowrap;
}

.nav-item a {
  border-radius: 12px;
  color: #e6e6e6;
  display: block;
  padding: 0 12px;
  text-decoration: none;
  transition: color 268ms;
  cursor: pointer;
}

.nav-item a:hover {
  text-shadow: 0 0 18px hsl(56.93deg 81.79% 52.4% / 80%);
}

/* main-container */
.main-container {
  width: 100%;
  /* background: linear-gradient(180deg, #000, #19191b); */
  background: url('http://s0hjw0b6i.hn-bkt.clouddn.com/galaxy.jpg') no-repeat center center;
  background-size: cover;
  object-fit: cover;
}

.course-container {
  display: flex;
  justify-content: space-around;
  padding: 50px;
}

.course-title {
  display: block;
  cursor: pointer;
  padding-top: 50px;
  text-align: center;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(180deg, #a8c3ff, #417dff);
  color: transparent;
  font-size: clamp(1.25rem, .229rem + 4.2vw, 4rem);
  font-weight: 800;
  line-height: 1.203125;
}

.course-item-wrapper {
  aspect-ratio: 358/338;
  max-width: min(260px, 70%);
  position: relative;
  width: 100%;
}

.course-item {
  -border-width: clamp(.125rem, .088rem + .16vw, .225rem);
  align-items: center;
  background: #000;
  background-clip: padding-box;
  border: var(--border-width) solid transparent;
  border-radius: 18px;
  color: #747474;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  transition: 318ms;
  width: 100%;
  cursor: pointer;
}

.content-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.colorful-icon {
  inset: 0;
  opacity: 1;
  position: absolute;
  z-index: 3;
}

svg {
  height: 110%;
  width: 100%;
}

.gradient-border {
  --border-width: clamp(.125rem, .088rem + .16vw, .225rem);
  background: linear-gradient(180deg, hsl(56.93deg 81.79% 52.4% / 80%) 0, #1e2bce);
  opacity: 1;
  position: absolute;
  z-index: 0;
  border-radius: inherit;
  content: "";
  inset: calc(var(--border-width)*-1);
}

.card-icon-shadow {
  transition: 368ms;
  background-position: 50%;
  background-size: contain;
  background: #000;
  border-radius: 18px;
  height: 100%;
  left: 50%;
  opacity: 1;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  will-change: opacity;
  z-index: 1;
}

.type-blocksuite {
  filter: drop-shadow(-25px -60px 60px rgba(18, 70, 255, .5)) drop-shadow(25px 60px 60px rgba(215, 169, 252, .4)) drop-shadow(0 4px 60px rgba(255, 255, 255, .3));
}


/* Responsive design for small screens */
@media screen and (max-width: 768px) {
  .header-navbar {
    height: 50px;
  }

  .navbar-container {
    padding: 0 20px;
  }

  .navbar-fixed {
    position: relative;
    overflow-x: scroll;
  }

  .nav-item {
    font-size: 12px;
  }

  .nav-item a {
    padding: 0 8px;
  }

  .main-container {
    height: calc(100vh - 50px);
  }

  .course-container {
    flex-direction: column;
    padding: 20px;
  }

  .course-title {
    padding-top: 20px;
    font-size: clamp(1rem, 2vw, 2.5rem);
  }

  .course-item-wrapper {
    margin-bottom: 20px;
    max-width: 100%;
  }
}
</style>
