function initTable(elSelector) {
    var table = $(elSelector);

    // begin first table
    var t = table.DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: window.App.siteUrl + 'kota/list_datatable',
        columns: [{
                data: null,
                orderable: false,
                searchable: false
            },
            {
                data: 'kota_name',
                searchable: true
            },
            {
                data: 'kota_id_smartfunding'
            },
            {
                data: 'provinsi_name'
            },
            {
                data: 'witel_name'
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