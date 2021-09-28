document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('btn-yandex').addEventListener('click', function() { chrome.tabs.create({url:'https://yandex.ru/dev/maps/'}); });
	document.getElementById('btn-bootstrap').addEventListener('click', function() { chrome.tabs.create({url:'https://getbootstrap.com/'}); });
	document.getElementById('btn-git').addEventListener('click', function() { chrome.tabs.create({url:'https://github.com/KostKP'}); });
	
	BindSettings();
	TranslatePage();
	ExeFilters();
});

function TranslatePage() {
	document.getElementById('default-loc-enabld').parentElement.children[1].innerText = chrome.i18n.getMessage("uiSettingsUseDefaultLoc");
	document.getElementById('default-latitude').parentElement.children[0].innerText = chrome.i18n.getMessage("uiSettingsDefaultLatitude");
	document.getElementById('default-longitude').parentElement.children[0].innerText = chrome.i18n.getMessage("uiSettingsDefaultLongitude");
	document.getElementById('default-zoom-enabld').parentElement.children[1].innerText = chrome.i18n.getMessage("uiSettingsUseDefaultZoom");
	document.getElementById('default-zoom-enabld').parentElement.parentElement.children[1].innerText = chrome.i18n.getMessage("uiSettingsDefaultZoomValue");
	document.getElementById('filters-enabld').parentElement.children[1].innerText = chrome.i18n.getMessage("uiSettingsUseFilters");
	document.getElementById('filters-enabld').parentElement.children[1].innerText = chrome.i18n.getMessage("uiSettingsUseFilters");
	document.getElementById('filters-enabld').parentElement.parentElement.children[1].innerText = chrome.i18n.getMessage("uiSettingsFiltersGrayscale");
	document.getElementById('filters-enabld').parentElement.parentElement.children[3].innerText = chrome.i18n.getMessage("uiSettingsFiltersInvert");
	document.body.children[0].children[3].children[0].children[0].innerText = chrome.i18n.getMessage("uiSettingsAboutProject");
}

function ExeFilters() {
	if (document.getElementById("filters-enabld").checked) {
		document.getElementById("filter").style.filter="grayscale("+document.getElementById('grayscale-intensity').value+"%) invert("+document.getElementById('invert-intensity').value+"%)";
	} else {
		document.getElementById("filter").style.filter="grayscale(0%) invert(0%)";
	}
}

function BindSettings() {
	for (const $option of document.querySelectorAll('.option')) {
		($option.type && $option.type === 'checkbox') ? $option.checked = localStorage[$option.id] === 'true' : $option.value = localStorage[$option.id];
		$option.addEventListener('change', function() {SyncAll($option)});
		if ($option.type && $option.type == 'range') {
		$option.parentElement.parentElement.getElementsByClassName('value-label')[0].innerText = $option.value;
		}
	}
}

function SyncAll($option) {
	if ($option.type && $option.type == 'range') {
		$option.parentElement.parentElement.getElementsByClassName('value-label')[0].innerText = $option.value;
	}
	if ($option.id == 'filters-enabld' || $option.id == 'grayscale-intensity' || $option.id == 'invert-intensity') ExeFilters();
	else if ($option.id == 'default-latitude' & (!$option.value || $option.value < -90 || $option.value > 90)) $option.value = 82.920430;
	else if ($option.id == 'default-longitude' & ($option.value === null || $option.value < -180 || $option.value > 180)) $option.value = 55.030204;
	
	($option.type && $option.type === 'checkbox') ? localStorage[$option.id] = $option.checked : localStorage[$option.id] = $option.value;
}