<script setup lang="ts">
</script>

<template>
  <div class="page-container">
    <div class="header-navbar">
      <div class="navbar-container">
        <div class="navbar-fixed">
          <div class="menu-list">
            <div class="nav-item">
              <a href="/" target="_blank">Home</a>
            </div>
            <div class="nav-item">
              <a href="https://www.ultimate-kernel.fun/open-course/interview/" target="_blank">《前端面试系列》</a>
            </div>
            <div class="nav-item">
              <a href="https://www.ultimate-kernel.fun/open-course/qiankun/" target="_blank">《qiankun 微前端实践指南》</a>
            </div>
            <div class="nav-item">
              <a href="https://www.ultimate-kernel.fun/open-course/nodejs/" target="_blank">《Node.js 开发指南》</a>
            </div>
            <div class="nav-item">
              <a href="https://github.com/aaronlamz/open-course" target="_blank">Github</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="course-title">
        Open Course - Web Learning Course
      </div>
      <div class="course-container">
        <!-- <div class="course-item-wrapper">
          <a class="course-item">
            <div class="gradient-border"></div>
            <div class="content-box">
              <span class="nuxt-icon logo-icon colorful-icon">
                <svg width="358" height="338" viewBox="0 0 358 338" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M257.444 109.293L205.506 68L100.557 88.9466V184.689L152.513 226L257.444 205.053V109.293ZM195.12 83.1255V110.799L211.002 107.629V90.2678L233.948 108.507L157.366 123.79L124.053 97.3085L195.12 83.1255ZM116.438 109.145L146.99 133.427V162.412L162.871 159.243V135.746L241.553 120.038V184.865L211.002 160.582V131.597L195.12 134.767V158.263L116.438 173.971V109.145ZM162.88 210.875V183.201L146.999 186.371V203.732L124.053 185.493L200.634 170.21L233.948 196.691L162.88 210.875Z"
                    fill="url(#paint0_linear_917_141447)"></path>
                  <defs>
                    <linearGradient id="paint0_linear_917_141447" x1="179" y1="68" x2="179" y2="226"
                      gradientUnits="userSpaceOnUse">
                      <stop stop-color="#28B2FF"></stop>
                      <stop offset="1" stop-color="#7000FF"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
          </a>
          <div class="card-icon-shadow type-blocksuite"></div>
        </div> -->
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
  height: calc(100vh - 60px);
  /* background: linear-gradient(180deg, #000, #19191b); */
  background: url('/galaxy.jpg') no-repeat center center;
  background-size: cover;
  object-fit: cover;
}

.course-container {
  display: flex;
  justify-content: space-around;
  padding: 50px;
}

.course-title {
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
