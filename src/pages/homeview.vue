<template>
    <Login v-if="page === 'login'" />

    <Home v-if="page !== 'login' && tabSelection === 'home'" @switchTagSelection="switchTagSelection" />

    <List v-if="page !== 'login' && tabSelection === 'list'" />

    <Knowledge v-if="page !== 'login' && tabSelection === 'knowledge'" />

    <Me v-if="page !== 'login' && tabSelection === 'me'" />

    <t-tab-bar style="border: 1px rgba(205, 205, 205, .5) solid;" v-if="page !== 'login'" id="tab-bar" v-model="tabSelection" shape="round" theme="tag" :split="false">
        <t-tab-bar-item v-for="item in tabList" :key="item.value" :value="item.value">
            <template #icon>
                <t-icon :name="item.icon" />
            </template>
        </t-tab-bar-item>
    </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Icon as TIcon } from 'tdesign-icons-vue-next'

import Home from '../pages/home.vue'
import List from '../pages/list.vue'
import Knowledge from '../pages/knowledge.vue'
import Me from '../pages/me.vue'
import Login from '../pages/login.vue'

const route = useRoute()
const router = useRouter()

const page = ref('home')
const tabSelection = ref('home')
const tabList = ref([
    { value: 'home', label: '首页', icon: 'home' },
    { value: 'list', label: '图鉴', icon: 'list' },
    { value: 'knowledge', label: '科普', icon: 'book' },
    { value: 'me', label: '我的', icon: 'user' }
])

const switchTagSelection = (value: string) => {
    tabSelection.value = value
}

watch(tabSelection, () => {
    router.push(`/${tabSelection.value}`)
})

onMounted(() => {
    if (route.params.tabSelection) {
        tabSelection.value = route.params.tabSelection as string
    }
})
</script>