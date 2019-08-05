var table;
var t;

function initTable(elSelector, search = '', status = '') {
	table = $(elSelector);

	// begin first table
	t = table.DataTable({
		responsive: true,
		processing: true,
		searchDelay: 500,
		serverSide: true,
		ajax: window.App.siteUrl + 'survey/lanjutan/list_datatable' + window.App.qs,
		columns: [
			{
				data: null,
				orderable: false,
				searchable: false
			},
			{
				data: 'kode_mb',
				orderable: false,
				searchable: true,
			},
			{
				data: 'debitur_name',
				orderable: true,
				searchable: true,
			},
			{
				data: 'debitur_email',
				orderable: false,
				searchable: true,
			},
			{
				data: 'duplicate_ktp',
				orderable: false,
				searchable: true,
			},
			{
				data: 'pendamping_code',
				orderable: false,
				searchable: true,
			},
			{
				data: 'witel',
				orderable: false,
				searchable: true,
			},
			{
				data: 'status',
				orderable: false,
				searchable: true,
			},
			{
				data: 'checker_name',
				orderable: false,
				searchable: false,
			},
			{
				data: 'approval_name',
				orderable: false,
				searchable: false,
			},
			{
				data: 'debitur_tanggal_survey',
				orderable: true,
				searchable: true,
			},
			{
				data: 'created_at',
				orderable: true,
				searchable: true,
			},
			{
				data: null,
				orderable: false,
				searchable: false,
			},
		],
		columnDefs: [
			{
				targets: 4,
				render: function (data, type, full, meta) {
					var template = '';
					if (full.duplicate_ktp == 1) {
						return template = template + full.debitur_no_ktp + `<span class="m-badge m-badge--danger m-badge--wide"> Duplicate </span>`;
					} else {
						template = template + full.debitur_no_ktp;
					}

					return template;
				},
			},
			{
				targets: 5,
				render: function (data, type, full, meta) {
					return data.name;
				},
			},
			{
				targets: -7,
				render: function (data, type, full, meta) {
					return data.name;
				},
			},
			{
				targets: -6,
				render: function (data, type, full, meta) {
					return '<span class="m-badge m-badge--'+data.class+' m-badge--wide">'+data.name+'</span>';
				},
			},
			{
				targets: -1,
				orderable: false,
				render: function (data, type, full, meta) {
					var kodeLanjutan = full.lanjutan_code;
					var namaDebitur = full.debitur_name;
					var pendampingCode = full.lanjutan_pendamping_code;
					var permission = full.permission;
					var template = '';

					if (permission.indexOf('detail') != -1) {
						template = template + `
							<a href="` + window.App.siteUrl + `survey/lanjutan/detail/` + full.lanjutan_code + window.App.qs + `" class="m-portlet__nav-link" title="Detail">
								Detail
							</a>
						`;
					}

					if (permission.indexOf('edit-petugas') != -1) {
						template = template + `<br>
							<a href="#" onClick="showEditPetugasModal(event, '` + kodeLanjutan + `', '` + namaDebitur + `', '` + pendampingCode + `')" class="m-portlet__nav-link" title="Assign Petugas">
								Assign Petugas
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

function handleClick() {
	var search = $('#searchApproval').val();
	var status = $('#statusApproval').val();

	initTable('#m_table_1', search, status);
}

function applyFilter() {
	var kode = $('#filterByKode').val();
	var status = $('#filterByStatus').val();
	var petugas = $('#filterByPetugas').val();
	var tglPengajuan = $('#filterByTglPengajuan').val();
	var witel = $('#filterByWitel').val();
	
	witel = (witel == null) ? '' : witel;

	t.column(1).search(normalizeEmptyValue(kode));
	t.column(5).search(normalizeEmptyValue(petugas));
	t.column(-6).search(normalizeEmptyValue(witel));
	t.column(-5).search(normalizeEmptyValue(status));
	t.column(-3).search(normalizeEmptyValue(tglPengajuan));

	t.draw();
}

function resetFilter() {
	$('#filterByKode, #filterByStatus, #filterByPetugas, #filterByTglPengajuan, #filterByWitel').val('').trigger('change');

	applyFilter();
}

function showExportModal(context) {
	var modalDownloadPartialExcel = $('#modalDownloadPartialExcel');
	var totalData = table.DataTable().page.info().recordsDisplay;
	var totalDataPerExcel = pageConfig.totalDataPerExcel;
	var totalPart = Math.ceil(totalData / totalDataPerExcel);
	var downloadLinks = '';
	var dataStart = 1;
	var dataEnd = totalDataPerExcel;
	var dataTableFilter = $.param(table.DataTable().ajax.params());

	for (let part = 1; part <= totalPart; part++) {
		dataEnd = part * totalDataPerExcel;
		if (dataEnd > totalData) {
			dataEnd = totalData;
		}

		var downloadUrl = window.App.siteUrl + 'survey/lanjutan' + `/export?part=` + part + window.App.qs + `&dataStart=` + dataStart + `&dataEnd=` + dataEnd + `&` + dataTableFilter;
		downloadLinks = downloadLinks + `
            <li>Part ` + part + ` (` + dataStart + `-` + dataEnd + `). <a href="` + downloadUrl + `">Unduh</a></li>
        `;

		dataStart = dataEnd + 1;
	}

	$('#downloadLinksList', modalDownloadPartialExcel).html(downloadLinks);

	modalDownloadPartialExcel.modal('show');
}

function showEditPetugasModal(ev, kodeDebitur, namaDebitur, pendampingCode = '') {
	ev.preventDefault();

	$('#modal-edit_petugas').modal('show');
	$('#modal-nama_pemohon').val(namaDebitur);
	$('#select_petugas').attr('data-selected', pendampingCode);
	$('#select_petugas').attr('data-lanjutan', kodeDebitur);
	$("#select_petugas").val(pendampingCode).trigger('change');
}

function handleUbahPetugas(evt) {
	evt.preventDefault();

	var lanjutanValue = $('#select_petugas').data('lanjutan');
	var pendampingValue = $('#select_petugas').val();

	$.ajax({
			url: window.App.siteUrl + '/survey/lanjutan/ajax_set_pendamping',
			method: 'PUT',
			data: {
				code: lanjutanValue,
				status: pendampingValue,
			},
			beforeSend: function () {
				mApp.block("#modal-edit_petugas .modal-content", {
					overlayColor: "#000000",
					opacity: 0.29,
					type: "loader",
					state: "success",
					message: "Memproses... ",
				});
			},
		})
		.done((response) => {
			mApp.unblock("#modal-edit_petugas .modal-content")
			if (response.status) {
				toastr.success(response.msg);
				$('#modal-edit_petugas').modal('hide');
			} else {
				toastr.warning(response.msg);
			}

			if (response.reload) {
				setTimeout(function () {
					window.location.reload();
				}, 2000);
			}
		})
		.fail(function (xhr, statusText) {

			toastr.error('Error');
		});

}

jQuery(document).ready(function () {
	initTable('#m_table_1');
	initSelect2('#select_petugas', 'Pilih petugas');
	initSelect2('#filterByPetugas', 'Pilih petugas');
	initSelect2('#filterByWitel', 'Pilih witel');
	initDateRangePicker('#filterByTglPengajuan');
});