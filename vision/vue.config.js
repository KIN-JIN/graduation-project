const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //取消多词命名规范
  lintOnSave:false,
  devServer:{
    port: 8999,
    open: true,
  }
})
