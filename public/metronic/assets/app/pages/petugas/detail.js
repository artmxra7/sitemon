initSelectTipePetugas();

jQuery(document).ready(function() {
    initSelect2('#select2_witel', '~ Pilih witel');
    $(document).on("click", "#foto-ktp", function () {
        var image = $(this).data('src');
        $(".modal-body #image").attr("src", image);
    });
});

function initSelectTipePetugas() {
    var selectTipePetugas = '#selectTipePetugas';

    autoSelectTipePetuags();

    initSelect2('#regional select', '- Pilih Regional -');
    initSelect2('#witel select', '- Pilih Witel -');
    initSelect2('#petugasPK select', '- Pilih Hak Akses -');
    initSelect2('#petugasBL select', '- Pilih Jawaban -');

    function autoSelectTipePetuags() {
        var value = $(selectTipePetugas).data('selected');
        showTipePetugasChild(value);
    }

    $(selectTipePetugas).on('change', function() {
        var value = $(this).val();
        showTipePetugasChild(value);
    });

    function showTipePetugasChild(tipe) {
        $(selectTipePetugas).val(tipe);

        if ($(selectTipePetugas).length) {
            $('.tipePetugasChild').hide();
        }

        switch (tipe) {
            case 'PUSAT':
                $('#petugasBL').show();
                break;
            case 'REGIONAL':
                $('#regional').show();
                $('#petugasBL').show();
                break;
            case 'WITEL':
                $('#witel').show();
                $('#petugasPK').show();
                $('#petugasBL').show();
                break;
        }
    }
}
