<template>
    <div>
        <menu-bar-item v-for="(item, index) in items" :key="index" v-bind="item"></menu-bar-item>
    </div>
</template>
<script>
import MenuBarItem from '@/components/MenuBarItem.vue'
import { store } from '@/components/editor-store.js'
export default {
    components: {
        MenuBarItem
    },
    props: {
        preAction: {
            type: Function,
            default: () => console.log(JSON.stringify(store))
        },
        postAction: {
            type: Function,
            default: () => console.log(JSON.stringify(store))
        }
    },
    data() {
        return {
            items: [
                {
                    icon: 'i-mdi-robot-outline',
                    action: () => {
                        this.preAction()
                        const { start, end } = store.selection
                        const text = store.value
                        const result = text.substring(0, start) + 'happy' + text.substring(end)
                        store.setValue(result)
                        this.postAction()
                    }
                }
            ]
        }
    }
}
</script>
