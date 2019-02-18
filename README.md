# ☕Kindem's Blog Version 3.0 Backend

---

你现在看到的这个仓库是 `Kindem 的博客` 的后端代码仓库，需要配合前端仓库一同使用: [FlyAndNotDown/blog-v3-frontend](https://github.com/FlyAndNotDown/blog-v3-frontend)

你可以直接访问这个地址(部署后生效，暂时还未部署)来查看博客的运行效果: [Kindem 的博客](http://www.kindemh.cn)，同时，旧版本的博客将会被移动到如下地址: [Kindem 的旧博客](http://dev.kindemh.cn)，在不久之后，新的域名也将启用: [www.kindem.xyz](http://www.kindem.xyz)

如果你要基于我的博客系统搭建自己的博客，在后面会提及部署及私有化指北

# 📦技术栈
* 构建：`Node.js`、`Babel`
* `Web` 框架：基于 `Koa.js` 改造
* `ORM`：`Sequelize.js`

# 🏃‍运行
首先需要搭建自己的 `SMTP` 服务器和数据库服务器，修改 `/src/configs` 下的各种配置：

* `mail.js`：由于邮件激活使用的 `SMTP` 服务器，需要你自己搭建或者使用现有服务，我使用的是 `QQ邮箱企业版`
* `main.js`：主配置
    * `devMode`：开发者模式，每一个配置文件下都有两套配置，分别对应开发者模式和生产模式，这一选项将会决定每一个配置文件具体使用哪一套配置
    * `log`: 是否开启日志
* `middleware.js`：中间件的集中配置
    * `cors`：`CSRF` 保护，这里一定要与你实际部署的域一致
    * `session`：`session` 设置
* `model.js`：数据库配置，只需要配置好数据库连接信息，后面可以使用助手一键搞定
* `regex.js`：正则集中配置
* `server.js`：服务配置，比如监听端口等

如果还未安装 `Node.js`，请先自行安装。接下来使用 `npm` 安装 `yarn`：

```
npm i -g yarn
```

使用 `yarn` 安装依赖：

```
yarn
```

使用我写的助手来帮助创建数据库模型：

```
yarn build
yarn helper db force sync
```

使用助手创建管理员账户：

```
yarn helper admin new
```

以 `dev` 模式运行：

```
yarn start
```
 
或者以 `production` 模式运行：

```
yarn build
yarn prod
```

# 🎁私有化指北
按照如上的方法配置 `SMTP`服务器和数据库服务器、修改了各种配置、编译了 `release` 版本之后，将：

```
yarn prod
```

这一指令注册为一个系统服务，这样就可以以服务的形式管理后端服务，再将 `Nginx` 收到的 `/request/blog` 的所有请求转发到 `localhost:30000` 上，即可完成后端部署

# 😆关于
* `author`: `John Kindem`

欢迎 `star`、`fork`，有问题请提 `issue`