<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\UserModel;
use Response;


class TestController extends Controller
{
	
	
	
	/**
	* Display a listing of the resource.
			     *
			     * @return \Illuminate\Http\Response
			     */
			    public function index()
			    {
		//
	}
	
	
	
	
	/**
	* Show the form for creating a new resource.
			     *
			     * @return \Illuminate\Http\Response
			     */
			    public function create()
			    {
		//
	}
	
	
	
	
	/**
	* Store a newly created resource in storage.
			     *
			     * @param  \Illuminate\Http\Request  $request
			     * @return \Illuminate\Http\Response
			     */
			    public function store(Request $request)
			    {
		//
	}
	
	
	
	
	/**
	* Display the specified resource.
			     *
			     * @param  int  $id
			     * @return \Illuminate\Http\Response
			     */
			    public function show($id)
			    {
		//
	}
	
	
	
	
	/**
	* Show the form for editing the specified resource.
			     *
			     * @param  int  $id
			     * @return \Illuminate\Http\Response
			     */
			    public function edit($id)
			    {
		//
	}
	
	
	
	
	/**
	* Update the specified resource in storage.
			     *
			     * @param  \Illuminate\Http\Request  $request
			     * @param  int  $id
			     * @return \Illuminate\Http\Response
			     */
			    public function update(Request $request, $id)
			    {
		//
	}
	
	
	
	
	/**
	* Remove the specified resource from storage.
			     *
			     * @param  int  $id
			     * @return \Illuminate\Http\Response
			     */
			    public function destroy($id)
			    {
		//
	}
	public function getAlluser()
			    {
		$allUser = DB::select("select * from user");
		return response()->json([ "data"=>$allUser,"status" => 200]);
	}
	
	public function addUser(Request $request){
		$UserModel = new UserModel;
		
		$UserModel->username = $request->username;
		$UserModel->password = $request->password;
		$UserModel->status = $request->status;
		$UserModel->brach = $request->brach;
		$UserModel->save();
		
		
		if( $UserModel->save()){
			return response()->json(["status"=>200,"message"=>"Insert Success"]);
		}
		else{
			return response()->json(["status"=>400,"message"=>"can t Insert"]);
		}
		
	}
	
	public function editUser(Request $request,$id){
        $UserModel = new UserModel;
		$UserModel= UserModel::find($id);
		
		$UserModel->username = $request->username;
		$UserModel->password = $request->password;
		$UserModel->status = $request->status;
		$UserModel->brach = $request->brach;
		$UserModel->save();
		
		if($UserModel->save()){
			return response()->json(["status"=>200,"message"=>"Update Success"]);
		}
		else{
			return response()->json(["status"=>400,"message"=>"can t Update"]);
		}
	}
	
	public function delUser ($id){
		$userdelete = UserModel::where('id', $id);
		$userdelete->delete();
		
		return response()->json(["status"=>200,"message"=>"Delete Success"]);
	}
}
