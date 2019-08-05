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

jQuery(document).ready(function () {
    initDatePicker('#tglPenerima');
    initDatePicker('#tglProposal');
    initDatePicker('#tglKegiatan');
    initDatePicker('#periode_kegiatan_start');
    initDatePicker('#periode_kegiatan_end');

    $('select[name=pengelola_dana_witel],select[name=pelaksana_keg_witel],select[name=kota_id_smartfunding], #kotaOb').css('pointer-events', 'none');

    $('#ketentuan_proposal,#kredebilitas,#ketersediaan,#keterkaitan').change(function (event) {
        event.preventDefault();
        var ketentuan_proposal = parseFloat($('#ketentuan_proposal').val()) * 10 / 100;
        var kredebilitas = parseFloat($('#kredebilitas').val()) * 40 / 100;
        var ketersediaan = parseFloat($('#ketersediaan').val()) * 35 / 100;
        var keterkaitan = parseFloat($('#keterkaitan').val()) * 15 / 100;
        $('#val_ketentuan_proposal').html(ketentuan_proposal);
        $('#val_kredebilitas').html(kredebilitas);
        $('#val_ketersediaan').html(ketersediaan);
        $('#val_keterkaitan').html(keterkaitan);

        var total = ketentuan_proposal + kredebilitas + ketersediaan + keterkaitan;

        $('#total').html(total).css("font-weight", "bold");

        if (total < 3) {
            $('#status').val('Tolak');
            $('#keterangan').val('Data tetap di proposal dengan status tolak & revisi');
        } else if (total >= 3 && total <= 3.67) {
            $('#status').val('Tolak');
            $('#keterangan').val('Data tetap di proposal dengan status tolak & revisi');
        } else if (total >= 3.68 && total <= 4.33) {
            $('#status').val('Lanjut');
            $('#keterangan').val('Data akan pindah ke menu survey BL');
        } else if (total >= 4.34 && total <= 5) {
            $('#status').val('Lanjut');
            $('#keterangan').val('Data akan pindah ke menu survey BL');
        }
    });

    $("select.provinsi").change(function () {
        var selectedProvinsi = $(".provinsi option:selected").val();
        $.ajax({
            type: "POST",
            url: window.App.siteUrl + 'proposal_bl/proposal/ajaxKota',
            data: {
                prov_id: selectedProvinsi
            }
        }).done(function (data) {
            $("#kota").html(data);
        });
    });

    $("#provOb").change(function () {
        var selectedProvinsi = $("option:selected", $(this)).val();
        $.ajax({
            type: "POST",
            url: window.App.siteUrl + 'proposal_bl/proposal/ajaxKota',
            data: {
                prov_id: selectedProvinsi
            }
        }).done(function (data) {
            $("#kotaOb").html(data).css('pointer-events', 'unset');
        });
    });

    $("select.pelaksana").change(function () {
        var selected = $(".pelaksana option:selected").val();
        $.ajax({
            type: "POST",
            url: window.App.siteUrl + 'proposal_bl/proposal/ajaxWitelPelaksana',
            data: {
                divre_id: selected
            }
        }).done(function (data) {
            $("#pelaksana").html(data);
        });
    });

    $("select.pengelola").change(function () {
        var selected = $(".pengelola option:selected").val();
        $.ajax({
            type: "POST",
            url: window.App.siteUrl + 'proposal_bl/proposal/ajaxWitelPengelola',
            data: {
                divre_id: selected
            }
        }).done(function (data) {
            $("#pengelola").html(data);
        });
    });
});
