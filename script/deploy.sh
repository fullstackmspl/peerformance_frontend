#
#The build folder is ready to be deployed.
#You may serve it with a static server:
#
#  npm install -g serve
#  serve -s build

npm i
npm install -g serve
npm install pm2@latest -g
sudo npm run build
pm2 serve build 3000
