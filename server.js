import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import request from 'request';
import Readability from 'readability';
import { JSDOM } from 'jsdom';
import beautify from 'js-beautify';
import urlregex from 'url-regex';
import slowDown from 'express-slow-down';
import helmet from 'helmet';
import next from 'next';

// LOAD ENV FILES
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minute
  delayAfter: 20, // allow 30 requests per 1 minute, then...
  delayMs: 500 // begin adding 500ms of delay per request
});

const validateArticleReq = (req, res, next) => {
  const { action, url } = req.body;

  if (action !== 'extract') {
    return res.status(400).send({ 'error': 'Invalid action parameter value' });
  }

  if (typeof url !== 'string' || !urlregex({ strict: true }).test(url)) {
    return res.status(400).send({ 'error': 'Invalid url parameter value' });
  }

  next();
};

const readPage = (url, callback) => {
  request(url, (err, res, body) => {
    if (err) {
      return callback(err, null);
    }

    body = body.toString();

    const doc = new JSDOM(body, { url });
    const article = new Readability(doc.window.document).parse();
  
    callback(null, article)
  });
};

const fixArticle = (url, article) => {
  const urlObj = new URL(url);

  if (urlObj.host === 'medium.com') {
    const doc = new JSDOM(article.content, { url });
    const imgs = doc.window.document.querySelectorAll('img');

    imgs.forEach(element => {
      const width = element.getAttribute('width');
      const src = element.getAttribute('src');

      if (width && src) {
        const newSrc = src.replace(/(max\/)\d+/g, `max/${width * 2}`);
        element.setAttribute('src', newSrc);
      }
    });

    return doc.serialize();
  }

  return article.content;
};

app.prepare().then(() => {
  const server = express();

  server.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
  server.use(compression());
  server.use(helmet());
  server.use(speedLimiter);
  server.use(cors());
  server.use(express.json());

  server.post('/api/article', (req, res) => {
    const { action, url } = req.body;

    if (action == 'extract') {
      readPage(url, (err, article) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ 'error': 'Parser error' });
        }

        article.content = fixArticle(url, article);
    
        const beautyHtml = beautify.html(article.content, {
          'indent_size': '2',
          'indent_char': ' ',
          'max_preserve_newlines': '-1',
          'preserve_newlines': false,
        });

        res.json({
          title: article.title.trim(),
          content: beautyHtml,
          url: url,
        });
      });
    }
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  });

  server.get('/read', (req, res) => {
    return app.render(req, res, '/read', req.query)
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
});
