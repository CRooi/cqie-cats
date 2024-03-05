<template>
    <div class="flex flex-col min-h-screen max-h-screen">
        <t-navbar title="关于我们" :fixed="false" left-arrow @left-click="back()" />

        <div class="relative p-3 flex-1 overflow-y-scroll">
            <div class="flex flex-col items-center mt-10">
                <img class="w-44" src="../assets/images/logo.png" alt="">
                <div class="font-bold text-2xl">重工猫咪图鉴</div>
            </div>
        </div>
    </div>

    <div class="absolute bottom-3 flex flex-col items-center w-screen opacity-50 text-sm">
        <div>版本号：1.0.0</div>
        <div>菜鸟小组参赛作品</div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
    router.back()
}
</script>

<style>

</style>