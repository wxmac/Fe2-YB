##关于运行
    npm install -- 安装所有依赖；
    npm run start -- 启动本地服务；
    npm run build -- 打包
    
## 关于目录结构
   build -- 执行npm run build 之后生成的包，直接丢给后端。  

   config -- webpack和打包路径相关的配置。    

   public -- api文件下放的是模拟的json文件；js下放的是全局的js文件，需要在index.html中引入。   

   src -- app是页面入口；导出的页面先放在routerName中，再在routerMain中引入，最后在app.js
          中引入，目的是为了预防文件过多，造成混乱。  

   assets -- 静态文件存放的文件夹,比如img。   

   component -- 公用的组件，复用性较高的组件，比如header、footer。   

   page -- 活动相关页面，每个活动都要单独建一个文件夹，没把所有的逻辑都拆出来，只拆了ajax相关的，具体可以参考page/* 下的代码。    

   store -- react中间件redux-thunk相关。    

   units -- 封装公用的js。  

## 关于redux-thunk  

    redux-thunk链接: https://www.npmjs.com/package/redux-thunk 

##关于active_time.json，为了预防活动多，找不到相关文件夹的情况，在这里记录page下文件夹开发的活动 + 开发时间    

    具体参考active_time.json
   
   