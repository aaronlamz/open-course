<template>
    <div class="menu-list">
        <div class="menu-item" 
        v-for="(item, index) in menuItems" 
        :key="index" 
        @click="go(item.link)">{{ item.title }}</div>
    </div>
</template>
  
<script setup>
import { withBase, useRouter } from 'vitepress'
import { ref } from 'vue'
const { go } = useRouter()

const menuItems = ref(
    [
        {
            title: 'JavaScript 系列',
            link: withBase('/javascript/'),
        },
        {
            title: 'CSS 系列',
            link: withBase('/css/'),
        },
        {
            title: 'Vue 系列',
            link: withBase('/vue/'),
        },
        {
            title: 'React 系列',
            link: withBase('/react/'),
        },
        {
            title: 'HTTP系列',
            link: withBase('/http/'),
        },
        {
            title: '笔试题系列',
            link: withBase('/handwritten/'),
        },
        {
            title: 'Leetcode 系列',
            link: withBase('/leetcode/'),
        },
        {
            title: 'Node.js 系列',
            link: withBase('/nodejs/'),
        },
    ])

</script>
  
<style>
.menu-list {
    column-count: 2;
    column-gap: 20px;
}

.menu-item {
    background-color: transparent;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 20px;
    color: #10b981;
    border: 1px solid rgba(82, 82, 89, 0.32);
    transition: all 0.3s;
    cursor: pointer;
}

.menu-item:hover {
    color: #fff;
    border-color: #10b981;
    background-color: #46a552;
}
</style>