/**
 * Created by wathmal on 11/30/16.
 */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './../webpack.config.js';
import Api from './api';


const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("node env: "+ process.env.NODE_ENV);

if(process.env.NODE_ENV == 'development') {
    const compiler = webpack(config);
    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
}

app.use('/api', Api );
app.get('*', function response(req, res) {

    res.sendFile(path.join(__dirname, 'index.html'));
});

const port= process.env.PORT || 3000;
app.listen(port);