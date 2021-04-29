# 部署
# 编译
npm run build

# 打包
rm build.zip
zip -r -o 'build.zip' ./build

# 上传
scp build.zip crmserver:~
