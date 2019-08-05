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
        ajax: window.App.siteUrl + 'survey/pengajuan/list_datatable/',
        columns: [{
                data: null,
                orderable: false,
                searchable: false
            },
            {
                data: 'kode_mb',
                orderable: false,
                searchable: true
            },
            {
                data: 'debitur_name',
                orderable: false,
                searchable: true
            },
            {
                data: 'debitur_email',
                orderable: false,
                searchable: true
            },
            {
                data: 'duplicate_ktp',
                orderable: false,
                searchable: true
            },
            {
                data: 'pendamping_name',
                orderable: false,
                searchable: true
            },
            {
                data: 'witel',
                orderable: false,
                searchable: true
            },
            {
                data: 'debitur_status_survey',
                orderable: false,
                searchable: true
            },
            {
                data: 'checker_name',
                orderable: false,
                searchable: false
            },
            {
                data: 'approval_name',
                orderable: false,
                searchable: false
            },
            {
                data: 'debitur_tanggal_survey',
                orderable: true,
                searchable: false
            },
            {
                data: 'created_at',
                orderable: true,
                searchable: false
            },
            {
                data: null,
                orderable: false,
                searchable: false
            },
        ],
        order: [
            [11, 'desc']
        ],
        columnDefs: [{
                targets: -1,
                orderable: false,
                render: function (data, type, full, meta) {
                    var kodeDebitur = data.real_debitur_code;
                    var namaDebitur = data.debitur_name;
                    var permission = data.permission;
                    var pendampingCode = data.pendamping_code;
                    var template = '';

                    if (permission.indexOf('detail') != -1) {
                        template = template + `
                            <a href="` + window.App.siteUrl + 'survey/pengajuan/detail/' + kodeDebitur + `"  class="m-portlet__nav-link" title="Detail">
                                    Detail
                                </a>
                            </a>
                        `;
                    }

                    if (permission.indexOf('edit-petugas') != -1) {
                        template = template + `<br>
                            <a href="#" onClick="showEditPetugasModal(event, '` + kodeDebitur + `', '` + namaDebitur + `', '` + pendampingCode + `')" class="m-portlet__nav-link" title="Assign Petugas">
                                    Assign Petugas
                                </a>
                            </a>
                        `;
                    }

                    return template;
                },
            },
            {
                targets: 4,
                render: function (data, type, full, meta) {
                    var template = '';
                    if (full.duplicate_ktp == 1) {
                        template = template + full.debitur_no_ktp + `<span class="m-badge m-badge--danger m-badge--wide"> Duplicate </span>`;
                    } else {
                        template = template + full.debitur_no_ktp;
                    }

                    return template;
                },
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    return data.name;
                },
            },
            {
                targets: 7,
                render: function (data, type, full, meta) {
                    return '<span class="m-badge m-badge--' + data.class + ' m-badge--wide">' + data.name + '</span>';
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

function applyFilter() {
    var kode = $('#filterByKode').val();
    var status = $('#filterByStatus').val();
    var petugas = $('#select_petugas-filter').val();
    var tglPengajuan = $('#filterByTglPengajuan').val();
    var witel = $('#filterByWitel').val();

    tableInstance.column(1).search(normalizeEmptyValue(kode));
    tableInstance.column(7).search(normalizeEmptyValue(status));
    tableInstance.column(6).search(normalizeEmptyValue(petugas));
    tableInstance.column(10).search(normalizeEmptyValue(tglPengajuan));
    tableInstance.column(11).search(normalizeEmptyValue(witel));

    tableInstance.draw();
}

function resetFilter() {
    $('#filterByKode, #filterByStatus, #select_petugas-filter, #filterByTglPengajuan, #filterByWitel').val('').trigger('change');

    applyFilter();
}

function showEditPetugasModal(ev, kodeDebitur, namaDebitur, pendampingCode = '') {
    ev.preventDefault();

    $('#modal-edit_petugas').modal('show');
    $('#modal-nama_pemohon').val(namaDebitur);
    $('#select_petugas').attr('data-selected', pendampingCode);
    $('#select_petugas').attr('data-lanjutan', kodeDebitur);
    $("#select_petugas").val(pendampingCode).trigger('change');
}

function handleUbahPetugas(evt) {
    evt.preventDefault();

    var lanjutanValue = $('#select_petugas').attr('data-lanjutan');
    var pendampingValue = $('#filter_petugas').val();

    $.ajax({
            url: window.App.siteUrl + '/survey/pengajuan/ajax_set_pendamping',
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

        var downloadUrl = window.App.siteUrl + 'survey/pengajuan/' + `/export?part=` + part + `&dataStart=` + dataStart + `&dataEnd=` + dataEnd + `&` + dataTableFilter;
        downloadLinks = downloadLinks + `
            <li>Part ` + part + ` (` + dataStart + `-` + dataEnd + `). <a href="` + downloadUrl + `">Unduh</a></li>
        `;

        dataStart = dataEnd + 1;
    }

    $('#downloadLinksList', modalDownloadPartialExcel).html(downloadLinks);

    modalDownloadPartialExcel.modal('show');
}

jQuery(document).ready(function () {
    initTable('#survey_pengajuan_table');
    initSelect2('#select_petugas', 'Pilih petugas');
    initSelect2('#select_petugas-filter', 'Pilih petugas');
    initSelect2('#filterByWitel', '~ Pilih witel');
    initSelect2('#witel', 'Pilih witel');
    $('#select_petugas').prop('disabled', true);
    initDateRangePicker('#filterByTglPengajuan');
    $("#witel").change(function () {
        var selectedWitel = $("#witel option:selected").val();
        $.ajax({
            type: "POST",
            url: window.App.siteUrl + 'survey_pengajuan_bl/ajaxPetugas',
            data: {
                witel_id: selectedWitel
            }
        }).done(function (data) {
            $("#showPetugas").html(data).prop('disabled', false);
            initSelect2('#filter_petugas', 'Pilih petugas');
            $('#select_petugas').prop('disabled', false);
            $('#select_petugas').select2().next().hide();
        });
    });
});