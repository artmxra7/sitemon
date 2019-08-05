function initTable(elSelector) {
    var table = $(elSelector);

    // begin first table
    var t = table.DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: window.App.siteUrl+'petugas/list_datatable',
        columns: [
            {data: null, orderable: false, searchable: false},
            {data: 'pendamping_code'},
            {data: 'pendamping_name'},
            {data: 'pendamping_email'},
            {data: 'pendamping_date_created'},
            {data: 'pendamping_status', orderable: false, searchable: false},
            {data: null, orderable: false, searchable: false},
        ],
        order: [[4, 'desc']],
        columnDefs: [
            {
                targets: -2,
                orderable: false,
                render: function(data, type, full, meta) {
                    var template = '';

                    if (full.permission.indexOf('activation') != -1) {
                        var setAsChecked = (data == 1) ? 'checked' : '';

                        template = `
                            <span class="m-switch m-switch--icon">
                                <label class="mb-0">
                                    <input type="checkbox" `+setAsChecked+` onChange="toggleActivation(this, '`+full.pendamping_code+`')">
                                    <span class="my-0"></span>
                                </label>
                            </span>
                        `;
                    }

                    return template;
                },
            },
            {
                targets: -1,
                orderable: false,
                render: function(data, type, full, meta) {
                    var id = data.pendamping_code;
                    var permission = data.permission;
                    var template = '';

                    if (permission.indexOf('detail') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'petugas/detail/'+id+`" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Detail">
                                <i class="la la-eye"></i>
                            </a>
                        `;
                    }

                    if (permission.indexOf('edit') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'petugas/edit/'+id+`" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Ubah">
                                <i class="la la-edit"></i>
                            </a>
                        `;
                    }

                    return template;
                },
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

function toggleActivation(context, id) {
    var rollbackStatus = !$(context).is(':checked');

    $.ajax({
        url: window.App.siteUrl+'petugas/toggle_activation/'+id,
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
            $(context).prop('checked', rollbackStatus);
        }
    });
}

jQuery(document).ready(function() {
    initTable('#user_table');
});
