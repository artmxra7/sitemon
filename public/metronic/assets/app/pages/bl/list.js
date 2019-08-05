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
        ajax: window.App.siteUrl+'proposal_bl/proposal/list_datatable/'+window.App.uriSegment.split('/')[2],
        columns: [
            {data: null, orderable: false, searchable: false},
            {data: 'nama_kegiatan', orderable: false, searchable: false},
            {data: null, orderable: false, searchable: false},
            {data: 'penerima_bantuan', orderable: false, searchable: false},
            {data: 'kontak_person', orderable: false, searchable: false},
            {data: 'no_telp', orderable: false, searchable: false},
            {data: 'tipe_proposal', orderable: false, searchable: false},
            {data: 'tgl_proposal', orderable: false, searchable: false},
            {data: null, orderable: false, searchable: false},
        ],
        order: [[7, 'desc']],
        columnDefs: [
            {
                targets: -1,
                render: function(data, type, full, meta) {
                    var template = '';

                    if (full.permission.indexOf('detail') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'bl/proposal/'+window.App.uriSegment.split('/')[2]+'/detail/'+full.kode+`" class="m-portlet__nav-link" title="Detail">
                                Detail
                            </a>
                        `;
                    }

                    if (full.permission.indexOf('update') != -1) {
                        template = template + `<br>
                            <a href="`+window.App.siteUrl+'bl/proposal/'+window.App.uriSegment.split('/')[2]+'/edit/'+full.kode+`" class="m-portlet__nav-link" title="Ubah">
                                Ubah
                            </a>
                        `;
                    }

                    return template;
                },
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    return full.prov_nama_smartfunding+', '+full.kota_nama_smartfunding;
                }
            }
            // {
            //     targets: 8,
            //     render: function (data, type, full, meta) {
            //         return '<span class="m-badge m-badge--'+ data.class + ' m-badge--wide">' + data.name + '</span>';
            //     },
            // },
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
    var nama = $('#filterByNama').val();
    var tglPengajuan = $('#filterByTglPengajuan').val();

    tableInstance.column(4).search(normalizeEmptyValue(nama));
    tableInstance.column(2).search(normalizeEmptyValue(tglPengajuan));

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

        var downloadUrl = window.App.siteUrl+'bl/proposal/'+window.App.uriSegment.split('/')[2]+`/export?part=`+part+`&dataStart=`+dataStart+`&dataEnd=`+dataEnd+`&`+dataTableFilter;
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
    initDateRangePicker('#filterByTglPengajuan');
});
