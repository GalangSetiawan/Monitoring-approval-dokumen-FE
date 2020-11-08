import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { MastersatkerService } from './../../shared/mastersatker.service';
import { NewsService } from './../../shared/news.service';
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public titleHeader = "Master Berita";
  form: FormGroup;
  constructor(
    public masterSatkerService: MastersatkerService,
    public newsService: NewsService,
    private token: TokenService,
    private authState: AuthStateService,
  ) { }



  ngOnInit(): void {
    this.getDataSatker();
    this.getDataBerita();
    $('#breadCrumbTitle a').text(this.titleHeader);
    this.selectActiveMenu('blog')
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
      this.beritaForm = {title:'', body:'',id:null, bgImage:undefined, isActive:null,imageName:''};
      this.imageUrl = undefined;
      this.isEditImage = true;
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Buat</a></li>')
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #view').remove();

    }else if (this.windowMode == 'view'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="view"><a>Lihat</a></li>')
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #edit').remove();

    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #view').remove();

    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #view').remove();
    }
  }


  onViewClick(row){
    console.log('onViewClick ===>',row);
    
    this.windowModeView('view');

    this.beritaForm = row.data;
    this.isEditImage = false;

    this.downloadImg(this.beritaForm.bgImage);




    

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
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak dapat mengambil data', 
          'error'
        )
      }
    )
  }

  activeSwitch(row){
    console.log('activeSwitch ===>',row)
    if(row.data.isActive == 1){
      this.ListBerita[row.rowIndex].isActive = 0
    }else{
      this.ListBerita[row.rowIndex].isActive = 1
    }


    this.newsService.switchActiveData(row.data).subscribe(
      result => {
        console.log('switch success | switchActiveData ===>',result)

        var status = result.result.isActive == 0? 'Non-Aktif' : 'Aktif'

        Swal.fire(
          'Yay Success!', 
          'Berhasil mengubah status berita menjadi ' + status, 
          'success'
        )
      },
      error => {
        console.log('switch error   | switchActiveData ===>',error);
        // notify({ message: "Whoops! failed to switchActiveData data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Error!', 
          'data Tidak Berhasil mengubah Status Aktifasi Berita', 
          'success'
        )
      }
    )



  }

  ListBerita = [];
  getDataBerita(){
    this.newsService.getNews().subscribe(
      data => {
        console.log('Get data PPK success | getNews ===>',data);
        this.ListBerita = data.result;

        console.log('ListBerita ===>',this.ListBerita);
      },
      error => {
        console.log('Get data PPK error   | getNews ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak berhasil mengambil data', 
          'error'
        )
      }
    )
  }

  downloadedImage = undefined;
  downloadImg(imgName){
    this.newsService.downloadImage(imgName).subscribe(
      data => {
        console.log('downloadImg success | downloadImage ===>',data);
        this.imageUrl = data
      },
      error => {
        console.log('downloadImg error   | downloadImage ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak berhasil mengambil gambar berita', 
          'error'
        )
      }
    )
  }



  btnCancelUpload(){
    console.log('btnCancelUpload | beritaForm ===>', this.beritaForm)
    this.isEditImage = false;
  }

  beritaForm = {title:'', body:'',id:null, bgImage:undefined, isActive:null,imageName:''};
  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('edit');
    this.beritaForm = row.data;
    this.isEditImage = false;

    this.downloadImg(this.beritaForm.bgImage)
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  imageUrl:any
  isEditImage = false;
  handleFileInput(files :FileList){
    if(this.windowMode == 'edit'){
      this.isEditImage = true;
    }

    console.log('handleFileInput ===>',files)
    this.beritaForm.bgImage = files;
    this.beritaForm.imageName = files[0].name;
    console.log('handleFileInput |  this.beritaForm ===>',this.beritaForm)


    var fileToUpload = files.item(0)
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(fileToUpload);

    console.log('handleFileInput |  this.imageUrl ===>',this.imageUrl)

  }


  filterData = {title:null, isActive:null}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.newsService.searchNews(this.filterData).subscribe(
      data => {
        console.log('searchNews PPK success | searchNews ===>',data);
        this.ListBerita = data.result;
      },
      error => {
        console.log('searchNews PPK error   | searchNews ===>',error);
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {title:null, isActive:null};
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

    this.newsService.deleteNews(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteNews ===>',result)
        // notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        Swal.fire(
          'Yay Success!', 
          'Data berhasil dihapus', 
          'success'
        )
        this.ListBerita = _.remove(this.ListBerita, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteNews ===>',error);
        // notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak Berhasil Menghapus Data', 
          'error'
        )
      }
    )

  }



  doSave(data){

    if(data.id == null){
      console.log('doSave | data ===>',data);
      // this.form.patchValue({bgImage:this.beritaForm.bgImage, imageName:this.beritaForm.imageName})
      this.newsService.createNews(data).subscribe(
        (data:any) => {
          console.log('create success | createNews ===>',data)
         
          // var result = data;
          // this.getDataBerita();
          this.ListBerita.push(data.result);

          // this.newsService.getNewsbyId(result).subscribe(
          //   (data:any)=>{
          //     console.log('doEditGeneral | getDataGridById  success ===>',data)
  
          //     this.ListBerita.push(data.result);
  
          //   },error =>{
          //     console.log('doEditGeneral | getDataGridById  Gagal ===>',error)
          //   }
          // )

          // notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil ditambahkan', 
            'success'
          )
          this.windowModeView('grid');

        },
        error => {
          console.log('create error   | createNews ===>',error);
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

   

      this.newsService.updateNews(data,this.isEditImage).subscribe(
        result => {
          console.log('update success | updateNews ===>',result)
          // notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil disimpan', 
            'success'
          )
          this.windowModeView('grid');
          this.getDataBerita();
        },
        error => {
          console.log('update error   | updateNews ===>',error);
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
