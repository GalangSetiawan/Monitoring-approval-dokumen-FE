import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MastersatkerService } from './../../shared/mastersatker.service';

import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-satker',
  templateUrl: './satker.component.html',
  styleUrls: ['./satker.component.css']
})
export class SatkerComponent implements OnInit {

  public titleHeader = "Master Satker";

  constructor(
    public masterSatkerService: MastersatkerService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }

  ngOnInit() {
 
    this.getDataSatker();


    $('#breadCrumbTitle a').text(this.titleHeader);
    this.selectActiveMenu('satker')
  }


  selectActiveMenu(opened){
    this.removeActiveMenu();
    $('#listMenu ul .listMenu').removeClass('uk-active');
    if(opened == 'dashboard'){
      $('#listMenu #dashboard').addClass('uk-active');
    }else if(opened == 'dokumenTemuan'){
      $('#listMenu #dokumenTemuan').addClass('uk-active');
    }else if(opened == 'dokumentemuaninspektorat'){
      $('#listMenu #dokumentemuaninspektorat').addClass('uk-active');
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
    $('#listMenu #dokumentemuaninspektorat').removeClass('uk-active');
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
      this.formSatker = {namaPpk:'',id:null,alamat:''};
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
      data => {
        console.log('Get data Satker success | getSatker ===>',data);
        this.ListSatker = data.result;
        console.log('ListSatker ===>',this.ListSatker);
      },
      error => {
        console.log('Get data Satker error   | getSatker ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak dapat mengambil data', 
          'error'
        )
      }
    )
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }
  
  filterData = {namaSatker : ""}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.masterSatkerService.searchSatker(this.filterData).subscribe(
      data => {
        console.log('searchSatker Satker success | searchSatker ===>',data);
        this.ListSatker = data.result;
      },
      error => {
        console.log('searchSatker Satker error   | searchSatker ===>',error);
      }
    )
  }

  
  deleteDataSatker = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataSatker = row.data.namaSatker;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.masterSatkerService.deleteSatker(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteSatker ===>',result)
        // notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);

        Swal.fire(
          'Yay Success!', 
          'Data berhasil dihapus', 
          'success'
        )

        this.ListSatker = _.remove(this.ListSatker, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteSatker ===>',error);
        // notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak Berhasil Menghapus Data', 
          'error'
        )
      }
    )

  }



  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = { namaSatker:""}
  }


  
  formSatker:any = {};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.formSatker = row.data;
  }

  doSave(data){
    if(this.windowMode == 'create'){
      console.log('doSave | data ===>',data);
      this.masterSatkerService.createSatker(data).subscribe(
        data => {
          console.log('create success | createSatker ===>',data)
          // notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil ditambahkan', 
            'success'
          )

          this.windowModeView('grid');

          this.ListSatker.push(data.result)

       
        },
        error => {
          console.log('create error   | createSatker ===>',error);
          // notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
          Swal.fire(
            'Whoops Failed', 
            'Data tidak berhasil ditambahkan', 
            'error'
          )
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.masterSatkerService.updateSatker(data).subscribe(
        result => {
          console.log('update success | updateSatker ===>',result)
          // notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil disimpan', 
            'success'
          )
          this.windowModeView('grid');

        },
        error => {
          console.log('update error   | updateSatker ===>',error);
          // notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
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



