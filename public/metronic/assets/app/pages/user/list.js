function initTable(elSelector) {
    var table = $(elSelector);

    // begin first table
    var t = table.DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: window.App.siteUrl+'user/list_datatable',
        columns: [
            {data: null, orderable: false, searchable: false},
            {data: 'email'},
            {data: 'group_desc'},
            {data: 'checker_name'},
            {data: 'approval_name'},
            {data: 'active', orderable: false, searchable: false},
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
                                    <input type="checkbox" `+setAsChecked+` onChange="toggleUserActivation(this, '`+full.user_id+`')">
                                    <span class="my-0"></span>
                                </label>
                            </span>`;
                    }

                    return template;

                },
            },
            {
                targets: -1,
                orderable: false,
                render: function(data, type, full, meta) {
                    var id = data.user_id;
                    var permission = data.permission;
                    var template = '';

                    if (full.permission.indexOf('reset_password') != -1) {
                        template = template + `
                            <a href="#" data-user-id="`+id+`" class="reset-password m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Reset Password">
                                <i class="la la-refresh"></i>
                            </a>
                        `;
                    }

                    if (full.permission.indexOf('edit') != -1) {
                        template = template + `
                            <a href="`+window.App.siteUrl+'user/edit/'+id+`" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Ubah">
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

function toggleUserActivation(context, id) {
    var rollbackStatus = !$(context).is(':checked');

    $.ajax({
        url: window.App.siteUrl+'user/toggle_activation/'+id,
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

function initSweetAlert2(elSelector) {
    $('body').on('click', elSelector, function(e) {
        e.preventDefault();

        var userId = $(this).data('userId');

        swal({
            title: 'Apakah Anda yakin?',
            text: "Anda tidak bisa mengembalikan data ini lagi!",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonText: 'Ya, Saya yakin!'
        }).then(function(result) {

            if (result.value) {
                $.ajax({
                    url: window.App.siteUrl+'user/reset/'+userId,
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
                    }
                });
            }
        });
    });
}

jQuery(document).ready(function() {
    initTable('#user_table');
    initSweetAlert2('.reset-password');
});
