# v-blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 创建项目
使用VueCLI3创建项目结构
```
vue create v-blog
```
## 增加组件
### 创建登录页面组件 login/index.vue
### 创建主页组件 home/index.vue
### 配置路由映射 index/index.js
### 测试路由 App.vue
tag：0.0.1
### 修改登录页面组件
#### 使用normalize.css
安装
npm install --save normalize.css
使用
import 'normalize.css/normalize.css'
#### 使用进度条 NProgress
安装
npm install --save nprogress
使用
//导入
在router/index.js中添加
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
index.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

index.afterEach(() => {
  NProgress.done()
})
进阶-自定义颜色
在App.vue的样式中添加
#nprogress .bar {
  background: red !important;
}
#### 使用element-ui
npm i element-ui -S
引入 Element
完整引入
在 main.js 中写入以下内容：
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
#### 使用scss样式
npm install --save-dev node-sass
npm install --save-dev sass-loader
修改login/index.vue
    添加登录表单及相关事件
修改store/index.js
    增加state属性isLogin，记录是否登录，未登录跳转登录页面，登录以后不拦截
修改router/index.js    增加全局导航守卫beforeEach，每次路由跳转时验证是否登录


npm install js-cookie --save
npm install screenfull
npm install axios
npm install fuse.js
//使用图标
npm install svg-sprite-loader --save-dev

npm install driver.js --save

npm install path-to-regexp


npm install mavon-editor --save
npm i marked -S

npm install vue-quill-editor --save

npm i --save lodash
