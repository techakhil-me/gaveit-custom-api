// index.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const amazonScraper = require("amazon-buddy");

//  https://2pxne.sse.codesandbox.io/gaveit/search?keyword=keyboard
const searchProducts = async (keyword, req, res) => {
  //  Collect 50 products from a keyword 'xbox one' from Amazon.NL
  let products = await amazonScraper.products({
    keyword: keyword,
    number: 20,
    country: "IN"
  });

  await res.json(products);
};

//  https://2pxne.sse.codesandbox.io/gaveit/product?asin=B07WDKLZPN
const productDetails = async (asin, req, res) => {
  // Collect 10 reviews from a product ID B01GW3H3U8
  let reviews = await amazonScraper.reviews({
    asin: asin,
    number: 10,
    country: "IN"
  });

  // Get single product details by using ASIN id
  let product_by_asin = await amazonScraper.asin({
    asin: asin,
    country: "IN"
  });

  let product_details = await {
    product: product_by_asin.result[0],
    reviews: reviews
  };
  await res.json(product_details);
};

app.get("/gaveit/:id", (req, res) => {
  var id = req.params.id;
  if (id === "search") {
    searchProducts(req.query.keyword, req, res);
  } else if (id === "product") {
    productDetails(req.query.asin, req, res);
  } else {
    res.json({ message: "Looks good to me!" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
