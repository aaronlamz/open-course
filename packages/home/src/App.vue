<script setup lang="ts">
</script>

<template>
  <div class="page-container">
    <div class="header-navbar">
      <div class="navbar-container">
        <div class="navbar-fixed">
          <div class="menu-list">
            <div class="nav-item">
              <a href="/">Home</a>
            </div>
            <div class="nav-item">
              <a href="/">Open Course</a>
            </div>
            <div class="nav-item">
              <a href="https://github.com/aaronlamz/open-course" target="_blank">Github</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="course-container">

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
  height:calc(100vh - 60px);
  background: linear-gradient(180deg, #000, #19191b);
}
</style>