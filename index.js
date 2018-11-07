const cheerio = require('cheerio');
const curl = new (require( 'curl-request' ))();

curl.get('https://www.musiciansfriend.com/stupid')
  .then(({statusCode, body, headers}) => {
    const $ = cheerio.load(body);

    const product = $('.feature-title h2 a').text();
    const description = $('.feature-description').text();
    const regularPrice = $('.regular-price').text();
    const savings = $('.feature-save .formatted-price').text();
    const price = $('.feature-price .formatted-price').text();

    if (!product) {
      return;
    }

    const postBody = `
      # ${product}\n${description}\n\nRegular Price: ${regularPrice}\nSavings: ${savings}\n\n**${price}**\n\n[http://musiciansfriend.com/stupid](http://musiciansfriend.com/stupid)
    `;
    
    console.log(postBody);
  }).catch(e => console.log(e));
