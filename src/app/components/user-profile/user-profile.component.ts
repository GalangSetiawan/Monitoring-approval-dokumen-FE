import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';



// User interface
export class User {
  // name: String;
  // email: String;


  nama    : String;
  cabang  : String;
  jabatan : String;
  role    : String;
  username: String;
  password: String;


}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserProfile: User;


  constructor(public authService: AuthService ) {
    this.authService.profileUser().subscribe((data:any) => {
      console.log('profileUser ====>',data),
        this.UserProfile = data;
        console.log('user ===>',this.UserProfile);
    })
  }

  ngOnInit(): void {
  }

}
