<template>
    <div class="shadow-lg mb-2 relative overflow-hidden p-2 rounded-xl" :style="{backgroundColor: color, border: `3px ${strokeColor} solid`}">
        <div class="absolute text-4xl bottom-0 right-0 z-10 opacity-70">{{ emoji }}</div>
        <div class="relative z-20" :style="{color: textColor}">{{ content }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    color: string
    strokeColor: string
    textColor: string
    emoji: string
    content: string
}>()
</script>

<style>

</style>