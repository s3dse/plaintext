import { store } from '@/components/editor-store'

export const commands = [
    {
        name: 'hello',
        label: 'Say Hello!',
        type: 'fact',
        action: () => new Promise(resolve => setTimeout(resolve, 800)).then(() => 'Hello')
    },
    {
        name: 'getTime',
        label: 'What time is it?',
        type: 'fact',
        action: async () => new Date().toLocaleTimeString('de-DE')
    },
    {
        name: 'selectioneToCorporateLang',
        type: 'suggestion',
        label: 'Convert Selection to Corporate Language',
        action: async () =>
            new Promise(resolve => setTimeout(resolve, 500))
                .then(() => store.value.substring(store.selection.start, store.selection.end))
                .then(v => v.split(/\W+/g))
                .then(words => words.filter(e => e).map(word => 'corporate__' + word))
    }
]
