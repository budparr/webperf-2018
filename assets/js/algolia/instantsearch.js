import instantsearch from 'instantsearch.js/es';

// import widgets individually
import { searchBox } from 'instantsearch.js/es/widgets';
import { stats } from 'instantsearch.js/es/widgets';
import { clearAll } from 'instantsearch.js/es/widgets';
import { refinementList } from 'instantsearch.js/es/widgets';
import { hits } from 'instantsearch.js/es/widgets';
import { pagination } from 'instantsearch.js/es/widgets';


if (process.env.NODE_ENV == 'production') {
	var documentLoad = 'turbolinks:load';	
} else {
	var documentLoad = 'DOMContentLoaded';
}


document.addEventListener(documentLoad, function() {
	var search = instantsearch({
		appId: 'MLMX67K73T',
		apiKey: '1e6569c09a7576db43cde699cba46cde',
		indexName: 'all_content',
		urlSync: false,
		urlSync: {
			getHistoryState: function() {
				return {
					turbolinks: true
				};
			}
		},
		searchFunction: function(helper) {
			var searchResults = document.getElementById('results');
			var b = document.getElementsByTagName('BODY')[0];
			if (helper.state.query === '') {
				// searchResults.hide()
				searchResults.classList.add('results-hidden');
				b.classList.remove('search-displayed');
				console.log('No Query');
				return;
			}
			helper.search();
			// searchResults.show()
			console.log('query: ' + helper.state.query);
			searchResults.classList.remove('results-hidden');

			b.classList.add('search-displayed');
		}
	});

	search.addWidget(
		searchBox({
			container: '#search-box',
			autofocus: false,
			poweredBy: true,
			placeholder: 'Search Articles',
			magnifier: false,
			reset: false
		})
	);
	
	search.addWidget(
		hits({
			hitsPerPage: 5,
			container: '#hits',
			collapsible: true,
			templates: {
				empty: 'No results',
				item: function(data) {
						return '<div class="my-4"><div class="text-xl text-black mb2">' + data.Section + '</div><a href="' + data.ref + '" class="no-underline font-brand hover:text-grey-dark text-2xl text-black mb-3">' + data.title + '</a></div>'
					}
			},
		})
	);

	
	search.start();
	// console.log("instantsearch Has been loaded")
	// document.addEventListener("DOMContentLoaded", function() {})
});
