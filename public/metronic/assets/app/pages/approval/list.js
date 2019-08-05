var t;

function initTable(elSelector, search = '', status = '') {
	var table = $(elSelector);

	// begin first table
	t = table.DataTable({
		responsive: true,
		processing: true,
		serverSide: true,
		ajax: window.App.siteUrl + 'approval/list_datatable',

		columns: [{
				data: null,
				orderable: false,
				searchable: false
			},
			{
				data: 'checker_name',
				orderable: false,
				searchable: false
			},
			{
				data: 'description',
				orderable: false,
				searchable: true
			},
			{
				data: 'approval_name',
				orderable: false,
				searchable: true
			},
			{
				data: 'created_date',
				orderable: true,
				searchable: true
			},
			{
				data: 'updated_date',
				orderable: true,
				searchable: true
			},
			{
				data: 'status',
				orderable: false,
				searchable: true,
			},
			{
				data: null,
				orderable: false,
				searchable: false,
			},
		],
		order: [[4, 'desc']],
		columnDefs: [
			{
				targets: -2,
				orderable: false,
				render: function (data, type, full, meta) {
					if (data) {
						return '<span class="m-badge m-badge--' + data.class + ' m-badge--wide">' + data.name + '</span>';
					}

					return '';
				},
			},
			{
				targets: -1,
				orderable: false,
				render: function (data, type, full, meta) {
					var id = full.id;
					var permission = full.permission;
					var status = full.status;
					var template = '';

					if (permission.indexOf('process') != -1) {
						var actionText = (status.id == 1) ? 'Proses' : 'Detail';

						template = template + `
								<a href="` + window.App.siteUrl + full.uri + `" class="m-portlet__nav-link" title="`+actionText+`">
									`+actionText+`
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

function applyFilter() {
	var deskripsi = $('#filterByDeskripsi').val();
	var status = $('#statusApproval').val();

	t.column(2).search(normalizeEmptyValue(deskripsi));
	t.column(-2).search(normalizeEmptyValue(status));

	t.draw();
}

function resetFilter() {
	$('#filterByDeskripsi, #statusApproval').val('').trigger('change');

	applyFilter();
}

function handleClick() {
	var search = $('#searchApproval').val();
	var status = $('#statusApproval').val();

	initTable('#m_table_1', search, status);
}

jQuery(document).ready(function () {
	initTable('#m_table_1');
});
