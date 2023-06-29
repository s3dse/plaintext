<script setup>
import { useMagicKeys, whenever, useActiveElement } from '@vueuse/core'
import { logicAnd } from '@vueuse/math'
import { vOnClickOutside } from '@vueuse/components'
import { ref, toRefs, nextTick, computed, watch } from 'vue'
import CommandPaletteFooter from '@/components/CommandPaletteFooter.vue'
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
                action: () => console.log('Hello')
            },
            {
                name: 'getTime',
                label: 'What time is it?',
                action: () => console.log(new Date().toLocaleTimeString('de-DE'))
            }
        ]
    }
})
const emit = defineEmits(['onClickOutside', 'onActionCalled'])
const { commands, visible } = toRefs(props)
const commandIndex = ref(0)
whenever(keys.up, () => {
    if (commandIndex.value > 0) {
        commandIndex.value--
    } else {
        commandIndex.value = commands.value.length - 1
    }
})
whenever(keys.down, () => {
    if (commandIndex.value < commands.value.length - 1) {
        commandIndex.value++
    } else {
        commandIndex.value = 0
    }
})
const runAction = item => {
    item.action()
    nextTick(() => {
        emit('onActionCalled', item.name)
    })
}
const isInputOrTextArea = e => ['INPUT', 'TEXTAREA'].includes(e.target?.tagName)
const isKeyUpOrDown = e => ['keyup', 'keydown'].includes(e.type)
const { enter } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (
            visible.value &&
            isInputOrTextArea(e) &&
            isKeyUpOrDown(e)
            // ['keyup', 'keydown'].includes(e.type) &&
            // ['INPUT', 'TEXTAREA'].includes(e.target?.tagName)
        ) {
            e.stopPropagation()
            e.preventDefault()
            e.stopImmediatePropagation()
        }
    }
})
whenever(enter, () => {
    const command = commands.value[commandIndex.value]
    if (command && command.action) {
        command.action()
        nextTick(() => {
            emit('onActionCalled', command.name)
        })
    }
})

const handleClickOutside = () => emit('onClickOutside')
</script>
<template>
    <Transition name="modal">
        <div v-if="visible"
            class="fixed w-screen flex h-full z-10 overflow-auto bg-gray-200 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
        >
            <div
                tabindex="0"
                v-on-click-outside="handleClickOutside"
                class="command-palette fixed left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] z-10 font-sans border border-solid rounded-lg bg-gray-50 dark:bg-gray-800"
            >
                <div class="font-bold text-gray-400 pb-4">Command Palette</div>
                <div class="command-palette-commands py-8">
                    <div>
                        <span class="px-8 text-gray font-italic">Index: {{ commandIndex }}</span>
                    </div>
                    <ul class="text-gray-900 dark:text-gray-200 text-2xl">
                        <li
                            class=""
                            :class="{ 'bg-gray-400 dark:bg-gray-700': index === commandIndex }"
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
.modal-enter-from, .modal-leave-to {
    @apply op-0;
}
.modal-enter-active, .modal-leave-active {
    @apply transition-opacity ease duration-150;
}
</style>
