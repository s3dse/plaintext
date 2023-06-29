<template>
<span :class="containerClass">
    <span v-if="type==='icon'" :class="value"></span>
    <span v-if="type==='character'">{{ value }}</span>
</span>
</template>

<script>
export default {
    props: {
        type: {
            type: String ,
            default: 'icon',
            validator: val => ['icon', 'character'].includes(val)
        },
        containerClass: {
            type: String,
            default: 'border dark:border-gray-600 rounded px-1'
        },
        value: {
            type: String,
            required: true
        }
    }
}
</script>