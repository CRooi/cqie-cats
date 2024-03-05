<template>
    <div class="flex flex-col max-h-screen">
        <t-navbar :title="'我的'" :fixed="false" />

        <div class="flex-1">
            <div class="flex justify-center mt-2" v-if="isLoading">
                <t-loading size="26px" text="载入中..." />
            </div>

            <div v-if="!isLoading">
                <div style="margin-top: 0.75rem; background-color: var(--td-cell-bg-color, var(--td-bg-color-container, var(--td-font-white-1, #ffffff)));" class="t-cell-group t-cell-group--card p-2 flex items-center" @click="isLogedIn ? () => {} : router.push('/login')">
                    <t-avatar size="medium" :icon="userIcon"></t-avatar>
                    <div class="ml-3 text-lg">{{ isLogedIn ? data.data.data.username : '点此登录' }}</div>
                </div>

                <t-cell-group theme="card" class="mt-3">
                    <t-cell :left-icon="articleIcon" @click="isLogedIn ? router.push('/myposts') : isShowNotLogedInDialog = true" title="我的动态" arrow hover />
                    <t-cell :left-icon="settingIcon" title="设置" @click="router.push('/settings')" arrow hover />
                </t-cell-group>
            </div>
        </div>
    </div>

    <t-dialog
        v-model:visible="isShowNotLogedInDialog"
        title="请先登录。"
        confirm-btn="我知道了"
    />
</template>

<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { UserIcon, ArticleIcon, SettingIcon } from 'tdesign-icons-vue-next'

const userIcon = () => h(UserIcon)
const articleIcon = () => h(ArticleIcon)
const settingIcon = () => h(SettingIcon)

const route = useRoute()
const router = useRouter()

const isLoading = ref(true), isLogedIn = ref(false), isShowNotLogedInDialog = ref(false)
const data = ref({} as any)

onMounted(async () => {
    if (localStorage.getItem('token')) {
        data.value = (await axios.post('https://cqiecats.projectbs.cn/api/queryuserinfo', {
            token: localStorage.getItem('token')
        })).data

        if (data.value.data.status) {
            isLogedIn.value = true
        }

        isLoading.value = false
    } else {
        isLoading.value = false
    }
})
</script>

<style>

</style>