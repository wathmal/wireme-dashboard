# wireme dashboard

## development
dependencies
```
sudo npm install -g babel-cli webpack babel-core bower
```

running
```bash
npm install
bower install
npm start
# run this on another terminal tab
webpack --watch --progress
```
run `webpack` command in another terminal in order to watch for changes.

visit `http://localhost:3000`.

### meta tags
**server side rendering** is not fully implemented yet (see **SSR** branch). so till then meta tags are handles by `server.js`
after defining a new route, add `meta` tags in `server.js`.
```js
switch (reqPath) {
    ...
    case '/quickstart':
        og= new OG("wireme - quick start", "http://wireme.projects.mrt.ac.lk/images/tutorial/quickstart/dashboard_on_tab.jpg", "quick start guide for wireme IoT platform");
        metaHTML = og.generateMeta();
        break;
}
```

mqtt details:
```
host: wireme.projects.mrt.ac.lk: 8883
user: test
pass: test123
```

## production
* you should have installed and configured `PM2` to auto start.
* bind nodejs to run on port 80.

follow below steps
```
# keep environment on development mode when running these
npm run build-server
webpack -p --config webpack.config.production.js --progress
pm2 start pm2_process.json
```
