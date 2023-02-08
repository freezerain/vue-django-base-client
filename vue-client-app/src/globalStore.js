import {reactive} from 'vue'
//Dont do this kids
export const store = reactive({
    isAuth: false,
    isSuperuser: false,
    filterQuery: ''
})