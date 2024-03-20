<template>
    <t-navbar title="注册" :fixed="false" left-arrow @left-click="back()" />

    <t-input v-model="input.username" label="账号" placeholder="账号" />
    <t-input v-model="input.password" label="密码" placeholder="密码" type="password" />
    <t-input v-model="input.confirmPassword" label="确认密码" placeholder="确认密码" type="password" />

    <div class="button-group">
        <t-button @click="router.push('/login')">登录</t-button>
        <t-button theme="primary" class="ml-2" @click="register()">注册</t-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { Message } from 'tdesign-mobile-vue'
import { useRouter } from 'vue-router'

import { md5 } from 'js-md5'

const router = useRouter()

const input = ref({
    username: '',
    password: '',
    confirmPassword: ''
})

const showMessage = (theme: string, content = '这是一条普通通知信息', duration = 5000) => {
    if (Message[theme]) {
        Message[theme]({
            offset: [10, 16],
            content,
            duration,
            icon: true,
            zIndex: 20000
        })
    }
}

const register = async () => {
    if (!input.value.username || !input.value.password || !input.value.confirmPassword) {
        showMessage('error', '某个或多个输入框为空。')
        return
    }

    if (input.value.password !== input.value.confirmPassword) {
        showMessage('error', '密码与确认密码不一致。')
        return
    }

    const { data } = await axios.post('https://cqiecats.projectbs.cn/api/register', {
        username: input.value.username,
        password: md5(input.value.password)
    })

    if (data.data.status) {
        showMessage('success', data.data.message)
        
        setTimeout(() => {
            router.push('/login')
        }, 2000)
    } else {
        showMessage('error', data.data.message)
    }
}

const back = () => {
    router.back()
}
</script>

<style>
.button-group {
    background-color: var(--bg-color-demo, #fff);
    box-sizing: border-box;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 0.5px solid #e7e7e7;

    .t-button {
        height: 32px;
        flex: 1;

        &:not(:last-child) {
            flex: 1;
            margin-right: 16px;
        }
    }
}
</style>