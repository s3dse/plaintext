import { reactive } from "vue";

export const store = reactive({
    lastEdited: Date.now(),
    setLastEdited(millis=Date.now()) {
        this.lastEdited = millis
    },
    selection: {
        start: 0,
        end: 0
    },
    setSelection({start, end}) {
        this.selection = { start, end }
    },
    value: '',
    setValue(val) {
        this.setLastEdited()
        this.value = val
    }
})