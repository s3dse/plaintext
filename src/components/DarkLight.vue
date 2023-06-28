<script setup>
import { ref } from 'vue'

const getSysTheme = () => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return dark
}
const isDark = ref(getSysTheme())

const toggleTheme = () => {
    isDark.value = document.getElementsByTagName('html')[0].classList.toggle('dark')
}

</script>

<template>
    <div>
        <div v-if="isDark" class="i-mdi-white-balance-sunny text-gray-200" @click="toggleTheme"></div>
        <div v-else class="i-mdi-moon-waxing-crescent text-gray-900" @click="toggleTheme"></div>
    </div>
</template>