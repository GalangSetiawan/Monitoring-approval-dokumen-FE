import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MastersatkerService } from './../../shared/mastersatker.service';
import { MasterppkService } from './../../shared/masterppk.service';
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-masterppk',
  templateUrl: './masterppk.component.html',
  styleUrls: ['./masterppk.component.css']
})
export class MasterppkComponent implements OnInit {

  public titleHeader = "Master PPK";
  form: FormGroup;


  constructor(
    public masterSatkerService: MastersatkerService,
    public masterPpkService: MasterppkService,
    private token: TokenService,
    private authState: AuthStateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      namaPpk     : new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      satkerId     : new FormControl("",Validators.compose([
        Validators.required,
      ])),
       
    });

    this.getDataSatker();
    this.getDataPPK();
    $('#breadCrumbTitle a').text(this.titleHeader);
    this.selectActiveMenu('masterppk');

  }

  selectActiveMenu(opened){
    this.removeActiveMenu();
    if(opened == 'dashboard'){
      $('#listMenu #dashboard').addClass('uk-active');
    }else if(opened == 'blog'){
      $('#listMenu #blog').addClass('uk-active');
    }else if(opened == 'dokumenTemuan'){
      $('#listMenu #dokumenTemuan').addClass('uk-active');
    }else if(opened == 'tindaklanjutv2'){
      $('#listMenu #tindaklanjutv2').addClass('uk-active');
    }else if(opened == 'tindaklanjut'){
      $('#listMenu #tindaklanjut').addClass('uk-active');
    }else if(opened == 'approvaldoc'){
      $('#listMenu #approvaldoc').addClass('uk-active');
    }else if(opened == 'masterkpa'){
      $('#listMenu #masterkpa').addClass('uk-active');
    }else if(opened == 'masterppk'){
      $('#listMenu #masterppk').addClass('uk-active');
    }else if(opened == 'cabang'){
      $('#listMenu #cabang').addClass('uk-active');
    }else if(opened == 'satker'){
      $('#listMenu #satker').addClass('uk-active');
    }else if(opened == 'register'){
      $('#listMenu #register').addClass('uk-active');
    }else if(opened == 'login'){
      $('#listMenu #login').addClass('uk-active');
    }else if(opened == 'profile'){
      $('#listMenu #profile').addClass('uk-active');
    }else if(opened == 'register'){
      $('#listMenu #register').addClass('uk-active');
    }
  }


  removeActiveMenu(){
    $('#listMenu #dashboard').removeClass('uk-active');
    $('#listMenu #dokumenTemuan').removeClass('uk-active');
    $('#listMenu #tindaklanjutv2').removeClass('uk-active');
    $('#listMenu #tindaklanjut').removeClass('uk-active');
    $('#listMenu #approvaldoc').removeClass('uk-active');
    $('#listMenu #masterppk').removeClass('uk-active');
    $('#listMenu #cabang').removeClass('uk-active');
    $('#listMenu #blog').removeClass('uk-active');
    $('#listMenu #satker').removeClass('uk-active');
    $('#listMenu #register').removeClass('uk-active');
    $('#listMenu #login').removeClass('uk-active');
    $('#listMenu #profile').removeClass('uk-active');
    $('#listMenu #register').removeClass('uk-active');
  }




  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;
    if(this.windowMode == 'create'){
      this.formPPK = {satkerId:this.dataSatker.id, namaSatker:this.dataSatker.namaSatker, namaPpk:null,id:null};
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Buat</a></li>')
      $('.uk-breadcrumb #edit').remove();
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
    }
  }

  ListSatker = [];
  getDataSatker(){
    this.masterSatkerService.getSatker().subscribe(
      result => {
        console.log('Get data Satker success | getSatker ===>',result);
        this.ListSatker = result.result;
        console.log('ListSatker ===>',this.ListSatker);
      },
      error => {
        console.log('Get data Satker error   | getSatker ===>',error);

        if(!error.error.isAuthorized){
          this.errorTokenHabis();
        }else{
          Swal.fire(
            'Whoops Failed', 
            'Tidak Berhasil Mengambil Data', 
            'error'
          )
        }        
      }
    )
  }



  errorTokenHabis(){
    Swal.fire(
      'Whoops! Waktu Akses Habis', 
      'Harap Login ulang untuk melanjutkan', 
      'error'
    )
    $('#parentSignOut').click();
  }

  ListPPK = [];
  dataSatker:any = {};
  getDataPPK(){
    this.masterPpkService.getPPK().subscribe(
      data => {
        console.log('Get data PPK success | getPPK ===>',data);
        this.ListPPK = data.result;
        this.dataSatker = data.dataSatker;
        console.log('ListPPK ===>',this.ListPPK);
        console.log('dataSatker ===>',this.dataSatker);
      },
      error => {
        console.log('Get data PPK error   | getPPK ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak Berhasil Mengambil Data', 
          'error'
        )
      }
    )
  }

  
  formPPK:any = {};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.formPPK = row.data;
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }


  filterData = {satkerId:null, namaPpk:""}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.masterPpkService.searchPPK(this.filterData).subscribe(
      data => {
        console.log('searchPPK PPK success | searchPPK ===>',data);
        this.ListPPK = data.result;
      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
        Swal.fire(
          'Whoops Failed', 
          'Tidak Berhasil Menemukan Data', 
          'error'
        )
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {satkerId:null, namaPpk:""}
  }

  deleteDataPpk = "";
  selectedForDelete:any = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataPpk = row.data.namaPpk;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.masterPpkService.deletePPK(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deletePPK ===>',result)
        // notify({ message: "Yayyy! Berhasil menghapus data",position: { my: "center top",at: "center top"}}, "success", 3000);
        Swal.fire(
          'Yay Success!', 
          'Data berhasil dihapus', 
          'success'
        )
        this.ListPPK = _.remove(this.ListPPK, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deletePPK ===>',error);
        // notify({ message: "Whoops! Gagal menghapus data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak Berhasil Menghapus Data', 
          'error'
        )
      }
    )

  }


  doSave(data){

    if(this.windowMode =='create'){
      console.log('doSave | data ===>',this.formPPK);
      this.masterPpkService.createPPK(this.formPPK).subscribe(
        result => {
          console.log('create success | createPPK ===>',result)
          // notify({ message: "Yayyy! Berhasil Menambahkan data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil ditambahkan', 
            'success'
          )
          this.windowModeView('grid');

          this.ListPPK.push(result.result)

          console.log('ListSatker after create ===>',this.ListPPK)

        },
        error => {
          console.log('create error   | createPPK ===>',error);
          // notify({ message: "Whoops! Gagal Menambahkan data, "+ error.error.message +" ",position: {my: "center top",at: "center top"}}, "error", 3000)
          Swal.fire(
            'Whoops Failed', 
            'Data tidak berhasil ditambahkan', 
            'error'
          )
        }
      )
    }else{
      console.log('do update Data ===>',this.formPPK)
      this.masterPpkService.updatePPK(this.formPPK).subscribe(
        result => {
          console.log('update success | updatePPK ===>',result)
          // notify({ message: "Yayyy! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil disimpan', 
            'success'
          )
          this.windowModeView('grid');
          console.log('ListSatker ===>',this.ListSatker);

        },
        error => {
          console.log('update error   | updatePPK ===>',error);
          // notify({ message: "Whoops! Gagal update data",position: {my: "center top",at: "center top"}}, "error", 3000)
          Swal.fire(
            'Whoops Failed', 
            'Data tidak berhasil simpan', 
            'error'
          )
        }
      )
    }
    
    
  }



}
