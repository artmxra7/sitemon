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
        ajax: window.App.siteUrl+'approval/regional/list_datatable/'+window.App.uriSegment.split('/')[2],
        columns: [
            {data: null, orderable: false, searchable: false},
            {data: 'kode', orderable: true, searchable: true},
            {data: 'nama_lengkap', orderable: true, searchable: true},
            {data: 'email', orderable: false, searchable: true},
            {data: 'nomor_telepon', orderable: false, searchable: true},
            {data: 'nomor_hp', orderable: false, searchable: true},
            {data: 'created_at', orderable: true, searchable: true},
            {data: 'witel', orderable: false, searchable: true},
            {data: null, orderable: false, searchable: false},
        ],
        order: [[ 6, "desc" ]],
        columnDefs: [
            {
                targets: 1,
                render: function(data, type, full, meta) {
                    return data['source'];
                },
            },
            {
                targets: -2,
                render: function(data, type, full, meta) {
                    return data['name'];
                },
            },
            {
                targets: -1,
                render: function(data, type, full, meta) {
                    var template = '';

                    if (full.permission.indexOf('detail') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'approval/regional/'+window.App.uriSegment.split('/')[2]+'/detail/'+full.kode['unique']+`" class="m-portlet__nav-link" title="Detail">
                                Detail
                            </a>
                        `;
                    }

                    if (full.permission.indexOf('print_penolakan') != -1) {
                        template = template + `<br>
                            <a href="`+window.App.siteUrl+'form1/'+window.App.uriSegment.split('/')[2]+'/print_penolakan/'+full.kode+`" class="m-portlet__nav-link" title="Print Penolakan">
                                Print Penolakan
                            </a>
                        `;
                    }

                    return template;
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
    var nama = $('#filterByNama').val();
    var email = $('#filterByEmail').val();
    var tglPengajuan = $('#filterByTglPengajuan').val();
    var witel = $('#filterByWitel').val();

    tableInstance.column(1).search(normalizeEmptyValue(kode));
    tableInstance.column(2).search(normalizeEmptyValue(nama));
    tableInstance.column(3).search(normalizeEmptyValue(email));
    tableInstance.column(-3).search(normalizeEmptyValue(tglPengajuan));
    tableInstance.column(-2).search(normalizeEmptyValue(witel));

    tableInstance.draw();
}

function resetFilter() {
    $('#filterByKode, #filterByNama, #filterByEmail, #filterByTglPengajuan, #filterByWitel').val('').trigger('change');

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

        var downloadUrl = window.App.siteUrl+'approval/regional/'+window.App.uriSegment.split('/')[2]+`/export?part=`+part+`&dataStart=`+dataStart+`&dataEnd=`+dataEnd+`&`+dataTableFilter;
        downloadLinks = downloadLinks + `
            <li>Part `+part+` (`+dataStart+`-`+dataEnd+`). <a href="`+downloadUrl+`">Unduh</a></li>
        `;

        dataStart = dataEnd + 1;
    }

    $('#downloadLinksList', modalDownloadPartialExcel).html(downloadLinks);

    modalDownloadPartialExcel.modal('show');
}


jQuery(document).ready(function() {
    initTable('#table_apvReg');
    initDateRangePicker('#filterByTglPengajuan');
    initSelect2('#filterByWitel', '~ Pilih witel');
});
