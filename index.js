
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

  console.log(product);
  console.log(description);
  console.log(regularPrice);
  console.log(savings);
  console.log(price);

  const postBody = `
  # ${product}
  
  ${description}
  
  ${regularPrice}
  ${savings}

  **${price}**
  `;

})
.catch((e) => {
    console.log(e);
});

