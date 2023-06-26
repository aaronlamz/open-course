<script setup lang="ts">
import { ref } from 'vue'

const courses = ref([
  {
    title: '《Node.js 开发指南》',
    link: 'https://www.ultimate-kernel.fun/open-course/nodejs/',
  },
  {
    title: '《前端面试系列》',
    link: 'https://www.ultimate-kernel.fun/open-course/interview/',
  },
])

const addAnimation = (event: MouseEvent): void => {
  (event.target as HTMLElement)?.closest('.course-item')?.classList.add('hover-animation')
}

const removeAnimation = (event: MouseEvent): void => {
  (event.target as HTMLElement)?.closest('.course-item')?.classList.remove('hover-animation')
}
</script>

<template>
  <div class="container">
    <h1>Open Course Home</h1>
    <div class="logo">
    </div>
    <div class="course-list">
      <div v-for="(course, index) in courses" :key="index">
        <a :href="course.link" class="course-item" @mouseenter="addAnimation" @mouseleave="removeAnimation">
          <div class="course-item__title">{{ course.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes zoomIn {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo {
  margin-bottom: 20px;
}

.course-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.course-item {
  display: flex;
  position: relative;
  padding: 20px;
  background-color: #f2f2f2;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
  transition: all 0.25s ease;
  will-change: transform;
  cursor: pointer;
}


.course-item.hover-animation {
  animation: zoomIn 0.25s forwards;
}

.course-item__title {
  font-weight: bold;
}
</style>