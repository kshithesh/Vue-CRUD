module.exports = {
    devServer: {
        port: 8081
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: 
                 `@import "~@/assets/sass/variables.scss";`
            }
        }
    }
}