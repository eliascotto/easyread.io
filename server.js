"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _compression = _interopRequireDefault(require("compression"));

var _request = _interopRequireDefault(require("request"));

var _readability = _interopRequireDefault(require("readability"));

var _jsdom = require("jsdom");

var _jsBeautify = _interopRequireDefault(require("js-beautify"));

var _urlRegex = _interopRequireDefault(require("url-regex"));

var _expressSlowDown = _interopRequireDefault(require("express-slow-down"));

var _helmet = _interopRequireDefault(require("helmet"));

var _next = _interopRequireDefault(require("next"));

// LOAD ENV FILES
_dotenv["default"].config();

var dev = process.env.NODE_ENV !== 'production';
var app = (0, _next["default"])({
  dev: dev
});
var handle = app.getRequestHandler();
var port = process.env.PORT || 3000;
var speedLimiter = (0, _expressSlowDown["default"])({
  windowMs: 1 * 60 * 1000,
  // 1 minute
  delayAfter: 20,
  // allow 30 requests per 1 minute, then...
  delayMs: 500 // begin adding 500ms of delay per request

});

var validateArticleReq = function validateArticleReq(req, res, next) {
  var _req$body = req.body,
      action = _req$body.action,
      url = _req$body.url;

  if (action !== 'extract') {
    return res.status(400).send({
      'error': 'Invalid action parameter value'
    });
  }

  if (typeof url !== 'string' || !(0, _urlRegex["default"])({
    strict: true
  }).test(url)) {
    return res.status(400).send({
      'error': 'Invalid url parameter value'
    });
  }

  next();
};

var readPage = function readPage(url, callback) {
  (0, _request["default"])(url, function (err, res, body) {
    if (err) {
      return callback(err, null);
    }

    body = body.toString();
    var doc = new _jsdom.JSDOM(body, {
      url: url
    });
    var article = new _readability["default"](doc.window.document).parse();
    callback(null, article);
  });
};

var fixArticle = function fixArticle(url, article) {
  var urlObj = new URL(url);

  if (urlObj.host === 'medium.com') {
    var doc = new _jsdom.JSDOM(article.content, {
      url: url
    });
    var imgs = doc.window.document.querySelectorAll('img');
    imgs.forEach(function (element) {
      var width = element.getAttribute('width');
      var src = element.getAttribute('src');

      if (width && src) {
        var newSrc = src.replace(/(max\/)\d+/g, "max/".concat(width * 2));
        element.setAttribute('src', newSrc);
      }
    });
    return doc.serialize();
  }

  return article.content;
};

app.prepare().then(function () {
  var server = (0, _express["default"])();
  server.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

  server.use((0, _compression["default"])());
  server.use((0, _helmet["default"])());
  server.use(speedLimiter);
  server.use((0, _cors["default"])());
  server.use(_express["default"].json());
  server.post('/api/article', function (req, res) {
    var _req$body2 = req.body,
        action = _req$body2.action,
        url = _req$body2.url;

    if (action == 'extract') {
      readPage(url, function (err, article) {
        if (err) {
          console.error(err);
          return res.status(500).send({
            'error': 'Parser error'
          });
        }

        article.content = fixArticle(url, article);

        var beautyHtml = _jsBeautify["default"].html(article.content, {
          'indent_size': '2',
          'indent_char': ' ',
          'max_preserve_newlines': '-1',
          'preserve_newlines': false
        });

        res.json({
          title: article.title.trim(),
          content: beautyHtml,
          url: url
        });
      });
    }
  });
  server.get('/', function (req, res) {
    return app.render(req, res, '/', req.query);
  });
  server.get('/read', function (req, res) {
    return app.render(req, res, '/read', req.query);
  });
  server.all('*', function (req, res) {
    return handle(req, res);
  });
  server.listen(port, function () {
    console.log("App listening on port: ".concat(port));
  });
});

