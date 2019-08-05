function toggleActivation(code) {
    $.ajax({
        url: window.App.siteUrl+'pertanyaan/kuesioner5c/toggle_activation/'+code,
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