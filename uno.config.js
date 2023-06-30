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
    transformers: [
        transformerDirectives()
    ]
})
