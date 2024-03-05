<template>
    <div class="flex flex-col max-h-screen">
        <t-navbar :title="'设置'" :fixed="false" left-arrow @left-click="back()" />

        <div class="flex justify-center mt-2" v-if="isLoading">
            <t-loading size="26px" text="载入中..." />
        </div>

        <div v-if="!isLoading">
            <t-cell-group theme="card" class="mt-3">
                <t-cell :left-icon="lockOnIcon" @click="isLogedIn ? isShowDebugingDialog = true : isShowNotLogedInDialog = true" title="修改密码" arrow hover />

                <t-cell :left-icon="codeIcon" @click="router.push('/about')" title="关于" arrow hover />
            </t-cell-group>

            <t-cell-group theme="card" class="mt-3">
                <t-cell @click="isLogedIn ? isShowLogoutDialog = true : isShowNotLogedInDialog = true" class="red-cell text-center font-bold" title="退出登录" hover />
            </t-cell-group>
        </div>
    </div>

    <t-dialog
        v-model:visible="isShowLogoutDialog"
        title="确认退出登录吗？"
        cancel-btn="取消"
        confirm-btn="确认"
        @confirm="logOut()"
    />

    <t-dialog
        v-model:visible="isShowNotLogedInDialog"
        title="请先登录。"
        confirm-btn="我知道了"
    />

    <t-dialog
        v-model:visible="isShowDebugingDialog"
        title="该功能开发中。"
        confirm-btn="我知道了"
    />
</template>

<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { LockOnIcon, CodeIcon } from 'tdesign-icons-vue-next'

const lockOnIcon = () => h(LockOnIcon)
const codeIcon = () => h(CodeIcon)

const router = useRouter()

const isShowLogoutDialog = ref(false), isShowNotLogedInDialog = ref(false), isShowDebugingDialog = ref(false)

const isLoading = ref(true), isLogedIn = ref(false)

const logOut = () => {
    localStorage.removeItem('token')
    router.push('/login')
}

const back = () => {
    router.back()
}

onMounted(async () => {
    if (localStorage.getItem('token')) {
        const { data } = (await axios.post('https://cqiecats.projectbs.cn/api/queryuserinfo', {
            token: localStorage.getItem('token')
        }))

        if (data.data.status) {
            isLogedIn.value = true
        }

        isLoading.value = false
    } else {
        isLoading.value = false
    }
})
</script>

<style>
.red-cell .t-cell__title {
    color: red;
}
</style>