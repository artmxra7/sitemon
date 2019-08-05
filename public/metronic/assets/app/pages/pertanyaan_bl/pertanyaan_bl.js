function toggleKriteriaActivation(code) {
    $.ajax({
            url: window.App.siteUrl + 'pertanyaan/bl/toggle_kriteria_activation/' + code,
        })
        .done(function (response) {
            if (response.responseStatus) {
                swal(
                    'Berhasil!',
                    response.responseMessage,
                    'success'
                );
            } else {
                swal(
                    'Gagal!',
                    response.responseMessage,
                    'warning'
                );
            }
        });
}

function toggleSubKriteriaActivation(code) {
    $.ajax({
            url: window.App.siteUrl + 'pertanyaan/bl/toggle_sub_kriteria_activation/' + code,
        })
        .done(function (response) {
            if (response.responseStatus) {
                swal(
                    'Berhasil!',
                    response.responseMessage,
                    'success'
                );
            } else {
                swal(
                    'Gagal!',
                    response.responseMessage,
                    'warning'
                );
            }
        });
}