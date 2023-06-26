// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    devtools:false,
    runtimeConfig:{
        public:{
            REALM_ID:process.env.REALM_ID
        }
    },
    app:{
        head:{
            title:"Table Manager"
        }
    }
})
