const sidenav = require('./sidenav');
const omnisearch = require('./components/omnisearch');

document.addEventListener("DOMContentLoaded", function() {
  sidenav.init();
  omnisearch(["hello", "josh", "byo", "animalo", "orange", "banoana", "grapo"]);
});
