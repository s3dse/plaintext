import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetIcons, presetTypography, presetUno, presetAttributify } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
    presets: [
        presetUno(),
        presetTypography(),
        presetIcons({
            extraProperties: {
                display: 'inline-flex',
                'vertical-align': 'middle'
            }
        }),
        presetScrollbar(),
        presetAttributify()
    ],
    rules: [['caret-block', { 'caret-shape': 'block' }]],
    shortcuts: {
        'editor': `block w-full rounded-md text-lg font-mono 
        p-3 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-2 
        bg-gray-50 dark:bg-gray-800 border border-solid !dark:border-gray-700 
        text-gray-900 dark:text-gray-200 
        scrollbar scrollbar-rounded 
        scrollbar-thumb-color-gray-300 dark:scrollbar-thumb-color-gray-900 
        scrollbar-track-color-gray-50 dark:scrollbar-track-color-gray-800 
        focus:scrollbar-track-color-gray-50 focus:dark:scrollbar-track-color-gray-800 
        scrollbar-w-2 scrollbar-h-2 
        scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4`
    },
    transformers: [
        transformerDirectives()
    ]
})
