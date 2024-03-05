<template>
    <t-navbar title="登录" :fixed="false" left-arrow @left-click="back()" />

    <t-input v-model="input.username" label="账号" placeholder="账号" />
    <t-input v-model="input.password" label="密码" placeholder="密码" type="password" />

    <div class="button-group">
        <t-button @click="router.push('/register')">注册</t-button>
        <t-button theme="primary" class="ml-2" @click="login()">登录</t-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { md5 } from 'js-md5'
import { Message } from 'tdesign-mobile-vue'
import axios from 'axios'

const router = useRouter()

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

const input = ref({
    username: '',
    password: ''
})

const login = async () => {
    if (!input.value.username || !input.value.password) {
        showMessage('error', '某个或多个输入框为空。')
        return
    }

    const { data } = await axios.post('https://cqiecats.projectbs.cn/api/login', {
        username: input.value.username,
        password: md5(input.value.password)
    })

    if (data.data.status) {
        showMessage('success', data.data.message)

        localStorage.setItem('token', data.data.token)
        
        setTimeout(() => {
            router.push('/me')
        }, 1000)
    } else {
        showMessage('error', data.data.message)
    }
}

const back = () => {
    router.back()
}
</script>

<style scoped>
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