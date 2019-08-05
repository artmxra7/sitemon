<!DOCTYPE html>
<html lang="en">
	<!-- begin::Head -->
	<head>
		<meta charset="utf-8" />
		<title>Beskem | @yield('title')</title>
		<meta name="description" content="Latest updates and statistic charts">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">

		<!--begin::Web font -->
		<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
		<script>
			WebFont.load({
				google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},
				active: function() {
					sessionStorage.fonts = true;
				}
			});

            window.App = {
                siteUrl: "{{ Request::url() }}",
                uriSegment: "",
                qs: "",
            }
        </script>

		<!--end::Web font -->
        <link href="{{ asset('metronic/vendors/vendors/line-awesome/css/line-awesome.css') }}" rel="stylesheet" type="text/css" />

		<!--begin::Global Theme Styles -->
		<link href="{{ asset('metronic/assets/vendors/base/vendors.bundle.css') }}" rel="stylesheet" type="text/css" />
		<link href="{{ asset('metronic/assets/default/base/style.bundle.css') }}" rel="stylesheet" type="text/css" />
		<link href="{{ asset('metronic/assets/my-asset/style.css') }}" rel="stylesheet" type="text/css" />

		<!--end::Global Theme Styles -->
		<link rel="shortcut icon" href="{{ asset('metronic/assets/default/media/img/logo/favicon.ico') }}" />
	</head>

	<!-- end::Head -->

	<!-- begin::Body -->
	<body class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
        @yield('content')

        <script src="{{ asset('metronic/assets/vendors/base/vendors.bundle.js') }}" type="text/javascript"></script>
		<script src="{{ asset('metronic/assets/my-asset/script.js') }}" type="text/javascript"></script>
		<!-- <script src="{{ asset('metronic/assets/snippets/custom/pages/user/login.js') }}" type="text/javascript"></script> -->
		<script>
			var toastForm = '';
			@foreach($errors->all() as $error)
			var toastForm = '{{ $error }}';
			@endforeach

			var toastInfo = `{{ Session::get('info') }}`;
			var toastError = `{{ Session::get('error') }}`;
			var toastSuccess = `{{ Session::get('success') }}`;

			toastr.options.progressBar = true;
            toastr.options.timeOut = 15000;

			if (toastForm) toastr.warning(toastForm, 'Input Harus Valid');
			if (toastInfo) toastr.info(toastInfo, 'Info');
			if (toastError) toastr.error(toastError, 'Gagal');
			if (toastSuccess) toastr.success(toastSuccess, 'Berhasil');
		</script>
        @yield('script')
	</body>

	<!-- end::Body -->
</html>
