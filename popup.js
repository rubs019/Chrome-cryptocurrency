// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', () => {

    let limit = 10;
    let convert = 'EUR';
    const settings = {
      'async': true,
      'crossDomain': true,
      'url': 'https://cryptocurrency-net.herokuapp.com/',
      'method': 'GET',
      'data': {
        'limit' : limit,
        'convert': convert
      },
      'headers': {}
    }

    $.ajax(settings).done((response) => {
        // TODO : Gérer en cas d'erreur
      setItem(response);

      $('.currency').on('click', (currencyElem) => {
            currencyID = currencyElem.currentTarget.id.split('"')[0];

            goToCurrency(currencyID);

            flashMessage('A new tabs was open !', 'orange')
        });
    });
    
});

chrome.tabs.onCreated.addListener((cb) => {
  console.log('Wow ! A new tab was created');
})

function setItem(response) {
    list = document.getElementById('list');
    tab = $('#stats_tbody');

    tab.empty();

    (response.map((res) => {
        tab.append('<tr>' +
            '<td class="currency" id='+ res.id +'">'+ res.name+' ('+ res.symbol +')</td>' +
            '<td>'+ res.price_usd +'</td>' +
            '<td>'+ res.price_btc +'</td></tr>'
        );
    }));
}

function goToCurrency(id) {
    chrome.tabs.create({
      'active': false,
      'url': 'https://www.coinmarketcap.com/currencies/' + id
    })
}

function flashMessage(msg, color = 'black', time = 3000) {
    $('#flashMessage').text(msg).css('color', color).show();

    setTimeout(() => {
        $('#flashMessage').hide()
    }, time)
}