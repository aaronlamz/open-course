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
            title: 'JavaScript ',
            link: withBase('/javascript/'),
        },
        {
            title: 'CSS ',
            link: withBase('/css/'),
        },
        {
            title: 'Vue ',
            link: withBase('/vue/'),
        },
        {
            title: 'React ',
            link: withBase('/react/'),
        },
        {
            title: '网络协议',
            link: withBase('/network/'),
        },
        {
            title: '笔试题',
            link: withBase('/handwritten/'),
        },
        {
            title: 'Leetcode ',
            link: withBase('/leetcode/'),
        },
        {
            title: 'Node.js ',
            link: withBase('/nodejs/'),
        },
    ])

</script>

<style>
.menu-list {
    column-count: 3;
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
