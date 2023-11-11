import {reactive} from 'vue'
//This is a global variable store and antipattern
export const store = reactive({
    isAuth: false,
    isSuperuser: false,
    filterQuery: ''
})