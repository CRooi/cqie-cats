<template>
    <div class="flex flex-col max-h-screen">
        <div>
            <t-navbar title="图鉴" :fixed="false" />

            <t-tabs v-model="tabStatus" default-value="在校" >
                <t-tab-panel value="在校" label="在校" />
                <t-tab-panel value="毕业" label="毕业" />
                <t-tab-panel value="休学" label="休学" />
                <t-tab-panel value="喵星" label="喵星" />
            </t-tabs>
        </div>

        <div class="p-3 overflow-scroll flex-1">
            <div class="flex justify-center mt-2" v-if="isLoading">
                <t-loading size="26px" text="载入中..." />
            </div>

            <div class="text-center opacity-55 text-sm" v-if="!isLoading && data.length === 0">暂无数据。</div>
            
            <CatsListItem
                v-for="item in data"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :image="item.image"
            />

            <BlankListItem />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

import CatsListItem from '../components/catsListItem.vue'
import BlankListItem from '../components/blankListItem.vue'

const tabStatus = ref('在校')
const isLoading = ref(true)
const data = ref([] as any[])

watch(tabStatus, async (newVal) => {
    isLoading.value = true
    data.value = []

    data.value = (await axios.post('https://cqiecats.projectbs.cn/api/getcatslist', {
        tabStatus: newVal
    })).data.data

    isLoading.value = false
})

onMounted(async () => {
    data.value = (await axios.post('https://cqiecats.projectbs.cn/api/getcatslist', {
        tabStatus: tabStatus.value
    })).data.data

    isLoading.value = false

    console.log(data.value)
})
</script>

<style>

</style>