<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Validator;
use DB;

class RoleController extends Controller
{
    //

    public function index(Request $request){
        $breadcrumb['!end!'] = 'Role';

        $roles = Role::orderBy('id', 'DESC')
        ->where('id', '!=', 1)->paginate(5);

        return view('roles.index', compact('roles', 'breadcrumb'))
        ->with('i', ($request->input('page', 1) - 1) * 5);
    }

    public function create()
    {
        $permission = Permission::get();
        $permission = $permission->mapToGroups(function ($item){
            $arr = explode(' ',trim($item->name));
            return array(
                $arr[0] => array(
                    (int)$item->id => (strpos($item->name, $arr[0]) ? $item->name : $item->name )
                )
            );
        });

        $breadcrumb['roles'] = 'Role';
		$breadcrumb['!end!'] = 'Buat Role';

        return view('roles.create',compact('permission','breadcrumb'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:roles,name',
            'permission' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()->route('roles.create')
                    ->withErrors($validator)
                    ->withInput();
        }

        $role = Role::create(['name' => $request->input('name')]);
        $role->syncPermissions($request->input('permission'));

        return redirect()->route('roles.index')
                        ->with('success','Berhasil membuat role.');
    }

    public function edit($id)
    {
        if ($id == 1) {
            abort(404);
        }

        $breadcrumb['roles'] = 'Role';
		$breadcrumb['!end!'] = 'Ubah Role';

        $role = Role::find($id);
        $permission = Permission::get();
        $permission = $permission->mapToGroups(function ($item) {
            $arr = explode(' ',trim($item->name));
            return array(
                $arr[0] => array(
                    (int)$item->id => (strpos($item->name, $arr[0]) ? $item->name : $item->name )
                )
            );
        });

        $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id",$id)
            ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
            ->all();


        return view('roles.edit',compact('role','permission','rolePermissions','breadcrumb'));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'permission' => 'required',
        ]);


        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();


        $role->syncPermissions($request->input('permission'));


        return redirect()->route('roles.index')
                        ->with('success','Berhasil mengubah role.');
    }
}
