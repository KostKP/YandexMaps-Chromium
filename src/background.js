PresetLoader(false);
/* Create a context-menu */
chrome.contextMenus.create({
	id: "EasyMap-browser-menu",
	title: chrome.i18n.getMessage("contextResetSettings"),
	contexts: ["browser_action"]
});

chrome.contextMenus.create({
	id: "EasyMap-selection-menu",
	title: chrome.i18n.getMessage("contextSearchOnMap"),
	contexts: ["selection"]
});

function PresetLoader(force) {
	if (localStorage.hasOwnProperty('default-loc-enabld') == false || force) { localStorage['default-loc-enabld'] = false; }
	if (localStorage.hasOwnProperty('default-zoom-enabld') == false || force) { localStorage['default-zoom-enabld'] = false; }
	if (localStorage.hasOwnProperty('filters-enabld') == false || force) { localStorage['filters-enabld'] = false; }
	if (localStorage.hasOwnProperty('default-zoom-value') == false || force) { localStorage['default-zoom-value'] = 1; }
	if (localStorage.hasOwnProperty('grayscale-intensity') == false || force) { localStorage['grayscale-intensity'] = 0; }
	if (localStorage.hasOwnProperty('invert-intensity') == false || force) { localStorage['invert-intensity'] = 0; }
	if (localStorage.hasOwnProperty('default-latitude') == false || force) { localStorage['default-latitude'] = 55.753220; }
	if (localStorage.hasOwnProperty('default-longitude') == false || force) { localStorage['default-longitude'] = 37.622513; }
}

function CreateURL(baseURL) {
	if (localStorage['default-loc-enabld'] === 'true') {
		baseURL = baseURL + 'll=' + localStorage['default-longitude'] + ',' + localStorage['default-latitude'] + '&';
	}
	if (localStorage['default-zoom-enabld'] === 'true') {
		baseURL = baseURL + 'z=' + localStorage['default-zoom-value'] + '&';
	}
	return baseURL;
}

/* Register a listener for the `onClicked` event */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == 'EasyMap-browser-menu') {
		PresetLoader(true);
	} else if (info.menuItemId == 'EasyMap-selection-menu') {
		chrome.tabs.create({url:CreateURL('https://yandex.ru/maps/?')+'text='+info.selectionText});		
	}
});