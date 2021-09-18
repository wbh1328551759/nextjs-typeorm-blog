docker start 5985e5a2f860 &&
cd /home/blog/app &&
git pull origin main &&
yarn install --production=false &&
yarn build &&
git apply migrate.patch
yarn typeorm:build &&
yarn m:run &&
git reset --hard HEAD &&
docker build . -t wbh-blog/node-web-app &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d wbh-blog/node-web-app &&
echo 'OK!'
