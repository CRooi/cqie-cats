<template>
    <div @click="jump(id)">
        <div class="flex items-center">
            <!-- <t-skeleton class="mr-3" :row-col="[{ size: '48px', type: 'circle' }]" loading></t-skeleton>
            <t-skeleton class="flex-1" :row-col="[{ width: '50%' }]" loading></t-skeleton> -->
            <t-avatar :image="`https://cqiecats.projectbs.cn/api/images/${image}`"></t-avatar>
            <div class="ml-3">{{ name }}</div>
        </div>

        <t-divider />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
    id: number
    name: string
    image: string
}>()

const router = useRouter()

const jump = (id: number) => {
    router.push(`/cat/${id}`)
}
</script>