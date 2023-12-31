<template>
    <Mentionable
        :keys="['?', ':']"
        :items="suggestions"
        offset="6"
        @open="onOpen"
        @apply="onApply"
        :omit-key="true"
        :insert-space="true"
        class="z-1"
    >
        <editor
            ref="editor"
            :editor-class="[
                'block w-full rounded-md sm:text-sm font-mono p-3',
                'focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-2',
                'bg-gray-50',
                'border border-solid !dark:border-gray-700',
                'text-gray-900',
                'dark:bg-gray-800',
                'dark:border-gray-800',
                'dark:text-gray-200',
                'scrollbar scrollbar-rounded', 
                'scrollbar-thumb-color-gray-300 dark:scrollbar-thumb-color-gray-900',
                'scrollbar-track-color-gray-50 dark:scrollbar-track-color-gray-800',
                'focus:scrollbar-track-color-gray-50 focus:dark:scrollbar-track-color-gray-800',
                'scrollbar-w-2 scrollbar-h-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4'
            ]"
            v-model="store.value"
            @selection:range:change="onCursorChange"
            @on-resize="onResize"
        ></editor>
        <template #no-result>
            <div class="dim">No result</div>
        </template>

        <template #item-?="{ item }">
            <div class="user">
                {{ item.label }}
            </div>
        </template>

        <template #item-:="{ item }">
            <div class="issue">
                <span class="number"> {{ item.label }} </span>
            </div>
        </template>
    </Mentionable>
</template>
<script>
import { store } from '@/components/editor-store'
import Editor from './Editor.vue'
import { Mentionable } from 'vue-mention'
const suggestionCatalogue = {
    ':': [
        {
            value: ':smile:',
            label: 'smile'
        },
        {
            value: ':grin:',
            label: 'grin'
        }
    ],
    '?': [
        {
            value: 'happy',
            label: 'Say how you feel!'
        },
        {
            value: (() => new Date().getHours() + ':' + new Date().getMinutes())(),
            label: 'What time is it?'
        }
    ]
}
export default {
    components: { Mentionable, Editor },
    data() {
        return {
            store,
            suggestions: []
        }
    },
    emits: ['cursor:change', 'on-resize'],
    methods: {
        onCursorChange(e) {
            this.$emit('cursor:change', e)
        },
        onResize(e) {
            this.$emit('on-resize', e)
        },
        onOpen(key) {
            const suggestions = suggestionCatalogue[key]
            if (suggestions) {
                this.suggestions = suggestions
            }
        },
        onApply() {
        }
    }
}
</script>
<style>
@import 'floating-vue/dist/style.css';
.mention-item {
    @apply px-[.5rem] py-[0.4rem];
    @apply rounded-[0px];
}

.mention-selected {
    @apply bg-gray-400;
    @apply font-bold;
}
.v-popper--theme-mentionable .v-popper__inner {
  @apply rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-900;
}
.v-popper--theme-mentionable .v-popper__arrow-inner {
    @apply border-gray-100 dark:border-gray-700;
}
.v-popper--theme-mentionable .v-popper__arrow-outer {
    @apply border-gray-300 dark:border-gray-900;
}
</style>
