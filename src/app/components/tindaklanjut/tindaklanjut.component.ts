import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { TindaklanjutService } from './../../shared/tindaklanjut.service';
import { MasterkpaService } from './../../shared/masterkpa.service';
import { MasterppkService } from './../../shared/masterppk.service';
import { AuthService } from './../../shared/auth.service';
import * as $ from 'jquery'

import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import { identifierModuleUrl } from '@angular/compiler';

export class User {
  nama    : String;
  cabang  : String;
  jabatan : String;
  role    : String;
  username: String;
  id      : Number;
}

@Component({
  selector: 'app-tindaklanjut',
  templateUrl: './tindaklanjut.component.html',
  styleUrls: ['./tindaklanjut.component.css']
})
export class TindaklanjutComponent implements OnInit {

  public titleHeader = "Dokumen Tindak Lanjut";
  tindakLanjutForm :FormGroup;
  UserProfile = {id: null, nama: null, cabang: null, jabatan: null, username: null,role: null};
  isLoading   = false;
  submitted   = false;
  errors      = null;
  constructor(
    public tindakLanjutService: TindaklanjutService,
    public masterKpaService   : MasterkpaService,
    public masterPpkService   : MasterppkService,
    private token             : TokenService,
    public fb                 : FormBuilder,
    private authState         : AuthStateService,
    public authService        : AuthService ,
    
  ) {

    this.tindakLanjutForm = this.fb.group({
      id         : [null],
      created_at : [null],
      updated_at : [null],
      status     : [null],
      nama       : [null],
      namaKpa    : [null],
      namaPpk    : [null],
      isDeleted  : [null],
      catatan    : [null],
      
      noDokumen  : ['', Validators.required],
      namaDokumen: ['', Validators.required],
      tglDariBpk : ['', Validators.required],
      tglKePpk   : ['', Validators.required],
      idKpa      : ['', Validators.required],
      idPpk      : ['', Validators.required],
      fileDokumen: [undefined, Validators.required],
    });


    // =========================Get user==============================
    // this.authService.profileUser().subscribe((data:any) => {
    //   console.log('profileUser | tindakLanjut ====>',data),
    //     this.UserProfile = data;
    // })
    // =========================Get user==============================

    

   }



  ngOnInit(): void {

    this.getDataTindakLanjut();
    this.getDataKPA();

  }

  get f() { return this.tindakLanjutForm.controls; }

  modelTindakLanjut = {id:null,noDokumen:null, namaDokumen:null,fileDokumen:undefined, tglDariBpk:null, tglKePpk:null , idKpa:null, idPpk:null, status:null, idUser:null};

  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;

    if(this.windowMode == 'create'){
      this.modelTindakLanjut = {id:null,noDokumen:null, namaDokumen:null,fileDokumen:undefined, tglDariBpk:null, tglKePpk:null , idKpa:null, idPpk:null, status:null, idUser:null};
      this.tindakLanjutForm.reset();
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Create</a></li>')
      $('.uk-breadcrumb #edit').remove();
      this.submitted = false;
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
      this.submitted = false;
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
    }
  }


  ListPPK = [];
  onKpaChange(id){
    this.masterPpkService.getPPK().subscribe(
      result => {
        console.log('Get data PPK success | getPPK ===>',result);        
        var ppkById = _.remove(result.result, function(n){
          return n.idKpa == id; 
        })
        this.ListPPK = ppkById;

        console.log('ListPPK ===>',this.ListPPK);
      },
      error => {
        console.log('Get data PPK error   | getPPK ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  ListKPA = [];
  getDataKPA(){
    this.isLoading = true;
    this.masterKpaService.getKPA().subscribe(
      result => {
        this.isLoading = false;
        console.log('Get data KPA success | getKPA ===>',result);
        this.ListKPA = result.result;
        console.log('ListKPA ===>',this.ListKPA);
      },
      error => {
        this.isLoading = false;
        console.log('Get data KPA error   | getKPA ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }





  ListTindakLanjut = [];
  getDataTindakLanjut(){
    this.isLoading = true;
    this.tindakLanjutService.getTindakLanjut().subscribe(
      data => {
        this.isLoading = false;
        console.log('Get data TindakLanjut success | TindakLanjut ===>',data);
        this.ListTindakLanjut = data.result;
        console.log('ListTindakLanjut ===>',this.ListTindakLanjut);
      },
      error => {
        this.isLoading = false;
        console.log('Get data TindakLanjut error   | TindakLanjut ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }


  KPAobject = { id:null };
  getDataTindakLanjutbyId(id){
    this.KPAobject = { id:null };
    this.tindakLanjutService.getTindakLanjutbyId(id).subscribe(
      result => {
        console.log('Get data TindakLanjut by id success | getKPA ===>',result);
        this.KPAobject = result.result[0];
      },
      error => {
        console.log('Get data TindakLanjut by id error   | getKPA ===>',error);
        notify({ message: "Whoops! failed to Get data TindakLanjut by ID",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }


  onDownloadClick(row){
    console.log('row.data ===>',row.data);
    this.isLoading = true
    // this.tindakLanjutService.downloadDocument(row.data.fileDokumen).subscribe(
    //   result => {
    //     this.isLoading = false; mmmmmmmmmmmmmmmmmmmmm
    //     console.log('download dokumen sukses',result)
    //   },error =>{
    //     this.isLoading = false;
    //     console.log('download dokumen Gagal',error)  
    //   }
    // );


    this.tindakLanjutService.downloadDocument(row.data.fileDokumen).subscribe(
      (result:any) => {
        this.isLoading = false;
        console.log('download dokumen sukses',result);

        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(result)
        a.href = objectUrl
        a.download = 'archive.jpg';
        a.click();
        URL.revokeObjectURL(objectUrl);



      },error =>{
        this.isLoading = false;
        console.log('download dokumen Gagal',error)
        if(error.result !== undefined){
          notify({ message: "Whoops!" +error.result ,position: {my: "center top",at: "center top"}}, "error", 3000)
        }else{
          notify({ message: "Whoops! Gagal mengunduh data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      }
    );
    

  }

 
  downloadImage() {
    this.tindakLanjutService.getImage().subscribe(img => {
      const url = URL.createObjectURL(img);
      const a = document.createElement('a');
      a.download = "Batman.png";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    });
  }




  formKPA = {};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.modelTindakLanjut = row.data;
    this.tindakLanjutForm.patchValue({
      id         : row.data.id,
      created_at : row.data.created_at,
      updated_at : row.data.updated_at,
      status     : row.data.status,
      nama       : row.data.nama,
      namaKpa    : row.data.namaKpa,
      catatan    : row.data.catatan,
      namaPpk    : row.data.namaPpk,
      isDeleted  : row.data.isDeleted,
      noDokumen  : row.data.noDokumen,
      namaDokumen: row.data.namaDokumen,
      tglDariBpk : row.data.tglDariBpk,
      tglKePpk   : row.data.tglKePpk,
      idKpa      : row.data.idKpa,
      idPpk      : row.data.idPpk,
      idUser     : row.data.idUser,
    });
    console.log('this.tindakLanjutForm Clik Edit ===>',this.tindakLanjutForm.value);

  }



  deleteDataTindakLanjut = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataTindakLanjut = row.data.noDokumen;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);
    this.tindakLanjutService.deleteTindakLanjut(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteTindakLanjut ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListTindakLanjut = _.remove(this.ListTindakLanjut, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteTindakLanjut ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }

  onDateChange(date){
    console.log('onDateChange ===>',date) //2020-08-01
    var split = date.split('-');
    var result = split[2] +'-' +split[1] + '-'+split[0]
    console.log('onDateChange | Default | Result ===>',date, result);
    return result; //01-08-2020
  }

  dateFormatYtoD(date){
    console.log('onDateChange ===>',date) //01-08-2020
    var split = date.split('-');
    var result = split[1] +'-' +split[1] + '-'+split[0]
    console.log('onDateChange | Default | Result ===>',date, result);
    return result; //01-08-2020
  }

  handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.modelTindakLanjut.fileDokumen = files;
    console.log('uploadFileName ===>',this.modelTindakLanjut.fileDokumen);
  }

  onSubmit() {  
    this.submitted = true;

    if(this.modelTindakLanjut.fileDokumen !== undefined){
      this.tindakLanjutForm.value.fileDokumen = this.modelTindakLanjut.fileDokumen;
    }

    // this.tindakLanjutForm.value.idUser = this.UserProfile.id;


    if(this.tindakLanjutForm.value.id == null){ //do save
      console.log('this.tindakLanjutForm.value ===>',this.tindakLanjutForm.value);
      console.log('this.windowMode ===>',this.windowMode)

      this.tindakLanjutService.createTindakLanjut(this.tindakLanjutForm.value).subscribe(
        result => {
          this.isLoading = false;
          console.log('create success | createTindakLanjut ===>',result)
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.ListTindakLanjut.push(result.result)
          this.windowModeView('grid');
        },
        error => {
          this.isLoading = false;
          console.log('create error   | createTindakLanjut ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )


    }else{ // do update
      if (this.tindakLanjutForm.invalid) {
        console.log('tindakLanjutForm invalid update')
        return;
      }else{
        console.log('tindakLanjutForm  update valid===>',this.tindakLanjutForm.value);


        this.tindakLanjutService.updateTindakLanjut(this.tindakLanjutForm.value).subscribe(
          result => {
            this.isLoading = false;
            console.log('update success | updateTindakLanjut ===>',result)
            notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
            this.windowModeView('grid');
            console.log('ListTindakLanjut ===>',this.ListTindakLanjut);
  
          },
          error => {
            this.isLoading = false;
            console.log('update error   | updateTindakLanjut ===>',error);
            notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
          }
        )
  
  
      }
    }


    

    
  }




}
