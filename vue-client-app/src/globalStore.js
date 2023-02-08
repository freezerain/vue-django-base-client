import { reactive } from 'vue'

export const store = reactive({
    isAuth: false,
    isSuperuser:false,
    filterQuery: ''
})