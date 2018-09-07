import Vue from 'vue'
 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
 
const requireComponent = require.context(
  '.', false, /\.vue$/
   //找到components文件夹下以.vue命名的文件
)
//  console.log('requireComponent',requireComponent.keys())
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName) 
//   console.log(capitalizeFirstLetter)
  let len  =fileName.match(/(\/\w+)/ig).length 
  let temp_string = fileName.match(/(\/\w+)/ig)[len-1]
//   console.log('cccccccc' , c.replace(/^\//, '').replace(/\.\w+$/, '') )
  const componentName = capitalizeFirstLetter( 
    temp_string.replace(/^\//, '').replace(/\.\w+$/, '')
    // temp_string.replace(/^\.\//, '').replace(/\.\w+$/, '')
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  )
  // console.log('componentName' , componentName,componentConfig)
  Vue.component(componentName, componentConfig.default || componentConfig)
})