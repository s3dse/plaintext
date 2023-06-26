<script>
import MentionEditor from './components/MentionEditor.vue'
import MenuBar from '@/components/MenuBar.vue'
import { store } from '@/components/editor-store.js'

export default {
    components: {
        MentionEditor,
        MenuBar,
    },
    data() {
        return {
            text: '',
            store
        }
    },
    methods: {
        onCursorChange(e) {
            console.log(e)
        }
    }
}
</script>

<template>
    <div class="flex justify-center mt-8">
        <div class="w-[80vw] h-[80vh]">
            <div class="flex border-gray-300">
                <div class="w-full">
                    <menu-bar editor-ref="editor" class=""></menu-bar>
                    <mention-editor @cursor:change="onCursorChange"></mention-editor>
                </div>
            </div>
        </div>
    </div>
</template>
