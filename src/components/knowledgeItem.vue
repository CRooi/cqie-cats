<template>
    <div class="shadow-lg mb-2 relative overflow-hidden p-2 rounded-xl" :style="{backgroundColor: color, border: `3px ${strokeColor} solid`}">
        <div class="shadow-text absolute text-4xl bottom-0 right-0 z-10 opacity-70">{{ emoji }}</div>
        <div class="relative z-20 shadow-text" :style="{color: textColor}">{{ content }}</div>
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

<style scoped>
.shadow-text {
    text-shadow: 0px 4px 10px rgba(0,0,0,0.3);
}
</style>