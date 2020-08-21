import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { TindaklanjutService } from './../../shared/tindaklanjut.service';
import { MasterkpaService } from './../../shared/masterkpa.service';
import { MasterppkService } from './../../shared/masterppk.service';
import { AuthService } from './../../shared/auth.service';
import { ApprovaldocService } from './../../shared/approvaldoc.service';
import * as $ from 'jquery'
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';

export class User {
  nama    : String;
  cabang  : String;
  jabatan : String;
  role    : String;
  username: String;
  id      : Number;
}


@Component({
  selector: 'app-approvaldoc',
  templateUrl: './approvaldoc.component.html',
  styleUrls: ['./approvaldoc.component.css']
})
export class ApprovaldocComponent implements OnInit {

  public titleHeader = "Dokumen Approval";
  approvalForm :FormGroup;
  UserProfile = {id: null, nama: null, cabang: null, jabatan: null, username: null,role: null};
  isLoading   = false;
  submitted   = false;
  errors      = null;


  constructor(
    public approvalDocService : ApprovaldocService,
    public tindakLanjutService: TindaklanjutService,
    public masterKpaService   : MasterkpaService,
    public masterPpkService   : MasterppkService,
    private token             : TokenService,
    public fb                 : FormBuilder,
    private authState         : AuthStateService,
    public authService        : AuthService ,
    
  ) {

    this.approvalForm = this.fb.group({
      id            : [null],
      created_at    : [null],
      updated_at    : [null],
      status        : [null],
      nama          : [null],
      namaKpa       : [null],
      namaPpk       : [null],
      isDeleted     : [null],
      catatan       : [null],
      noDokumenApv  : [null],
      idTindakLanjut: ['', Validators.required],
      noDokumen     : ['', Validators.required],
      tglApproval   : ['', Validators.required],
      namaDokumenApv: ['', Validators.required],
      tglDariBpk    : ['', Validators.required],
      tglKePpk      : ['', Validators.required],
      idKpa         : ['', Validators.required],
      idPpk         : ['', Validators.required],
      fileDokumen   : [undefined, Validators.required],
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
    this.getDataApprovalDoc();
  }

  get f() { return this.approvalForm.controls; }

  modelApprovalDoc = {id:null,noDokumen:null,idTindakLanjut:null, namaDokumenApv:null,fileDokumen:undefined, tglDariBpk:null, tglKePpk:null , idKpa:null, idPpk:null, status:null, idUser:null};

  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;

    if(this.windowMode == 'create'){
      this.modelApprovalDoc = {id:null,noDokumen:null,idTindakLanjut:null, namaDokumenApv:null,fileDokumen:undefined, tglDariBpk:null, tglKePpk:null , idKpa:null, idPpk:null, status:null, idUser:null};
      this.approvalForm.reset();
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Create</a></li>');
      this.submitted = false;
      $('.uk-breadcrumb #edit').remove();
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
        console.log('Get data TindakLanjut success | getTindakLanjut ===>',data);

    
        this.ListTindakLanjut = data.result;

        
        console.log('ListTindakLanjut ===>',this.ListTindakLanjut);
      },
      error => {
        this.isLoading = false;
        console.log('Get data TindakLanjut error   | getTindakLanjut ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  ListApprovalDoc = [];
  getDataApprovalDoc(){
    this.isLoading = true;
    this.approvalDocService.getApprovalDoc().subscribe(
      data => {
        this.isLoading = false;
        this.ListApprovalDoc = data.result;
        console.log('Get data getApprovalDoc success | getApprovalDoc ===>',data);
      },
      error => {
        this.isLoading = false;
        console.log('Get data getApprovalDoc error   | getApprovalDoc ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  onDownloadClick(row){
    console.log('row.data ===>',row.data);
    this.isLoading = true
    // this.tindakLanjutService.downloadDocument(row.data.fileDokumen).subscribe(
    //   result => {
    //     this.isLoading = false;
    //     console.log('download dokumen sukses',result)
    //   },error =>{
    //     this.isLoading = false;
    //     console.log('download dokumen Gagal',error)  
    //   }
    // );


    this.approvalDocService.downloadDocument(row.data.fileDokumen).subscribe(
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
        console.log('download dokumen Gagal',error);
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
      const a   = document.createElement('a');
      a.download = "Batman.png";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    });
  }


  onDocumentNumberChanged(idDocument){
    console.log('onDocumentNumberChanged ====>',idDocument);
    
    this.isLoading = true;
    this.tindakLanjutService.getTindakLanjutbyId(idDocument).subscribe(
      data => {
        this.isLoading = false;
        console.log('Get data Tindak Lanjut success | getTindakLanjutbyId ===>',data);
        if(data.result.length > 0){
          
        
          this.approvalForm.patchValue({
            idKpa     : data.result[0].idKpa,
            noDokumen : data.result[0].noDokumen,
            tglKePpk  : data.result[0].tglKePpk,
            tglDariBpk: data.result[0].tglDariBpk,
          });

          this.masterPpkService.getPPK().subscribe(
            result => {
              console.log('Get data PPK success | getPPK ===>',result);        
              var ppkById = _.remove(result.result, function(n){
                return n.idKpa == data.result[0].idKpa; 
              })
              this.ListPPK = ppkById;
              this.approvalForm.patchValue({ idPpk  :data.result[0].idPpk,})
      
              console.log('ListPPK ===>',this.ListPPK);
            },
            error => {
              console.log('Get data PPK error   | getPPK ===>',error);
              notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
            }
          )


        }
       
      },
      error => {
        this.isLoading = false;
        console.log('Get data Tindak Lanjut error   | getTindakLanjutbyId ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }

  formKPA = {};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.modelApprovalDoc = row.data;
    this.approvalForm.patchValue({
      id            : row.data.id,
      created_at    : row.data.created_at,
      updated_at    : row.data.updated_at,
      status        : row.data.status,
      nama          : row.data.nama,
      namaKpa       : row.data.namaKpa,
      catatan       : row.data.catatan,
      namaPpk       : row.data.namaPpk,
      isDeleted     : row.data.isDeleted,
      noDokumen     : row.data.noDokumen,
      noDokumenApv  : row.data.noDokumen,
      namaDokumenApv: row.data.namaDokumen,
      tglDariBpk    : row.data.tglDariBpk,
      tglKePpk      : row.data.tglKePpk,
      tglApproval   : row.data.tglApproval,
      idKpa         : row.data.idKpa,
      idPpk         : row.data.idPpk,
      idUser        : row.data.idUser,
      idTindakLanjut: row.data.idTindakLanjut,
    });

    this.masterPpkService.getPPK().subscribe(
      result => {
        console.log('Get data PPK success | getPPK ===>',result);        
        var ppkById = _.remove(result.result, function(n){
          return n.idKpa == row.data.idKpa; 
        })
        this.ListPPK = ppkById;
        this.approvalForm.patchValue({ idPpk  :row.data.idPpk})

        console.log('ListPPK ===>',this.ListPPK);
      },
      error => {
        console.log('Get data PPK error   | getPPK ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

    console.log('this.approvalForm Clik Edit ===>',this.approvalForm.value);

  }



  deleteDataApprovalDoc = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataApprovalDoc = row.data.noDokumen;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);
    this.approvalDocService.deleteApprovalDoc(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteApprovalDoc ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListApprovalDoc = _.remove(this.ListApprovalDoc, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteApprovalDoc ===>',error);
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

  handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.modelApprovalDoc.fileDokumen = files;
    console.log('uploadFileName ===>',this.modelApprovalDoc.fileDokumen);
  }

  onSubmit() {  
    this.submitted = true;

    if(this.modelApprovalDoc.fileDokumen !== undefined){
      this.approvalForm.value.fileDokumen = this.modelApprovalDoc.fileDokumen;
    }

    this.approvalForm.value.idUser = this.UserProfile.id;


    if(this.approvalForm.value.id == null){ //do save
      console.log('this.approvalForm.value ===>',this.approvalForm.value);
      console.log('this.windowMode ===>',this.windowMode)

      this.approvalDocService.createApprovalDoc(this.approvalForm.value).subscribe(
        data => {
          this.isLoading = false;
          console.log('create success | createApprovalDoc ===>',data)
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.ListApprovalDoc.push(data.result)
          this.windowModeView('grid');
        },
        error => {
          this.isLoading = false;
          console.log('create error   | createApprovalDoc ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )


    }else{ // do update
      if (this.approvalForm.invalid) {
        console.log('approvalForm invalid update')
        return;
      }else{
        console.log('approvalForm  update valid===>',this.approvalForm.value);


        this.approvalDocService.updateApprovalDoc(this.approvalForm.value).subscribe(
          result => {
            this.isLoading = false;
            console.log('update success | updateApprovalDoc ===>',result)
            notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
            this.windowModeView('grid');
            console.log('ListApprovalDoc ===>',this.ListApprovalDoc);
  
          },
          error => {
            this.isLoading = false;
            console.log('update error   | updateApprovalDoc ===>',error);
            notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
          }
        )
  
  
      }
    }


    

    
  }


}
