/**
 * Created by wathmal on 11/30/16.
 */
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import config from './../webpack.config.js';
import Api from './api';
import OG from './services/OpenGraph';

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("node env: "+ process.env.NODE_ENV);

/*if(process.env.NODE_ENV != 'production') {
    const compiler = webpack(config);
    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));    
}*/

app.use('/api', Api );
app.get('*', function response(req, res) {

    const reqPath = req.path;
    let metaHTML="";
    switch (reqPath) {
        case '/':

            let og= new OG("wireme iot platform", "http://wireme.projects.mrt.ac.lk/images/landing/nemesis.jpg", "a RIDICULOUSLY easy IoT platform with zero coding");
            metaHTML = og.generateMeta();
            break;
        case '/dashboard':
            let og= new OG("wireme - dashboard", "http://wireme.projects.mrt.ac.lk/images/landing/dashboard-mac.png", "monitor, control your wireme gadgets from anywhere in the world");
            metaHTML = og.generateMeta();
            break;

        case '/quickstart':
            let og= new OG("wireme - quick start", "http://wireme.projects.mrt.ac.lk/images/tutorial/quickstart/dashboard_on_tab.jpg", "quick start guide for wireme IoT platform");
            metaHTML = og.generateMeta();
            break;
    }

    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function (err, file) {
        if (err) {
            return console.log(err);
        }
        const document = file.replace(/<meta \/>/, metaHTML);
        res.send(document);
    });

    // res.sendFile(path.join(__dirname, 'index.html'));
});

const port= process.env.PORT || 3000;
app.listen(port);