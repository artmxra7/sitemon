function initMap(elSelector) {
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

    setAddress('#map-address');
}

function setAddress(elSelector) {
    if ($(elSelector).val()) return false;

    $.ajax({
        type: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +pageData.lat +','+ pageData.lng+ '&key='+pageData.googleApiKey,
    })
    .done(function(response) {
        if (response.status == 'OK') {
            var results = response.results;
            if (typeof results[0] != 'undefined') {
                $(elSelector).text(results[0].formatted_address);
            }
        }
    });
}

function autoFillDescFieldTemplate(context) {
    var descTemplate = '';

    switch ($(context).val()) {
        case 'Verifikasi':
            descTemplate = 'Selamat anda masuk ke daftar tunggu.';
        break;
        case 'Reject':
            descTemplate = 'Mohon maaf, belum layak untuk disurvey.';
        break;
    }

    $('textarea[name="desc"]').val(descTemplate);
}

jQuery(document).ready(function() {
    $('a[data-toggle="tab"][href="#lokasi"]').on('shown.bs.tab', function() {
        initMap('#map-lokasi');
    })
});
