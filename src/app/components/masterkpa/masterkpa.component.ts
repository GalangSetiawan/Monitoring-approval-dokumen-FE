import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MasterkpaService } from './../../shared/masterkpa.service';
import { MastercabangService } from './../../shared/mastercabang.service';



import * as _ from "lodash";
import * as $ from 'jquery'


import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-masterkpa',
  templateUrl: './masterkpa.component.html',
  styleUrls: ['./masterkpa.component.css']
})
export class MasterkpaComponent implements OnInit {

  form: FormGroup;
  public titleHeader = "Master KPA";

  constructor(
    public masterKpaService: MasterkpaService,
    public masterCabangService: MastercabangService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      namaKpa     : new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      idCabang      : new FormControl("",Validators.compose([Validators.required,])),
      alamat: new FormControl("")
       
    });

    this.getDataKPA();
    this.getDataCabang();


  }


  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;

    if(this.windowMode == 'create'){
      this.formKPA = {namaKpa:null,idCabang:null, cabang:null, alamat:null, id:null};
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

  
  ListCabang = [];
  getDataCabang(){
    this.masterCabangService.getCabang().subscribe(
      data => {
        console.log('Get data Cabang success | getCabang ===>',data);
        this.ListCabang = data.result;

        console.log('ListCabang ===>',this.ListCabang);
      },
      error => {
        console.log('Get data Cabang error   | getCabang ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
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

  formKPA = {};
  onEditClick(row){
    console.log('btnEdit ===>',row);
    this.windowModeView('edit');
    this.formKPA = row.data;
  }

  deleteDataKpa = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataKpa = row.data.namaKpa;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.masterKpaService.deleteKPA(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteKPA ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListKPA = _.remove(this.ListKPA, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteKPA ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


  doSave(data){

    if(this.windowMode == 'edit'){
      data = this.formKPA;
    }

    if(data.id == null){
      console.log('doSave | data ===>',data);
      this.masterKpaService.createKPA(this.form.value).subscribe(
        result => {
          console.log('create success | createKPA ===>',result)
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.ListKPA.push(result.result)
          this.windowModeView('grid');

          

        },
        error => {
          console.log('create error   | createKPA ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.masterKpaService.updateKPA(data).subscribe(
        result => {
          console.log('update success | updateKPA ===>',result)
          notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');
          console.log('ListKPA ===>',this.ListKPA);

        },
        error => {
          console.log('update error   | updateKPA ===>',error);
          notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }
    
    
  }


  testToast(req){
    if(req=='success'){
      notify({ message: "Yosssh! Success to Create data",position: {my: "center top",at: "center top"}}, "success", 3000)
    }else if(req=='error'){
      notify({ message: "Whoops! error to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
    }else if(req=='warning'){
      notify({ message: "Wawwww! warning to Create data",position: {my: "center top",at: "center top"}}, "warning", 3000)
    }else if(req=='info'){
      notify({ message: "Info! info to Create data",position: {my: "center top",at: "center top"}}, "info", 3000)
    }
  }

  



  

}
