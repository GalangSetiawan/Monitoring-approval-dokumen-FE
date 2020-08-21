import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MasterkpaService } from './../../shared/masterkpa.service';
import { MasterppkService } from './../../shared/masterppk.service';
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'


@Component({
  selector: 'app-masterppk',
  templateUrl: './masterppk.component.html',
  styleUrls: ['./masterppk.component.css']
})
export class MasterppkComponent implements OnInit {

  public titleHeader = "Master PPK";
  form: FormGroup;


  constructor(
    public masterKpaService: MasterkpaService,
    public masterPpkService: MasterppkService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      namaPpk     : new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      idKpa     : new FormControl("",Validators.compose([
        Validators.required,
      ])),
       
    });

    this.getDataKPA();
    this.getDataPPK();
  }



  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;
    if(this.windowMode == 'create'){
      this.formPPK = {idKpa:null, namaPpk:null,id:null};
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Create</a></li>')
      $('.uk-breadcrumb #edit').remove();
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
    }
  }



  ListKPA = [];
  getDataKPA(){
    this.masterKpaService.getKPA().subscribe(
      result => {
        console.log('Get data KPA success | getKPA ===>',result);
        this.ListKPA = result.result;
        console.log('ListKPA ===>',this.ListKPA);
      },
      error => {
        console.log('Get data KPA error   | getKPA ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  ListPPK = [];
  getDataPPK(){
    this.masterPpkService.getPPK().subscribe(
      data => {
        console.log('Get data PPK success | getPPK ===>',data);
        this.ListPPK = data.result;

        console.log('ListPPK ===>',this.ListPPK);
      },
      error => {
        console.log('Get data PPK error   | getPPK ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }




  KPAobject = { id:null };
  getDataKPAbyId(id){
    this.KPAobject = { id:null };
    this.masterKpaService.getKPAbyId(id).subscribe(
      result => {
        console.log('Get data KPA by id success | getKPA ===>',result);
        this.KPAobject = result.result[0];
      },
      error => {
        console.log('Get data KPA by id error   | getKPA ===>',error);
        notify({ message: "Whoops! failed to Get data KPA by ID",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  

  formPPK = {};
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


  filterData = {idKpa:null, namaPpk:""}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.masterPpkService.searchPPK(this.filterData).subscribe(
      data => {
        console.log('searchPPK PPK success | searchPPK ===>',data);
        this.ListPPK = data.result;
        // if(this.ListKPA.length > 0){
        //   for(var i in this.ListPPK){
        //     var findKpa = _.find(this.ListKPA,{'id':this.ListPPK[i].idKpa})
        //     this.ListPPK[i].namaKpa = findKpa.namaKpa;
        //   }
        // }


      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {idKpa:null, namaPpk:""}
  }

  deleteDataPpk = "";
  selectedForDelete = {};
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
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListPPK = _.remove(this.ListPPK, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deletePPK ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


  doSave(data){

    if(this.windowMode == 'edit'){
      data = this.formPPK;
    }

    if(data.id == null){
      console.log('doSave | data ===>',data);
      this.masterPpkService.createPPK(this.form.value).subscribe(
        result => {
          console.log('create success | createPPK ===>',result)
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');

          var findKPA = _.find(this.ListKPA,{"id":result.result.idKpa});
          result.result.namaKpa = findKPA.namaKpa;
          this.ListPPK.push(result.result)
          console.log('ListKPA after create ===>',this.ListPPK)

        },
        error => {
          console.log('create error   | createPPK ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.masterPpkService.updatePPK(data).subscribe(
        result => {
          console.log('update success | updatePPK ===>',result)
          notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');
          console.log('ListKPA ===>',this.ListKPA);

        },
        error => {
          console.log('update error   | updatePPK ===>',error);
          notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }
    
    
  }



}
