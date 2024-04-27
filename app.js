const express = require('express');
const app = express();
const port = 3000;
const amazonRoute = require('./src/routes/scraper.routes');

app.use(express.static('.'));
app.use(amazonRoute);
app.use('/api/scrape', amazonRoute);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;