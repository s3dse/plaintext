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
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue', 'selection:range:change', 'onResize'],
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
            this.$emit('onResize', getEditor(this))
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
