@extends('layouts.app')

@section('title', 'User Dashboard')

@section('style')

@endsection()

@section('sidebar')
    @parent

    @include('layouts.sidebar')
@endsection

@section('content')
<div class="m-grid__item m-grid__item--fluid m-wrapper">

        <div class="m-content">
                <!-- BEGIN: Subheader -->
                <div class="m-subheader" style="padding:0px;">
                    <div class="d-flex align-items-center">
                        <div class="mr-auto">
                            <h3 class="m-subheader__title m-subheader__title--separator">Edit User</h3>
                            <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
                                <li class="m-nav__item m-nav__item--home">
                                    <a href="{{ url('/') }}" class="m-nav__link m-nav__link--icon">
                                        <i class="m-nav__link-icon la la-home"></i>
                                    </a>
                                </li>
                                <li class="m-nav__separator">-</li>
                                <li class="m-nav__item">
                                    <a href="{{ url('/user_dashboard') }}" class="m-nav__link">
                                        <span class="m-nav__link-text">User</span>
                                    </a>
                                </li>
                                <li class="m-nav__separator">-</li>
                                <li class="m-nav__item">
                                    <a class="m-nav__link">
                                    <span class="m-nav__link-text">Edit User</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- END: Subheader -->
                <br>
                <!--begin::Portlet-->
                <div class="m-portlet m-portlet--tab">
                    <div class="row">
                        <div class="col-lg-12 margin-tb">
                            <div class="pull-left">
                                <div class="m-portlet__head">
                                    <div class="m-portlet__head-caption">
                                        <div class="m-portlet__head-title">
                                            <span class="m-portlet__head-icon m--hide">
                                                <i class="la la-gear"></i>
                                            </span>
                                            <h3 class="m-portlet__head-text">
                                                    Edit New User
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                             </div>
                            <div class="m--pull-right-mod">
                                <a class="btn btn-primary" href="{{ route('user_dashboard.index') }}"> Back</a>
                            </div>
                        </div>
                    </div>

        @if (count($errors) > 0)
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
        </div>
        @endif
        {!! Form::model($user, ['method' => 'PATCH','route' => ['user_dashboard.update', $user->id]]) !!}
        <form class="m-form m-form--fit m-form--label-align-right">
            <div class="m-portlet__body">

                <div class="m-form__group form-group row">
                    <label class="col-3 col-form-label">Name:</label>
                        <div class="col-6">
                            {!! Form::text('name', null, array('placeholder' => 'Name','class' => 'form-control')) !!}
                        </div>
                </div>
                <div class="m-form__group form-group row">
                    <label class="col-3 col-form-label">Email:</label>
                    <div class="col-6">
                            {!! Form::text('email', null, array('placeholder' => 'Email','class' => 'form-control')) !!}
                    </div>
                </div>
                <div class="m-form__group form-group row">
                    <label class="col-3 col-form-label">Password:</label>
                    <div class="col-6">
                            {!! Form::password('password', array('placeholder' => 'Password','class' => 'form-control')) !!}
                    </div>
                </div>
                <div class="m-form__group form-group row">
                    <label class="col-3 col-form-label">Confirm Password:</label>
                    <div class="col-6">
                        {!! Form::password('confirm-password', array('placeholder' => 'Confirm Password','class' => 'form-control')) !!}
                    </div>
                </div>
                    <div class="m-form__group form-group row">
                        <label class="col-3 col-form-label">Role :</label>
                        <div class="col-6">
                            {!! Form::select('roles[]', $roles,$userRole, array('class' => 'form-control m-input m-input--square')) !!}
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>

            </div>
        </form>
        {!! Form::close() !!}
    </div>
</div>

@endsection

@section('script')

@endsection
