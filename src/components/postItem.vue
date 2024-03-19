<template>
    <div>
        <div class="flex">
            <t-avatar size="small" :icon="userIcon"></t-avatar>
            <div class="flex flex-col justify-center ml-2">
                <div>{{ data.username }}</div>
                <div class="text-xs opacity-50">{{ moment.unix(data.time / 1000).utcOffset(8).format('MM/DD HH:mm:ss') }}</div>
            </div>
        </div>

        <div class="mt-1">{{ data.content }}</div>

        <div class="mt-1 grid grid-cols-3 w-[216px] gap-x-3 gap-y-1" v-if="JSON.parse(data.images).length !== 0">
            <t-image
                class="image-container"
                :style="{ width: '72px', height: '72px' }"
                fit="cover"
                :src="item"
                @click="visible = true; nowIndex = index"
                v-for="(item, index) in JSON.parse(data.images)"
            ></t-image>
        </div>

        <div class="flex justify-end">
            <div class="flex items-center" @click="isShowDebugingDialog = true">
                <t-icon name="chat-message" />
                <div>0</div>
            </div>

            <div class="ml-2 flex items-center" @click="isShowDebugingDialog = true">
                <t-icon name="thumb-up-2" />
                <div>0</div>
            </div>
        </div>

        <t-divider />
    </div>

    <t-dialog
        v-model:visible="isShowDebugingDialog"
        title="该功能开发中。"
        confirm-btn="我知道了"
    />

    <t-image-viewer :index="nowIndex" v-model:images="images" v-model:visible="visible" />
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import moment from 'moment'
import { UserIcon } from 'tdesign-icons-vue-next'

const userIcon = () => h(UserIcon)

const props = defineProps<{
    data: any
}>()

const isShowDebugingDialog = ref(false)
const images = ref(JSON.parse(props.data.images))
const visible = ref(false)
const nowIndex = ref(0)
</script>

<style>

</style>