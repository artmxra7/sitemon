// ajax serverSide form1 Baru
var DatatablesDataSourceAjaxServerForm1Baru = function() {

	var initTable1 = function() {
		var table = $('#table_form_1_baru');

		// begin first table
		table.DataTable({
			searching: false,
			responsive: true,
			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: 'inc/api/datatables/demos/server.php',
			columns: [
				{data: 'kode'},
				{data: 'nama'},
				{data: 'email'},
				{data: 'alamat'},
				{data: 'address'},
				{data: 'telepon'},
				{data: 'no_hp'},
				{data: 'status'},
				{data: 'Actions'},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                          <i class="la la-ellipsis-h"></i>
                        </a>`;
					},
				}
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

// ajax serverSide form1 Lanjut
var DatatablesDataSourceAjaxServerForm1Lanjut = function() {

	var initTable1 = function() {
		var table = $('#table_form_1_lanjut');

		// begin first table
		table.DataTable({
			searching: false,
			responsive: true,
			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: 'inc/api/datatables/demos/server.php',
			columns: [
				{data: 'kode'},
				{data: 'nama'},
				{data: 'email'},
				{data: 'alamat'},
				{data: 'address'},
				{data: 'telepon'},
				{data: 'no_hp'},
				{data: 'status'},
				{data: 'Actions'},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                          <i class="la la-ellipsis-h"></i>
                        </a>`;
					},
				}
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

// ajax serverSide form1 Lanjut
var DatatablesDataSourceAjaxServerForm1Tolak = function() {

	var initTable1 = function() {
		var table = $('#table_form_1_tolak');

		// begin first table
		table.DataTable({
			searching: false,
			responsive: true,
			searchDelay: 500,
			processing: true,
			serverSide: true,
			ajax: 'inc/api/datatables/demos/server.php',
			columns: [
				{data: 'kode'},
				{data: 'nama'},
				{data: 'email'},
				{data: 'alamat'},
				{data: 'address'},
				{data: 'telepon'},
				{data: 'no_hp'},
				{data: 'status'},
				{data: 'Actions'},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <a href="#" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="View">
                          <i class="la la-ellipsis-h"></i>
                        </a>`;
					},
				}
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

jQuery(document).ready(function() {
	DatatablesDataSourceAjaxServerForm1Baru.init();
	DatatablesDataSourceAjaxServerForm1Lanjut.init();
	DatatablesDataSourceAjaxServerForm1Tolak.init();
});
