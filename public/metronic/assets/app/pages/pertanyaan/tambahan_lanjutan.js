function togglePertanyaanActivation(code) {
    $.ajax({
        url: window.App.siteUrl+'pertanyaan/lanjutan/toggle_pertanyaan_activation/'+code,
    })
    .done(function(response) {
        if (response.responseStatus) {
            swal(
                'Berhasil!',
                response.responseMessage,
                'success'
            );
        }
        else {
            swal(
                'Gagal!',
                response.responseMessage,
                'warning'
            );
        }
    });
}

function togglePilihanActivation(code) {
    $.ajax({
        url: window.App.siteUrl+'pertanyaan/lanjutan/toggle_pilihan_activation/'+code,
    })
    .done(function(response) {
        if (response.responseStatus) {
            swal(
                'Berhasil!',
                response.responseMessage,
                'success'
            );
        }
        else {
            swal(
                'Gagal!',
                response.responseMessage,
                'warning'
            );
        }
    });
}