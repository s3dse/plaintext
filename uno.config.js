import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetIcons, presetTypography, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetTypography(),
        presetIcons({
            extraProperties: {
                display: 'inline-flex',
                'vertical-align': 'middle'
            }
        })
    ],
    rules: [['caret-block', { 'caret-shape': 'block' }]],
    transformers: [
        transformerDirectives()
    ]
})
