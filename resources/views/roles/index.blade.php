@extends('layouts.app')

@section('title', 'Role Management')

@section('style')

@endsection()

@section('sidebar')
    @parent

    @include('layouts.sidebar')
@endsection

@section('content')
<div class="m-grid__item m-grid__item--fluid m-wrapper">
<div class="m-subheader ">
    <div class="d-flex align-items-center">
        <div class="mr-auto">
            <h3 class="m-subheader__title m-subheader__title--separator">Role</h3>

            {!! generateBreadcrumb($breadcrumb) !!}
        </div>
    </div>
</div>
<div class="m-content">
    <div class="row">
        <div class="col-lg-12">
            <div class="m-portlet">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                Daftar Role
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="m-portlet__body">

                    <!--begin::Section-->
                    <div class="m-section">
                        <div class="m-section__sub">
                            @can('role create')
                                <a href="{{ route('roles.create') }}" class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill"><i class="la la-plus-circle"></i> Buat Role</a>
                            @endcan
                        </div>
                        <div class="m-section__content">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($roles as $key => $role)
                                        <tr>
                                            <td>{{ ++$i }}</td>
                                            <td>{{ $role->name }}</td>
                                            <td>
                                                <!-- <a class="btn btn-info" href="{{ route('roles.show',$role->id) }}">Show</a> -->
                                                @can('role edit')
                                                    <a class="btn btn-primary" href="{{ route('roles.edit',$role->id) }}">Edit</a>
                                                @endcan
                                                @can('role delete')
                                                    {!! Form::open(['method' => 'DELETE','route' => ['roles.destroy', $role->id],'style'=>'display:inline']) !!}
                                                        {!! Form::button('Delete', ['class' => 'btn btn-danger', 'onClick' => "confirmSubmitProcess(this)"]) !!}
                                                    {!! Form::close() !!}
                                                @endcan
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {!! $roles->render() !!}
                    </div>

                    <!--end::Section-->
                </div>

                <!--end::Form-->
            </div>
        </div>
    </div>
</div>
</div>

@endsection

@section('script')

@endsection
