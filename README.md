## 启动数据库

```
//mac 或者 linux 使用：
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

//windows toolbox 使用：
docker run --network=host -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 清空之前的开发环境

```
docker kill <id>
docker rm <id>

//mac
rm -rf blog-data
//windows
docker container prune
docker volume rm blog-data
```

## 创建数据库

```
docker exec -it <id> bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表

首先修改 ``ormconfig.json`` 中的 host，然后运行

```
yarn m:run
node dist/seed.js
```

## 开发

```bash
yarn dev
// or
npm dev
```

## 部署
```bash
yarn install --production=false
yarn build
docker build . -t wbh-blog/node-web-app
docker run --network=host -p 3000:3000 -d wbh-blog/node-web-app
```
