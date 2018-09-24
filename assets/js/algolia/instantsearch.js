import instantsearch from 'instantsearch.js';

// import widgets individually
import { searchBox } from 'instantsearch.js/es/widgets';
import { stats } from 'instantsearch.js/es/widgets';
import { clearAll } from 'instantsearch.js/es/widgets';
import { refinementList } from 'instantsearch.js/es/widgets';
import { hits } from 'instantsearch.js/es/widgets';
import { pagination } from 'instantsearch.js/es/widgets';

// import templates
import hitTemplate from './templates/hits-listed-content.html';
import noResultsTemplate from './templates/no-results.html';
import queryResultsTemplate from './templates/query-results.html';
import hitsToolsTemplate from './templates/hits-tools.html';

if (ENVIRONMENT == 'production') {
	var documentLoad = 'turbolinks:load';
} else {
	var documentLoad = 'DOMContentLoaded';
}


document.addEventListener(documentLoad, function() {
	var search = instantsearch({
		appId: 'APPID',
		apiKey: 'APIKEY',
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
			container: '#searchbox',
			autofocus: false,
			poweredBy: false,
			placeholder: 'Search Authors and Books',
			magnifier: false,
			reset: false
		})
	);
	search.addWidget(
		searchBox({
			container: '#searchbox2',
			autofocus: false,
			poweredBy: false,
			placeholder: 'Search Authors and Books',
			magnifier: false,
			reset: false
		})
	);

	search.addWidget(
		stats({
			container: '#stats',
			templates: {
				body: queryResultsTemplate
			}
		})
	);

	// search.addWidget(
	//   clearAll({
	//     container: "#clear-all",
	//     templates: {
	//       link: "Reset",
	//     },
	//     autoHideContainer: true,
	//     clearsQuery: true,
	//     cssClasses: {
	//       link:
	//         "inline-block px-3 py-1 no-underline rounded-t text-white text-sm bg-grey",
	//     },
	//   })
	// )

	search.addWidget(
		refinementList({
			container: '#sections',
			attributeName: 'Section',
			operator: 'and',
			limit: 100,
			collapsible: { collapsed: true },
			cssClasses: {
				item: 'inline-block mr-3 my-2 text-sm',
				list: 'nav nav-list',
				count: 'badge pull-right',
				active: 'active'
			}
		})
	);

	search.addWidget(
		hits({
			hitsPerPage: 5,
			container: '#hits',
			collapsible: true,
			templates: {
				empty: noResultsTemplate,
				item: hitTemplate
			}
		})
	);

	// initialize pagination
	search.addWidget(
		pagination({
			container: '#pagination',
			maxPages: 100,
			// default is to scroll to 'body', here we disable this behavior
			scrollTo: true
		})
	);

	search.start();
	// console.log("instantsearch Has been loaded")
	// document.addEventListener("DOMContentLoaded", function() {})
});
