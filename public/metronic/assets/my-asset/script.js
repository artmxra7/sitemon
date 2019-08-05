$(document).ready(function() { initStatement(); });

function initStatement() {
    autoActiveSideBarMenu();
    autoFillFieldSelect();
    initExtendDatatable();
    removeEmptyMenuAtSidebar();
}

function initExtendDatatable() {
    var DatatableExtendConfig = {
        dom: `
            <'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>
            <'row'<'col-sm-12'tr>>
            <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'p>>
            `,
        lengthMenu: [5, 10, 25, 50],
        pageLength: 10,
        language: {
            'lengthMenu': 'Tampilkan _MENU_',
            'search': 'Pencarian',
            'info': 'Menampilkan _START_ - _END_ dari total _TOTAL_ entri',
            'loadingRecords': '&nbsp;',
            'processing': '<div class="m-loader m-loader--primary" style="width: 30px; display: inline-block;"></div><br><p>Memuat</p>',
        },
        searchDelay: 1000,
    };

    if (typeof $.fn.DataTable != 'undefined') {
        $.extend(true, $.fn.DataTable.defaults, DatatableExtendConfig);
    }
}

function initSelect2(elSelector, placeholder) {
    $(elSelector).select2({
        placeholder: placeholder,
        allowClear: true
    });

    $.each($(elSelector), function(e, i){
      var selected = $(this).data('selected');
      selected = (selected || selected === 0) ? selected : 'all';

      $(this).val(selected).trigger('change');
    });
}

function initDateRangePicker(elSelector) {
    $(elSelector).daterangepicker({
        buttonClasses: 'm-btn btn',
        applyClass: 'btn-primary',
        cancelClass: 'btn-secondary',
    }, function(start, end, label) {
        $(elSelector+' .form-control').val( start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
    });

    $(elSelector).val('');
}

function initDatePicker(elSelector) {
    $(elSelector).datepicker({
        todayHighlight: true,
        orientation: "bottom left",
    });
}

function autoFillFieldSelect() {
    $.each($('select'), function() {
        var value = $(this).attr('value');
        if (value) {
            $(this).val(value);
        }
    });
}

function autoActiveSideBarMenu() {
    var menuBoundary = '#m_ver_menu';
    var siteUrl = window.App.siteUrl;
    var uriSegment = window.App.uriSegment.split('/');
    var uriSegmentLength = uriSegment.length;
    var qs = window.App.qs;
    var isMenuFound = false;

    var i = 1;
    do {
        var fullUrl = siteUrl + uriSegment.join('/');

        if (!isMenuFound) {
            var menuEl = $(menuBoundary + ' a[href="'+fullUrl+qs+'"]');

            if (menuEl.length) {
                menuEl.parents('li').addClass('m-menu__item--active');
                menuEl.parents('.m-menu__item--submenu').addClass('m-menu__item--open');
                isMenuFound = true;
            }
        }

        uriSegment.pop();

        i++;
    } while(i <= uriSegmentLength && !isMenuFound);
}

function normalizeEmptyValue(value) {
    if (typeof value == 'undefined') {
        return '';
    }

    if (value == null) {
        return '';
    }

    return value;
}

function confirmSubmitProcess(context) {
    swal({
        title: 'Apakah Anda yakin?',
        text: "Anda tidak bisa mengembalikan data ini lagi!",
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Ya, Saya yakin!'
    }).then(function(result) {
        var formEl = $(context).parents('form');

        if (result.value) {
            if (!formEl[0].checkValidity()) {
                setTimeout(() => {
                    formEl[0].reportValidity()
                }, 500);
            }
            else {
                formEl.submit();
            }
        }
    });
}

function removeEmptyMenuAtSidebar() {
    var sidebarGroupParents = $($('[sidebar-group-parent]').get().reverse());

    sidebarGroupParents.each(function() {
        var sidebarGroupParentName = $(this).attr('sidebar-group-parent');
        var sidebarGroups = $('[sidebar-group="'+sidebarGroupParentName+'"]');

        if (sidebarGroups.length < 1) {
            $(this).remove();
        }
    });
}