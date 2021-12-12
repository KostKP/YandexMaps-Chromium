var baseURL = 'https://yandex.ru/map-widget/v1/?';

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('searchQuery').placeholder = chrome.i18n.getMessage("uiSearchBox");
	chrome.tabs.executeScript({code: "window.getSelection().toString();"}, function(selection) {
		if (!(selection == null)) {
			if (selection[0].length <=64) {
				document.getElementById('searchQuery').value = selection[0];
			}
		}
	});
	
	if (localStorage['default-loc-enabld'] === 'true') {
		baseURL = baseURL + 'll=' + localStorage['default-longitude'] + ',' + localStorage['default-latitude'] + '&';
	}
	if (localStorage['default-zoom-enabld'] === 'true') {
		baseURL = baseURL + 'z=' + localStorage['default-zoom-value'] + '&';
	}
	
	document.getElementById('iMapFrame').src = baseURL;
	document.getElementById('btn-search').addEventListener('click', function() { SearchOnMap(); });
	document.getElementById('searchQuery').addEventListener("keyup", function(event) {
		if (event.keyCode === 13) SearchOnMap();
	});

	document.getElementById('btn-settings').addEventListener('click', function() { window.open('settings.html', '_self'); });
	
	ExeFilters();
});

function ExeFilters() {
	if (localStorage['filters-enabld'] === 'true') {
		document.getElementById("filter").style.filter="grayscale("+localStorage['grayscale-intensity']+"%) invert("+localStorage['invert-intensity']+"%)";
	} else {
		document.getElementById("filter").style.filter="grayscale(0%) invert(0%)";
	}
}

function SearchOnMap() {
	if (document.getElementById('searchQuery').value)
	document.getElementById('iMapFrame').src = baseURL + 'text=' + document.getElementById('searchQuery').value;
}
