const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const userAgentList = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1',
  ];
  
  // Fetches the Amazon page for a given keyword
  async function fetchAmazonPage(keyword) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Choose a random User-Agent
    const userAgent = userAgentList[Math.floor(Math.random() * userAgentList.length)];
  
    try {
      const response = await axios.get(`https://www.amazon.com/s?k=${keyword}`, {
        headers: {
          'User-Agent': userAgent
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch Amazon page: ${error}`);
      return '';
    }
  }
  
  // Parses the product details from the HTML of an Amazon page
  function parseProductDetails(html) {
    const $ = cheerio.load(html);
    const productDetails = [];
  
    $('.s-result-item').each((index, element) => {
      const fullTitle = $(element).find('.a-link-normal .a-text-normal').text();
        const title = fullTitle.length > 100 ? fullTitle.substring(0, 100) + '...' : fullTitle;
      const rating = $(element).find('.a-icon-star-small .a-icon-alt').text();
      let reviewCount = $(element).find('.a-link-normal .a-size-base').text();
      const imageUrl = $(element).find('.a-link-normal .s-image').attr('src');
      const productLink = $(element).find('.a-link-normal.a-text-normal').attr('href');
      reviewCount = reviewCount.replace(/[^\d,].*$/, '');
      // Only products with title, rating, reviewCount, image and productLink will be scrapped
      if (title && rating && reviewCount && imageUrl && productLink) {
        productDetails.push({
          title,
          rating,
          reviewCount,
          imageUrl,
          productLink: `https://www.amazon.com${productLink}`
        });
      }
    });
  
    return productDetails;
  }

  exports.get = async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: 'The keyword cannot be empty' });
    }
  
    const html = await fetchAmazonPage(keyword);
    if (!html) {
      return res.status(500).json({ error: 'Failed to scrape Amazon' });
    }
  
    const productDetails = parseProductDetails(html);
    res.json(productDetails);
  };
  
  // Serve the index.html file
  exports.getHtml = (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/index.html'));
  };