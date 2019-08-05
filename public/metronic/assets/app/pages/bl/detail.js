function initMap(elSelector, elAddressSelector) {
    if ($(elSelector).html()) return false;

    var map = new GMaps({
        div: elSelector,
        lat: pageData.lat,
        lng: pageData.lng,
    });

    map.addMarker({
        lat: pageData.lat,
        lng: pageData.lng,
        title: 'You are here.',
    });

    map.setZoom(10);

    setAddress(elAddressSelector);
}

function setAddress(elSelector) {
    if ($(elSelector).val()) return false;

    $.ajax({
            type: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pageData.lat + ',' + pageData.lng + '&key=' + pageData.googleApiKey,
        })
        .done(function (response) {
            if (response.status == 'OK') {
                var results = response.results;
                if (typeof results[0] != 'undefined') {
                    $(elSelector).text(results[0].formatted_address);
                }
            }
        });
}

jQuery(document).ready(function () {
    initMap('#map-lokasi-ob', '#map-address-ob');
    // $('a[data-toggle="tab"][href="#lokasi-ob"]').on('shown.bs.tab', function() {
    // })
});