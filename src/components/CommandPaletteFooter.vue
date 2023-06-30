<script setup>
import KeyIcon from './KeyIcon.vue';
</script>
<template>
    <div class="command-palette-footer flex gap-4 w-full border-t border-t-solid border-gray-400 dark:border-gray-200 text-sm justify-around">
            <div class="flex p-2 gap-8 dark:text-gray-200">
                <span class="flex gap-1 justify-center items-center">
                    <key-icon value="i-mdi-arrow-down"></key-icon>
                    <key-icon value="i-mdi-arrow-up"></key-icon>
                    <span>to navigate</span>
                </span>
                <span class="flex gap-1 justify-center items-center">
                    <key-icon value="i-mdi-keyboard-return"></key-icon>
                    <span>to select</span>
                </span>
                <span class="flex gap-1 justify-center items-center">
                    <key-icon value="i-mdi-keyboard-esc"></key-icon>
                    <span>to close</span>
                </span>
            </div>
        </div>
</template>