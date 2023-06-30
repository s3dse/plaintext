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
        :class="['resize-none', ...editorClass]"
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
                const maxHeight = document.querySelector('.editor-max-height').offsetHeight
                const editorHeight = getEditor(this).scrollHeight
                const height = Math.min(maxHeight - 50, editorHeight)
                getEditor(this).style.height = height + 'px'
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
        store.setEditor(this.$el)
        store.setValue(this.modelValue)
        this.resizeEditor()
        this.$nextTick(() => {
            getEditor(this).focus()
        })
    }
}
</script>
