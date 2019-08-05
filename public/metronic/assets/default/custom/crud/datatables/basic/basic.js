var DatatablesBasicBasic = function() {

	var initTable1 = function() {
		var table = $('#m_table_1');

		// begin first table
		table.DataTable({
			responsive: true,

			//== DOM Layout settings
			dom: `
				<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>
				<'row'<'col-sm-12'tr>>
				<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'p>>
				`,

			lengthMenu: [5, 10, 25, 50],

			pageLength: 10,

			language: {
				'lengthMenu': 'Tampilkan _MENU_',
				'search': 'Pencarian:',
				'info': 'Menampilkan _START_ - _END_ dari _TOTAL_ entri',
			},

			//== Order settings
			order: [[0, 'asc']],

			headerCallback: function(thead, data, start, end, display) {

			},

			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {
						return `
                        <span class="dropdown">
                            <a href="#" class="btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#m_modal_1"><i class="flaticon flaticon-user-settings"></i> Ubah Petugas</a>
                            </div>
                        </span>
                        <a href="survey-detail.html" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" title="Detail" data-container="body" data-toggle="m-tooltip" data-placement="right">
                          <i class="la la-edit"></i>
                        </a>`;
					},
				},
				{
					targets: 7,
					render: function(data, type, full, meta) {
						var status = {
							'Revisi': {'title': 'Revisi', 'class': 'm-badge--warning'},
							'Terima': {'title': 'Terima', 'class': 'm-badge--success'},
							'Tersurvey': {'title': 'Tersurvey', 'class': 'm-badge--info'},
							'Ditolak': {'title': 'Ditolak', 'class': 'm-badge--danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="m-badge ' + status[data].class + ' m-badge--wide">' + status[data].title + '</span>';
					},
				},
			],
		});

		table.on('change', '.m-group-checkable', function() {
			var set = $(this).closest('table').find('td:first-child .m-checkable');
			var checked = $(this).is(':checked');

			$(set).each(function() {
				if (checked) {
					$(this).prop('checked', true);
					$(this).closest('tr').addClass('active');
				}
				else {
					$(this).prop('checked', false);
					$(this).closest('tr').removeClass('active');
				}
			});
		});

		table.on('change', 'tbody tr .m-checkbox', function() {
			$(this).parents('tr').toggleClass('active');
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
	DatatablesBasicBasic.init();
});
