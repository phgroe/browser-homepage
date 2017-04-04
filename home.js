var searchField = document.getElementById('ftdSearchField');
var detectOutlook = /^.+safelinks.protection.outlook.com\/\?url=(.+)&data=.+$/;
var detectLink = /^https?:\/\/.+$/;

function handleSearchOnPaste(ev) {
  if (ev.clipboardData) {
    handlePaste(ev.clipboardData.getData('text/plain'));
  }
  else {
    setTimeout(function() {
      handlePaste(searchField.value);
    }, 100);
  }
}

searchField.addEventListener('paste', handleSearchOnPaste);

function handlePaste(text) {
  if (detectOutlook.test(text)) {
    handleOpenOutlookSafeLink(text);
  }
}

function handleOpenOutlookSafeLink(text) {
  var plainLink = decodeURIComponent(text.replace(detectOutlook, '$1'));
  if (detectLink.test(plainLink)) {
    window.location = plainLink;
  }
  else {
    searchField.value = '';
  }
}
