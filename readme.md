# 云开发「原生短信验证码」最佳实践｜预约、注册登录、验真场景

## 项目介绍

云开发推出短信验证码登录鉴权能力，相比扩展能力节省了大量配置，可以免复杂的接入轻松和云开发登录等体系对接，本项目以一个预约场景，需要手机号验证来出发，依靠云开发做的应用。

![应用最终状态](https://main.qcloudimg.com/raw/e41ed99ab4615ce3551a2d196e78c703.png)

## 使用步骤

1. 前往[云开发控制台-登录授权](https://console.cloud.tencent.com/tcb/env/login)下，开启短信验证码登录，如果第一次使用，请前往购买短信资源包

![](https://main.qcloudimg.com/raw/bd1f3bebe9ab36f4df7c726ddb663a49.png)

1. 前往[云开发控制台-数据库](https://console.cloud.tencent.com/tcb/db/index)下，创建名为SIGN的数据库，默认权限即可。

2. 下载项目代码，在webviews/sign/index.js中，第一行，关键文字中更改如下为自己的环境ID（一定要和前几步操作保持相同的环境ID）
   
3. 预约的记录可以在数据库中SIGN集合找到，可以自己按照需要制作应用，或者使用CMS内容管理系统扩展能力。

## 项目作者

- 云开发团队zirali
