function togglePertanyaan1Activation(code) {
    $.ajax({
        url: window.App.siteUrl+'pertanyaan/klasterisasi/toggle_pertanyaan1_activation/'+code,
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

function togglePilihan1Activation(code) {
    $.ajax({
        url: window.App.siteUrl+'pertanyaan/klasterisasi/toggle_pilihan1_activation/'+code,
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

function togglePertanyaanActivation(code) {
    $.ajax({
        url: window.App.siteUrl+'pertanyaan/klasterisasi/toggle_pertanyaan_activation/'+code,
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
        url: window.App.siteUrl+'pertanyaan/klasterisasi/toggle_pilihan_activation/'+code,
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