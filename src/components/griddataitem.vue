<template>
    <div class="flex flex-col"> 
        <div class="text-sm mt-3 opacity-50">{{ title }}</div>
        <div>{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    content: string
}>()
</script>

<style>

</style>