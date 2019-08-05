function toggleAllPermission(evn) {
    evn.preventDefault();

    $('[ref="permission-checkbox"]').prop('checked', isHasOneInputNotChecked());
}

function isHasOneInputNotChecked() {
    return $('[ref="permission-checkbox"]').filter((index, item) => {
        return !$(item).is(':checked');
    }).length > 0;
}

function toggleGroupPermission(evn, groupIndex) {
    evn.preventDefault();

    $('[ref="permission-checkbox"][group="'+groupIndex+'"]').prop('checked', isHasOneGroupInputNotChecked(groupIndex));
}

function isHasOneGroupInputNotChecked(groupIndex) {
    return $('[ref="permission-checkbox"][group="'+groupIndex+'"]').filter((index, item) => {
        return !$(item).is(':checked');
    }).length > 0;
}