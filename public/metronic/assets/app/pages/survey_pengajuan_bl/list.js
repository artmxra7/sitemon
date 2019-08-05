var table;
var tableInstance;
function initTable(elSelector) {
    table = $(elSelector);

    // begin first table
    tableInstance = table.DataTable({
        responsive: true,
        searchDelay: 500,
        processing: true,
        serverSide: true,
        ajax: window.App.siteUrl+'survey_pengajuan_bl/list_datatable',
        columns: [
            {data: null, orderable: false, searchable: false},
            {data: 'kode_ob_simbl', orderable: false, searchable: false},
            {data: 'pendamping_name', orderable: false, searchable: false},
            {data: 'kategori_program', orderable: true, searchable: true},
            {data: 'tgl_proposal', orderable: false, searchable: true},
            {data: 'no_proposal', orderable: false, searchable: true},
            {data: 'nama_kegiatan', orderable: false, searchable: true},
            {data: 'penerima_bantuan', orderable: true, searchable: true},
            {data: 'alamat_jalan', orderable: false, searchable: true},
            {data: 'no_telp', orderable: false, searchable: true},
            {data: 'status_survey_proposal', orderable: false, searchable: true},
            {data: 'total_pengajuan', orderable: false, searchable: false},
            {data: 'created_at', orderable: true, searchable: true},
            {data: null, orderable: false, searchable: false},
        ],
        order: [[12, 'desc']],
        columnDefs: [
            {
                targets: -1,
                render: function(data, type, full, meta) {
                    var kode_ob = data.kode;
                    var pemohon = data.nama_kegiatan;
                    var pendamping_code = data.pendamping_code;

                    var template = '';

                    if (full.permission.indexOf('detail') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'survey/bl/pengajuan/detail/'+full.kode+`" class="m-portlet__nav-link" title="Detail">
                                Detail
                            </a>
                        `;
                    }

                    if (full.permission.indexOf('edit-petugas') != -1) {
                        template = template + `<br>
                            <a href="#" onClick="showEditPetugasModal(event, '` + kode_ob + `', '` + pemohon + `', '` + pendamping_code + `')" class="m-portlet__nav-link" title="Assign Petugas">
                                    Assign Petugas
                                </a>
                            </a>
                        `;
                    }

                    return template;
                },
            },
            {
                targets: 10,
                render: function (data, type, full, meta) {
                    return '<span class="m-badge m-badge--'+ data.class + ' m-badge--wide">' + data.name + '</span>';
                },
            },
        ],
    });

    tableInstance.on('draw.dt', function () {
        var PageInfo = table.DataTable().page.info();
        tableInstance.column(0, {
            page: 'current'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function showEditPetugasModal(ev, kode_ob, pemohon, pendamping_code = '') {
	ev.preventDefault();

	$('#modal-edit_petugas').modal('show');
	$('#modal-nama_pemohon').val(pemohon);
	$('#select_petugas').attr('data-selected', pendamping_code);
	$('#select_petugas').attr('data-lanjutan', kode_ob);
	$("#select_petugas").val(pendamping_code).trigger('change');
}

function handleUbahPetugas(evt) {
	evt.preventDefault();

	var lanjutanValue = $('#select_petugas').attr('data-lanjutan');
	var pendampingValue = $('#filter_petugas').val();

	$.ajax({
        url: window.App.siteUrl + '/survey_pengajuan_bl/ajax_set_pendamping',
        method: 'PUT',
        data: {
            code: lanjutanValue,
            status: pendampingValue,
        },
        beforeSend: function () {
            mApp.block("#modal-edit_petugas .modal-content", {
                overlayColor: "#000000",
                opacity: 0.29,
                type: "loader",
                state: "success",
                message: "Memproses... ",
            });
        },
    })
    .done((response) => {
        mApp.unblock("#modal-edit_petugas .modal-content")
        if (response.status) {
            applyFilter();

            toastr.success(response.msg);
            $('#modal-edit_petugas').modal('hide');
            location.reload();
        } else {
            toastr.warning(response.msg);
        }

    })
    .fail(function (xhr, statusText) {

        toastr.error('Error');
    });

}

function applyFilter() {
    var nama = $('#filterByNama').val();
    var tglPengajuan = $('#filterByTglPengajuan').val();

    tableInstance.column(6).search(normalizeEmptyValue(nama));
    tableInstance.column(4).search(normalizeEmptyValue(tglPengajuan));

    tableInstance.draw();
}

function resetFilter() {
    $('#filterByNama, #filterByTglPengajuan').val('').trigger('change');

    applyFilter();
}

function showExportModal(context) {
    var modalDownloadPartialExcel = $('#modalDownloadPartialExcel');
    var totalData = table.DataTable().page.info().recordsDisplay;
    var totalDataPerExcel = pageConfig.totalDataPerExcel;
    var totalPart = Math.ceil(totalData / totalDataPerExcel);
    var downloadLinks = '';
    var dataStart = 1;
    var dataEnd = totalDataPerExcel;
    var dataTableFilter = $.param(table.DataTable().ajax.params());

    for (let part = 1; part <= totalPart; part++) {
        dataEnd = part * totalDataPerExcel;
        if (dataEnd > totalData) {
            dataEnd = totalData;
        }

        var downloadUrl = window.App.siteUrl+'survey/bl/pengajuan/export?part='+part+'&dataStart='+dataStart+'&dataEnd='+dataEnd+'&'+dataTableFilter;
        downloadLinks = downloadLinks + `
            <li>Part `+part+` (`+dataStart+`-`+dataEnd+`). <a href="`+downloadUrl+`">Unduh</a></li>
        `;

        dataStart = dataEnd + 1;
    }

    $('#downloadLinksList', modalDownloadPartialExcel).html(downloadLinks);

    modalDownloadPartialExcel.modal('show');
}

jQuery(document).ready(function() {
    initTable('#table_bl');
    initSelect2('#select_petugas', 'Pilih petugas');
    initSelect2('#witel', 'Pilih witel');
    initDateRangePicker('#filterByTglPengajuan');
    $('#select_petugas').prop('disabled', true);
    var lanjutanValue = $('#select_petugas').data('lanjutan');
    $("#witel").change(function(){
        var selectedWitel = $("#witel option:selected").val();
        $.ajax({
            type: "POST",
            url: window.App.siteUrl+'survey_pengajuan_bl/ajaxPetugas',
            data: { witel_id : selectedWitel }
        }).done(function(data){
            $("#showPetugas").html(data).prop('disabled', false);
            initSelect2('#filter_petugas', 'Pilih petugas');
            $('#select_petugas').prop('disabled', false);
            $('#select_petugas').select2().next().hide();
        });
    });
});
