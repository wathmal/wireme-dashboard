/**
 * Created by wathmal on 11/30/16.
 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './../webpack.config.js';

const app = express();
const compiler = webpack(config);

app.use(express.static(__dirname + '/public'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get('*', function response(req, res) {

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);