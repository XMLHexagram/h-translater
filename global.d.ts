import Vue from 'vue'
import axios from 'axios'
import store from './src/store/store'

declare module 'vue/types/vue' {
    interface Vue {
        $axios: typeof axios
        $store: typeof store
    }
}
