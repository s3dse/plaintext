<script setup>
import Editor from './components/Editor.vue'
import MenuBar from '@/components/MenuBar.vue'
import { store as st } from '@/components/editor-store.js'
import CommandPalette from './components/CommandPalette.vue'
import CmdKeyHint from './components/CmdKeyHint.vue'
import DarkLight from '@/components/DarkLight.vue'
import { commands } from '@/components/commands.js'
import { useMagicKeys, whenever } from '@vueuse/core'
import { ref, nextTick } from 'vue'

const store = ref(st)
const commandPaletteVisible = ref(false)
const onCursorChange = e => console.log(e)
const keys = useMagicKeys()
whenever(keys.cmd_k, () => (commandPaletteVisible.value = !commandPaletteVisible.value))
whenever(keys.escape, () => (commandPaletteVisible.value = false))
const onResize = editor => {
    editor.style.height = 'auto'
    nextTick(() => {
        const maxHeight = document.querySelector('.editor-max-height').offsetHeight
        const editorHeight = editor.scrollHeight
        const height = Math.min(maxHeight - 50, editorHeight)
        editor.style.height = height + 'px'
    })
}
</script>

<template>
    <Teleport to="#modals">
        <command-palette
            command-palette-class="!min-w-[380px]"
            :commands="commands"
            :visible="commandPaletteVisible"
            @on-click-outside="commandPaletteVisible = false"
            @on-action-called="commandPaletteVisible = false"
        ></command-palette>
    </Teleport>
    <dark-light class="flex justify-end p-2"></dark-light>
    <div class="flex justify-center mt-8">
        <div class="editor-max-height w-[80vw] h-[80vh]">
            <div class="flex border-gray-300">
                <div class="w-full">
                    <menu-bar editor-ref="editor" class="py-1"></menu-bar>
                    <!-- <mention-editor @cursor:change="onCursorChange" @on-resize="onResize"></mention-editor> -->
                    <editor
                        ref="editor"
                        editor-class="editor resize-none"
                        v-model="store.value"
                        @selection:range:change="onCursorChange"
                        @on-resize="onResize"
                    ></editor>
                    <cmd-key-hint></cmd-key-hint>
                </div>
            </div>
        </div>
    </div>
</template>
