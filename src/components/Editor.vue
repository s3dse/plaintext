<template>
    <textarea
        id="editor"
        :rows="rows"
        ref="editor"
        :value="modelValue"
        @keyup="handleKeyup"
        @mouseup="emitCursor"
        @input="emitInputState"
        :placeholder="placeholder"
        :class="editorClass"
        tabindex="0"
    ></textarea>
</template>
<script>
import { store } from '@/components/editor-store.js'
const getEditor = t => t.$refs['editor']

export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        rows: {
            type: Number,
            default: 5
        },
        placeholder: {
            type: String,
            default: 'Type your text here...'
        },
        editorClass: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:modelValue', 'selection:range:change'],
    data() {
        return {
            text: ''
        }
    },
    methods: {
        emitInputState(event) {
            store.setValue(event.target.value)
            this.$emit('update:modelValue', event.target.value)
        },
        handleKeyup(event) {
            this.emitCursor(event)
            this.resizeEditor()
        },
        resizeEditor() {
            getEditor(this).style.height = 'auto'
            this.$nextTick(() => {
                getEditor(this).style.height = getEditor(this).scrollHeight + 'px'
            })
        },
        emitCursor(event) {
            const selection = {
                start: event.target.selectionStart,
                end: event.target.selectionEnd
            }
            store.setSelection(selection)
            this.$emit('selection:range:change', selection)
        }
    },
    mounted() {
        store.setValue(this.modelValue)
        this.resizeEditor()
        this.$nextTick(() => {
            getEditor(this).focus()
        })
    }
}
</script>
<style>
@import 'floating-vue/dist/style.css';
.mention-item {
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
}
.mention-selected {
    background: rgb(192, 250, 153);
}
</style>
