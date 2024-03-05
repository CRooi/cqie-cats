<template>
    <div class="flex flex-col max-h-screen">
        <t-navbar title="我的动态" :fixed="false" left-arrow @left-click="back()" />

        <div class="p-3 flex-1 overflow-y-scroll">
            <div class="flex justify-center mt-2" v-if="isLoading">
                <t-loading size="26px" text="载入中..." />
            </div>

            <div class="mt-3" v-if="!isLoading">
                <div class="opacity-55 text-sm" v-if="!isLoading && data.length === 0">暂无数据。</div>

                <PostItem
                    v-for="item in data"
                    :key="item.postId"
                    :data="item"
                />

                <!-- <div style="height: calc(86px);"></div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import PostItem from '../components/postItem.vue'

const data = ref({} as any)
const router = useRouter()
const isLoading = ref(true)

const back = () => {
    router.back()
}

onMounted(async () => {
    data.value = (await axios.post('https://cqiecats.projectbs.cn/api/getpostslistbytoken', {
        token: localStorage.getItem('token')
    })).data.data.data.reverse()

    isLoading.value = false
})
</script>

<style>

</style>