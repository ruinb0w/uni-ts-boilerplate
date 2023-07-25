## 使用方法

### 下载&安装

```
git clone https://gitee.com/ruinb0w/uni-template.git
cd uni-template
npm i
```

### 开发

```
npm run dev:mp-weixin // 开发小程序
npm run dev:h5 // 开发H5
```
> 开发时不要终止`npm run dev:mp-weixin`, 你代码的更改会自动同步到`项目/dist/dev/mp-weixin`

### 打包
```
npm run build: mp-weixin // 打包小程序
npm run build:h5 // 打包H5
```

## 小程序

1. 新的小程序项目需要手动用**微信开发者工具**导入项目(导入一次即可), 位置在`项目/dist/dev/mp-weixin`
2. 在manifest.json 中修改`/* 小程序特有相关 */`部分的appid
