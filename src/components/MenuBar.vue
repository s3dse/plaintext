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
    data() {
        return {
            items: [
                {
                    icon: 'i-mdi-robot-outline',
                    action: () => store.insertValue('happy')
                }
            ]
        }
    }
}
</script>
