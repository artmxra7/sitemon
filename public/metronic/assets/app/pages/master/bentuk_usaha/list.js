function initTable(elSelector) {
    var table = $(elSelector);

    // begin first table
    var t = table.DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: window.App.siteUrl + 'bentuk_usaha/list_datatable',
        columns: [{
                data: null,
                orderable: false,
                searchable: false
            },
            {
                data: 'bentuk_usaha_name'
            },
            {
                data: 'bentuk_usaha_id_smartbisnis'
            },
        ],
    });

    t.on('draw.dt', function () {
        var PageInfo = table.DataTable().page.info();
        t.column(0, {
            page: 'current'
        }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

jQuery(document).ready(function () {
    initTable('#m_table_1');
});