function handleClick(element){
    var witelId = element.value;
    var status = element.checked ? 1 : 0 ;
    var statusCallback = element.checked;

    $.ajax({
        url: window.App.siteUrl + '/regional/ajax_set_status_ambil_data',
        method: 'PUT',
        data: {
            witel_id: witelId,
            status: status,
        },
        beforeSend: function() {
            mApp.blockPage({
            overlayColor: "#000000",
            opacity: 0.29,
            type: "loader",
            state: "success",
            message: "Memproses... "
            });
        },
    })
    .done((response) => {
        mApp.unblockPage();
            if(response.status){
                swal(
                    'Berhasil!',
                    response.msg,
                    'success'
                );
            } else {
                $('input[value='+witelId+']').prop('checked',statusCallback ? false : true );
                swal(
                    'Gagal!',
                    response.msg,
                    'warning'
                );
            }
    });
}