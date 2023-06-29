import { reactive } from 'vue'


export const store = reactive({
    lastEdited: Date.now(),
    setLastEdited(millis = Date.now()) {
        this.lastEdited = millis
    },
    selection: {
        start: 0,
        end: 0
    },
    setSelection({ start, end }) {
        this.selection = { start, end }
    },
    value: '',
    setValue(val) {
        this.setLastEdited()
        this.value = val
    },
    insertValue(val, preAction=logStore, postAction=logStore) {
        preAction(this)
        const { start, end } = this.selection
        const text = this.value
        const result = text.substring(0, start) + val + text.substring(end)
        this.setValue(result)
        const cursor = (text.substring(0, start) + val).length - 1
        this.setSelection({start: cursor, end: cursor})
        postAction(this)
    }
})

const logStore = (store) => console.log(JSON.stringify(store))