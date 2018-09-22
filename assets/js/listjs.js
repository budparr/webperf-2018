if (ENVIRONMENT == 'production') {
  var documentLoad = "turbolinks:load";
} else {
  var documentLoad = "DOMContentLoaded";
}

document.addEventListener(documentLoad, function() {
  var List = require("list.js");
  var libraryFilters = {
    valueNames: ["title", "isbn", "author", "date", "genre"],
    listClass: "filteredlist"
  };
  var library = new List("filter", libraryFilters);
});
