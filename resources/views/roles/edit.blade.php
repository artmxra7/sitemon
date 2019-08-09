@extends('layouts.app')

@section('title', 'Ubah Role')

@section('style')

@endsection()

@section('sidebar')
    @parent

    @include('layouts.sidebar')
@endsection

@section('content')

<div class="m-grid__item m-grid__item--fluid m-wrapper">
    <!-- BEGIN: Subheader -->
    <div class="m-subheader ">
        <div class="d-flex align-items-center">
            <div class="mr-auto">
                <h3 class="m-subheader__title m-subheader__title--separator"><i class="m-menu__link-icon flaticon-map mr-2"></i> Role</h3>
                {!! generateBreadcrumb($breadcrumb) !!}
            </div>
        </div>
    </div>

    <!-- END: Subheader -->
    <div class="m-content">

        <!--Begin::Section-->
        <div class="row">
            <div class="col-xl-12">
                <div class="m-portlet m-portlet--bordered-semi m-portlet--full-height">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <h3 class="m-portlet__head-text">
                                    <i class="m-menu__link-icon flaticon-plus mr-2"></i> Ubah Role
                                </h3>
                            </div>
                        </div>
                    </div>
                    {!! Form::model($role, ['method' => 'PATCH','route' => ['roles.update', $role->id], 'class' => 'm-form m-form--fit m-form--label-align-right']) !!}
                        <div class="m-portlet__body">
                            <div class="row">
                                <div class="col-12 col-md-6 col-xl-4">
                                    <div class="form-group m-form__group">
                                        <label for="name">Nama <sup class="text-danger">*</sup></label>
                                        <input type="text" name="name" required class="form-control m-input" value="{{ $role->name }}">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row p-4 mt-5">
                                        <div class="col-12 mb-2">
                                            <button onClick="toggleAllPermission(event)" class="btn btn-link" type="button">Select/Unselect All</button>
                                        </div>

                                        @foreach($permission as $key => $value)
                                            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                                                <div class="m-portlet m-portlet--bordered-semi m-portlet--full-height">
                                                    <div class="m-portlet__head">
                                                        <div class="m-portlet__head-caption">
                                                            <div class="m-portlet__head-title">
                                                                <h3 class="m-portlet__head-text">
                                                                    <i class="m-menu__link-icon flaticon-open-box mr-2"></i> {{ $key }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="m-portlet__body">
                                                        <button onClick="toggleGroupPermission(event, '{{ $key }}')" class="btn btn-link pl-0" type="button">Select/Unselect All</button>
                                                        <div class="m-checkbox-list">
                                                            @foreach($value as $k => $v)
                                                                @foreach($v as $keys => $val)
                                                                <label class="m-checkbox">
                                                                    <input group="{{ $key }}" ref="permission-checkbox" type="checkbox" name="permission[]" {{ in_array($keys, $rolePermissions) ? 'checked' : '' }} value="{{ $keys }}"> {{ $val }}
                                                                    <span></span>
                                                                </label>
                                                                @endforeach
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-portlet__foot m-portlet__foot--fit">
                            <div class="row">
                                <div class="col-12">
                                    <div class="m-form__actions text-right">
                                        <a href="{{ url('roles') }}" class="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder m-btn--icon"><i class="la la-ban"></i> Batal</a>
                                        <button type="button" onClick="confirmSubmitProcess(this)" class="btn m-btn--pill btn-info btn-focus m-btn m-btn--custom m-btn--label-brand m-btn--bolder m-btn--icon"><i class="la la-plus-circle"></i> Ubah</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
        <!--End::Section-->
    </div>
</div>
@endsection

@section('script')
    <script src="{{ asset('metronic/assets/app/pages/role/general.js') }}"></script>
@endsection
