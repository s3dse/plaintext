<template>
    <div class="flex gap-1 justify-center items-center dark:text-gray-600 text-gray-300 text-base py-2">
        <span v-if="isMac" class="border dark:border-gray-600 rounded p-1 flex h-fit w-fit">
            <span class="i-mdi-apple-keyboard-command"></span>
        </span>
        <span v-else class="border border-solid">Ctrl</span>
        <span>+</span>
        <span class="tracking-2">K</span>
        <span class="">for Command Palette</span>
    </div>
</template>
<script setup></script>
