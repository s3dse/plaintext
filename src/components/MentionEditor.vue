<template>
    <Mentionable
        :keys="['?', ':']"
        :items="suggestions"
        offset="6"
        @open="onOpen"
        @apply="onApply"
        :omit-key="true"
        :insert-space="true"
    >
        <editor
            ref="editor"
            :editor-class="[
                'block w-full rounded-md sm:text-sm font-mono p-3',
                'focus:ring-gray-300',
                'focus:ring-0',
                'bg-gray-50',
                'text-gray-900',
                'dark:bg-gray-800',
                'dark:border-gray-800',
                'dark:text-gray-200'
            ]"
            v-model="store.value"
            @selection:range:change="onCursorChange"
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
    emits: ['cursor:change'],
    methods: {
        onCursorChange(e) {
            this.$emit('cursor:change', e)
        },
        onOpen(key) {
            console.log(JSON.stringify(store))
            const suggestions = suggestionCatalogue[key]
            if (suggestions) {
                this.suggestions = suggestions
            }
        },
        onApply() {
            console.log(JSON.stringify(store))
        }
    }
}
</script>
