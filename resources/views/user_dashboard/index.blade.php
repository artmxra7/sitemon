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
<div class="m-subheader ">
    <div class="d-flex align-items-center">
        <div class="mr-auto">
            <h3 class="m-subheader__title m-subheader__title--separator">User Dashboard</h3>
            <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
                <li class="m-nav__item m-nav__item--home">
                    <a href="{{ url('/') }}" class="m-nav__link m-nav__link--icon">
                        <i class="m-nav__link-icon la la-home"></i>
                    </a>
                </li>
                <li class="m-nav__separator">-</li>
                <li class="m-nav__item">
                    <a href="#" class="m-nav__link">
                        <span class="m-nav__link-text">Setting</span>
                    </a>
                </li>
                <li class="m-nav__separator">-</li>
                <li class="m-nav__item">
                    <a href="#" class="m-nav__link">
                        <span class="m-nav__link-text">User Dashboard</span>
                    </a>
                </li>
            </ul>
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
                                Daftar User Dashboard
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="m-portlet__body">

                    @if ($message = Session::get('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						</button>
						{{ $message }}
					</div>
                    @endif
                    <!--begin::Section-->
                    <div class="m-section">
                        <div class="m-section__sub">
                            @can('user create')
                                <a href="{{ route('user_dashboard.create') }}" class="btn m-btn--pill btn-focus btn-primary m-btn m-btn--label-brand m-btn--bolder m-btn--icon"><i class="la la-plus-circle"></i> Buat User</a>
                            @endcan
                        </div>
                        <div class="m-section__content">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Roles</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($data as $key => $user)
                                         <tr>
                                           <td>{{ ++$i }}</td>
                                           <td>{{ $user->name }}</td>
                                           <td>{{ $user->email }}</td>
                                           <td>
                                             @if(!empty($user->getRoleNames()))
                                               @foreach($user->getRoleNames() as $value)
                                                  {{ $value }}
                                               @endforeach
                                             @endif
                                           </td>
                                           <td>
                                               {{--  <a class="btn btn-info" href="{{ route('user_dashboard.show',$user->id) }}">Detail</a>  --}}
                                              @can('user edit')
                                                <a class="btn btn-primary" href="{{ route('user_dashboard.edit',$user->id) }}">Edit</a>
                                              @endcan
                                              @can('user delete')
                                               {!! Form::open(['method' => 'DELETE','route' => ['user_dashboard.destroy', $user->id],'style'=>'display:inline']) !!}
                                                   {!! Form::submit('Hapus', ['class' => 'btn btn-danger']) !!}
                                               {!! Form::close() !!}
                                              @endcan
                                           </td>
                                         </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {!! $data->render() !!}
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
