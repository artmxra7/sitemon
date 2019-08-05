function initTable(elSelector) {
    var table = $(elSelector);

    // begin first table
    var t = table.DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: window.App.siteUrl+'role/list_datatable',
        columns: [
            {data: null, orderable: false, searchable: false},
            {data: 'name'},
            {data: 'description'},
            {data: 'created_at'},
            {data: 'status', orderable: false, searchable: false},
            {data: null, orderable: false, searchable: false},
        ],
        columnDefs: [
            {
                targets: -2,
                render: function(data, type, full, meta) {
                    var template = '';
                    var setAsChecked = (data == '1') ? 'checked' : '';

                    if (full.permission.indexOf('activation') != -1) {
                        template = template + `
                            <span class="m-switch m-switch--icon m-switch--sm">
                                <label class="mb-0">
                                    <input type="checkbox" `+setAsChecked+` onChange="toggleRoleActivation(this, '`+full.id+`')">
                                    <span class="my-0"></span>
                                </label>
                            </span>`;
                    }

                    return template;
                },
            },
            {
                targets: -1,
                render: function(data, type, full, meta) {
                    var template = '';

                    if (full.permission.indexOf('edit') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'role/edit/'+full.id+`" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Ubah">
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

function toggleRoleActivation(context, id) {
    var rollbackStatus = !$(context).is(':checked');

    $.ajax({
        url: window.App.siteUrl+'role/toggle_activation/'+id,
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
    initTable('#role_table');
});