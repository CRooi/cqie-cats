<template>
    <t-navbar title="首页" :fixed="false" />

    <div class="p-3 pt-5">
        <img class="w-24 -ml-2" src="../assets/images/logo.png" alt="" />

        <div class="font-bold text-xl">重工猫咪图鉴</div>
        <div class="text-sm opacity-50">希望校园的每一只猫咪都能被爱护，让我们一起了解他们，关心他们。</div>

        <t-grid class="mt-3" :column="2" border>
            <t-grid-item @click="switchTagSelection('list')" text="猫咪图鉴" image="https://cqiecats.projectbs.cn/api/images/4.png" />
            <t-grid-item @click="switchTagSelection('knowledge')" text="科普栏目" image="https://cqiecats.projectbs.cn/api/images/2.png" />
            <t-grid-item @click="router.push('/about')" text="关于我们" image="https://cqiecats.projectbs.cn/api/images/3.png" />
            <t-grid-item @click="isShowDebugingDialog = true" text="猫咪领养" image="https://cqiecats.projectbs.cn/api/images/1.png" />
        </t-grid>

        <div class="mt-3">
            <a href="https://beian.miit.gov.cn/" class="text-xs opacity-50">渝ICP备2022007612号</a>
            <div class="flex items-center ">
                <img class="w-4" src="../assets/images/mps.png" alt="">
                <div class="text-xs opacity-50">渝公网安备50023202000282号</div>
            </div>
        </div>
    </div>

    <t-dialog
        v-model:visible="isShowDebugingDialog"
        title="该功能开发中。"
        confirm-btn="我知道了"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isShowDebugingDialog = ref(false)

const emit = defineEmits<{
    (e: 'switchTagSelection', value: string): void
}>()

const switchTagSelection = (value: string) => {
    emit('switchTagSelection', value)
}
</script>

<style>

</style>