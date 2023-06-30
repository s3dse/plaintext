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
    commandPaletteClass: {
        type: String,
        default: ''
    },
    commands: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['onClickOutside', 'onActionCalled'])
const { visible } = toRefs(props)
const commands = ref(props.commands.map(command => ({ ...command, busy: false })))
const commandIndex = ref(0)
const isSuggestionActive = () => commands.value.filter(c => c.result).length
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
const isInputOrTextArea = e => ['INPUT', 'TEXTAREA'].includes(e.target?.tagName)
const isKeyUpOrDown = e => ['keyup', 'keydown'].includes(e.type)
const { enter } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (visible.value && isInputOrTextArea(e) && isKeyUpOrDown(e)) {
            e.preventDefault()
        }
    }
})

const runFact = command => {
    command
        .action()
        .then(result => {
            store.insertValue(result)
        })
        .then(() =>
            nextTick(() => {
                command.busy = false
                emit('onActionCalled', command.name)
            })
        )
}
const runSuggestion = command => {
    command
        .action()
        .then(result => (command.result = result))
        .then(() => (command.busy = false))
}
const runAction = () => {
    if (!visible.value) return
    const command = commands.value[commandIndex.value]
    if (!command || !command.action) return
    command.busy = true
    if (command.type === 'fact') {
        runFact(command)
    }
    if (command.type === 'suggestion') {
        if (isSuggestionActive()) {
            store.insertValue(commands.value.find(c => c.result).result)
            command.result = null
            command.busy = false
            emit('onActionCalled', command.name)
        } else {
            runSuggestion(command)
        }
    }
}
whenever(enter, runAction)

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
                :class="[
                    'command-palette fixed left-[50%] top-[50%] w-[80vw] translate-y-[-50%] translate-x-[-50%] z-10 border border-solid border-gray-400 dark:border-gray-50 rounded-lg bg-gray-50 dark:bg-gray-800',
                    commandPaletteClass
                ]"
            >
                <slot name="header"></slot>
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
                            @click="runAction"
                        >
                            <span class="px-8 whitespace-nowrap flex flex-col">
                                {{ item.label }}
                                <span
                                    class="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-yellow-1000 rounded-full"
                                    role="status"
                                    aria-label="loading"
                                    v-if="item.busy"
                                >
                                    <span class="sr-only">Loading...</span>
                                </span>
                                <div
                                    class="py-8 flex flex-col w-full font-normal"
                                    v-if="item.result"
                                >
                                    <div class="flex flex-row justify-end items-baseline gap-4">
                                        <div class="i-mdi-thumb-up-outline"></div>
                                        <div class="i-mdi-thumb-down-outline"></div>
                                        <div>
                                            <span class="i-mdi-refresh"></span>
                                            <span>Re-Generate</span>
                                        </div>
                                    </div>
                                    <pre class="prose border w-full min-h-20">{{
                                        item.result
                                    }}</pre>
                                </div>
                            </span>
                        </li>
                    </ul>
                </div>
                <slot name="footer">
                    <command-palette-footer></command-palette-footer>
                </slot>
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
