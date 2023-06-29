<script setup>
import { useMagicKeys, whenever } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'
import { ref, toRefs, nextTick } from 'vue'
import CommandPaletteFooter from '@/components/CommandPaletteFooter.vue'
import { store } from './editor-store'
const keys = useMagicKeys()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    commands: {
        type: Array,
        default: () => [
            {
                name: 'hello',
                label: 'Say Hello!',
                action: () => 'Hello'
            },
            {
                name: 'getTime',
                label: 'What time is it?',
                action: async () => new Date().toLocaleTimeString('de-DE')
            }
        ]
    }
})
const emit = defineEmits(['onClickOutside', 'onActionCalled'])
const { commands, visible } = toRefs(props)
const commandIndex = ref(0)
whenever(keys.up, () => {
    if (!visible.value) return
    if (commandIndex.value > 0) {
        commandIndex.value--
    } else {
        commandIndex.value = commands.value.length - 1
    }
})
whenever(keys.down, () => {
    if (!visible.value) return
    if (commandIndex.value < commands.value.length - 1) {
        commandIndex.value++
    } else {
        commandIndex.value = 0
    }
})
const isAsync = fn => fn.constructor.name === 'AsyncFunction'
const isInputOrTextArea = e => ['INPUT', 'TEXTAREA'].includes(e.target?.tagName)
const isKeyUpOrDown = e => ['keyup', 'keydown'].includes(e.type)
const { enter } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (visible.value && isInputOrTextArea(e) && isKeyUpOrDown(e)) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
        }
    }
})
whenever(enter, () => {
    if (!visible.value) return
    const command = commands.value[commandIndex.value]
    if (command && command.action) {
        if (isAsync(command.action)) {
            command.action().then(result => {
                store.insertValue(result)
            })
        } else {
            const result = command.action()
            store.insertValue(result)
        }
        nextTick(() => {
            emit('onActionCalled', command.name)
        })
    }
})

const handleClickOutside = () => emit('onClickOutside')
</script>
<template>
    <Transition name="modal">
        <div
            v-if="visible"
            class="fixed w-screen flex h-full z-10 overflow-auto bg-gray-200 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80"
        >
            <div
                tabindex="0"
                v-on-click-outside="handleClickOutside"
                class="command-palette fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-10 border border-solid border-gray-400 dark:border-gray-50 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
                <div class="command-palette-commands py-8">
                    <ul class="text-gray-900 dark:text-gray-200 text-2xl font-light">
                        <li
                            class=""
                            :class="{
                                'bg-gray-200 font-semibold dark:bg-gray-700': index === commandIndex
                            }"
                            v-for="(item, index) in commands"
                            :key="index"
                            @mouseover="commandIndex = index"
                            @click="runAction(item)"
                        >
                            <span class="px-8">
                                {{ item.label }}
                            </span>
                        </li>
                    </ul>
                </div>
                <command-palette-footer></command-palette-footer>
            </div>
        </div>
    </Transition>
</template>
<style>
.modal-enter-from,
.modal-leave-to {
    @apply op-0;
}
.modal-enter-active,
.modal-leave-active {
    @apply transition-opacity ease duration-150;
}
</style>
