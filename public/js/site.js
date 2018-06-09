const sidenav = require("./sidenav");
const omnisearch = require("./components/omnisearch");
const axios = require("axios");

document.addEventListener("DOMContentLoaded", function() {
  sidenav.init();
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(res => omnisearch(res.data.map(post => post.title)));
});
