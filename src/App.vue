<script setup>
import MentionEditor from './components/MentionEditor.vue'
import MenuBar from '@/components/MenuBar.vue'
import { store as st } from '@/components/editor-store.js'
import CommandPalette from './components/CommandPalette.vue'
import CmdKeyHint from './components/CmdKeyHint.vue'
import DarkLight from '@/components/DarkLight.vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { ref } from 'vue'

const text = ref('')
const store = ref(st)
const commandPaletteVisible = ref(false)
const onCursorChange = e => console.log(e)
const keys = useMagicKeys()
whenever(keys.cmd_k, () => (commandPaletteVisible.value = !commandPaletteVisible.value))
whenever(keys.escape, () => (commandPaletteVisible.value = false))
</script>

<template>
    <!-- <div :class="[commandPaletteVisible ? 'bg-opacity-50 backdrop:bg-green-100':'']"> -->
        <command-palette
            :visible="commandPaletteVisible"
            @on-click-outside="commandPaletteVisible = false"
            @on-action-called="commandPaletteVisible = false"
        ></command-palette>
        <dark-light class="flex justify-end p-2"></dark-light>
        <div class="flex justify-center mt-8">
            <div class="w-[80vw] h-[80vh]">
                <div class="flex border-gray-300">
                    <div class="w-full">
                        <menu-bar editor-ref="editor" class="py-1"></menu-bar>
                        <mention-editor @cursor:change="onCursorChange"></mention-editor>
                        <cmd-key-hint></cmd-key-hint>
                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>
