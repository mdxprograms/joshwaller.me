require("./styles.scss");

module.exports = collection => {
  // main selectors
  this.selector = document.querySelector("[data-omnisearch]");
  this.searchInput = document.createElement("input");
  this.searchResults = document.createElement("ul");
  this.reset = document.createElement("a");

  this.state = {
    results: [],
    value: ""
  };

  const updateSearch = value => {
    return (this.state.value = value);
  };

  const filterResults = value => {
    return collection.filter(v => v.includes(value));
  };

  const updateResults = results => {
    return (this.state.results = results);
  };

  const resetSearch = () => {
    this.state.value = "";
    this.state.results = [];
    this.searchResults.innerHTML = "";
    this.searchInput.value = "";
    this.reset.parentNode.removeChild(this.reset);
    this.searchInput.focus();
  };

  this.searchInput.placeholder = "Search...";

  this.reset.innerHTML = "Reset";
  this.reset.addEventListener("click", resetSearch);

  this.searchInput.addEventListener("keyup", e => {
    updateResults(filterResults(updateSearch(e.target.value)));

    if (this.state.results.length > 0 && this.searchInput.value.length >= 1) {
      this.searchResults.innerHTML = this.state.results
        .slice(0, 5)
        .map(result => {
          return `<li>${result}</li>`;
        })
        .join("");
      this.selector.append(this.searchResults);
      this.selector.append(this.reset);
    } else {
      this.searchResults.innerHTML = "";
      this.reset.parentNode.removeChild(this.reset);
    }
  });

  this.selector.append(this.searchInput);
};
