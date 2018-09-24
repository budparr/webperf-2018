const search = instantsearch({
  appId: 'MLMX67K73T',
  apiKey: '1e6569c09a7576db43cde699cba46cde',
  indexName: 'all_content',
  routing: false,
  searchFunction: function(helper) {
    var searchResults = ('#hits');
    if (helper.state.query === '') {
      searchResults.hide();
      return;
    }
    helper.search();
    searchResults.show();
  }
});


// initialize SearchBox
search.addWidget(
instantsearch.widgets.searchBox({
  container: '#search-box',
  placeholder: 'Search for products'
})
);

// initialize hits widget
search.addWidget(
instantsearch.widgets.hits({
  container: '#hits',

  templates: {
    empty: 'No results',
    item: function(data) {
        return '<div class="my-4"><div class="text-xl text-black mb2">' + data.Section + '</div><a href="' + data.ref + '" class="no-underline font-brand hover:text-grey-dark text-2xl text-black mb-3">' + data.title + '</a></div>'
      }
  },
  escapeHits: true,
  transformItems: items => items.map(item => item),
})
);

search.start();