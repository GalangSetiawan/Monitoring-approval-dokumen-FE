import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup,Validators, ValidatorFn,ValidationErrors } from "@angular/forms";

import { MustMatch } from '../../_helper/must-match.validator';
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public titleHeader = "Master User";

  registerForm: FormGroup;
  submitted = false;
  errors = null;
  modelRegister = {email:'', oldPassword:''};
  isValidEmail = true;


  public imagePath;
  imgURL: any;
  public message: string;


  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      id                   : [null],
      foto                 : [''],
      nama                 : ['', Validators.required],
      cabang               : ['', Validators.required],
      jabatan              : ['', Validators.required],
      password_confirmation: ['', Validators.required],
      username             : ['', Validators.required],
      oldPassword          : [''],         
      roleId               : ['', Validators.required],
      email                : ['', [Validators.required, Validators.email]],
      password             : ['', [Validators.required, Validators.minLength(6)]],
    },{
      validatorPassword: MustMatch('password', 'password_confirmation'),
      validatorEmail: this.comparisonValidator()

    });
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  public comparisonValidator() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
       const control1 = group.controls['myControl1'];
       const control2 = group.controls['myControl2'];
       if (control1.value !== control2.value) {
          control2.setErrors({notEquivalent: true});
       } else {
          control2.setErrors(null);
       }
       return;
 };
}

  ListUser = [];
  getDataUser(){
    this.authService.getAllUser().subscribe(
      (result:any) => {
        console.log('Get data KPA success | getKPA ===>',result);
        this.ListUser = result.result;
        console.log('ListUser ===>',this.ListUser);
      },
      error => {
        console.log('Get data KPA error   | getKPA ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }


  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;
    if(this.windowMode == 'create'){
      this.registerForm.reset();
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Create</a></li>')
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #view').remove();
      this.registerForm.enable();
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #view').remove();
      this.registerForm.enable();
    }else if (this.windowMode == 'view'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="view"><a>View</a></li>')
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #edit').remove();
      this.registerForm.disable();
    }else if(this.windowMode == 'grid'){
      this.submitted = false;
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #view').remove();
    }
  }



  get f() { return this.registerForm.controls; }
  

  onOlPasswordChange(pass){
    console.log('onOlPasswordChange ====>',pass);


  }

 


  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }


  filterData = {username:null, nama:null,email:null}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.authService.searchUser(this.filterData).subscribe(
      result => {
        console.log('searchPPK PPK success | searchPPK ===>',result);
        this.ListUser = result.result;
        
      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {username:null, nama:null,email:null}
  }


  onOldPassType(pass){
    console.log('onOldPassType ===>',pass);
    this.authService.checkPassword(this.registerForm.value.id,{password:this.modelRegister.oldPassword}).subscribe(
      result => {
        console.log('checkPassword OldPassword success | checkPassword ===>',result);
        this.isValidEmail = result;
        
      },
      error => {
        console.log('checkPassword OldPassword error   | checkPassword ===>',error);
      }
    )
  }

  onEmailType(email){
    console.log('onEmailType ===>',email);
    console.log('modelRegister =>',this.modelRegister);

    this.authService.checkEmail({email:this.modelRegister.email}).subscribe(
      result => {
        console.log('checkEmail register success | checkEmail ===>',result);
        this.isValidEmail = result;
        
      },
      error => {
        console.log('checkEmail register error   | checkEmail ===>',error);
      }
    )

  }

  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.submitted = false;
    this.windowModeView('edit');
    this.registerForm.patchValue({
      id                   : row.data.id,
      created_at           : row.data.created_at,
      updated_at           : row.data.updated_at,
      nama                 : row.data.nama,
      username             : row.data.username,
      roleId               : row.data.roleId,
      roleName             : row.data.roleName,
      email                : row.data.email,
      cabang               : row.data.cabang,
      jabatan              : row.data.jabatan,
      // foto                 : row.data.foto,
    });
    console.log('this.registerForm Clik Edit ===>',this.registerForm.value)
  }

  onViewClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('view');
    this.registerForm.patchValue({
      id                   : row.data.id,
      created_at           : row.data.created_at,
      updated_at           : row.data.updated_at,
      nama                 : row.data.nama,
      username             : row.data.username,
      roleId               : row.data.roleId,
      roleName             : row.data.roleName,
      email                : row.data.email,
      cabang               : row.data.cabang,
      jabatan              : row.data.jabatan,
      foto                 : row.data.foto,
    });
    console.log('this.registerForm Clik Edit ===>',this.registerForm.value);
  }


  deleteDataUser = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataUser = row.data.namaPpk;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.authService.deleteUser(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteUser ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListUser = _.remove(this.ListUser, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteUser ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


  selectRole(roleId){
    switch(roleId){
      case 50:
        var roleName = "Super Admin"
        break;
      case 40:
        var roleName = "Admin"
        break;
      case 30:
        var roleName = "Setdit"
        break;
      case 20:
        var roleName = "KPA"
        break;
    }
    return roleName;
  }


  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  onSubmit() {
    this.submitted = true;
    console.log('onsubmit awal ====>',this.registerForm.value)

  
    if (this.registerForm.invalid) {
      console.log('invalid input ===>',this.registerForm.value);
      return;
    }else{
      this.registerForm.value.roleName = this.selectRole(this.registerForm.value.roleId);
      if(this.registerForm.value.id == null){ //do save
        console.log('do save ===>',this.registerForm.value)
        this.authService.register(this.registerForm.value).subscribe(
          result => {
            console.log(result);
            this.ListUser.push(result.user);
          },
          error => {
            this.errors = error.error;
          },
          () => {
            this.registerForm.reset()
            // this.router.navigate(['login']);
            this.windowModeView('grid');
          }
        )
        
      }else{//do update
        console.log('do update ===>',this.registerForm.value)

      }

      
    }
    
  }

  

}
