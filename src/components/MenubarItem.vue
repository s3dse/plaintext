<template>
    <div 
        class="w-fit h-fit 
        text-gray-900 bg-white 
        border border-solid border-gray-300 
        focus:outline-none hover:bg-gray-100 
        focus:ring-4 focus:ring-gray-200 
        font-medium rounded-lg 
        text-xl 
        py-2 px-3 m-1
        dark:bg-gray-800 dark:text-white 
        dark:border-gray-600 dark:hover:bg-gray-700 
        dark:hover:border-gray-600 dark:focus:ring-gray-700"
        @click="action"
        @mousedown.prevent>
        <span :class="icon"></span>
    </div>
</template>
<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        action: {
            type: Function,
            required: true
        }
    }
}
</script>