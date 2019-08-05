function setApprovalType(type) {
    $('#formApprovalStatus input[name="approval_type"]').val(type);
}

function initMap(elSelector, elAddressSelector, cordinatData) {
    if ($(elSelector).html()) return false;

    var map = new GMaps({
        div: elSelector,
        lat: cordinatData.lat,
        lng: cordinatData.lng,
    });

    map.addMarker({
        lat: cordinatData.lat,
        lng: cordinatData.lng,
        title: 'You are here.',
    });

    map.setZoom(10);

    setAddress(elAddressSelector, cordinatData);
}

function setAddress(elSelector, cordinatData) {
    if ($(elSelector).val()) return false;

    $.ajax({
            type: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + cordinatData.lat + ',' + cordinatData.lng + '&key=' + pageData.googleApiKey,
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

$(document).ready(function () {
    $('.show_image').click(function () {
        var image = $(this).data('src');
        $(".modal-body #image").attr("src", image);
    });

});

jQuery(document).ready(function () {
    initMap('#map-lokasi-ob', '#map-address-ob', pageData.cordinatOb);
    $('a[data-toggle="tab"][href="#lokasi"]').on('shown.bs.tab', function () {
        initMap('#map-lokasi', '#map-address', pageData.cordinatSurvey);
    });
    // $('a[data-toggle="tab"][href="#lokasi-ob"]').on('shown.bs.tab', function() {
    // });
});