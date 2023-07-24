// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Frontend';
// }
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'Frontend';
//   isLoggedIn = false;
//   userName: string | null = null;

//   ngOnInit(): void {
//     // Check if a valid token exists in sessionStorage
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       this.isLoggedIn = true;
//       this.userName = sessionStorage.getItem('name');
//     }
//   }
// }
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'Frontend';
//   isLoggedIn = false;
//   userName: string | null = null;

//   ngOnInit(): void {
//     this.checkUserStatus();
//   }

//   checkUserStatus(): void {
//     // Check if a valid token exists in sessionStorage
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       this.isLoggedIn = true;
//       this.userName = sessionStorage.getItem('name');
//     } else {
//       this.isLoggedIn = false;
//       this.userName = null;
//     }
//   }

//   logout(): void {
//     // Clear session storage and update the navigation bar
//     sessionStorage.clear();
//     this.checkUserStatus();
//   }
// }
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  isLoggedIn = false;
  userName: string | null = null;

  constructor(private ngZone: NgZone) {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Check if a valid token exists in sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      this.ngZone.run(() => {
        this.isLoggedIn = true;
        this.userName = sessionStorage.getItem('name');
      });
    } else {
      this.isLoggedIn = false;
      this.userName = null;
    }
  }

  logout(): void {
    // Clear session storage and update the navigation bar
    sessionStorage.clear();
    this.checkUserStatus();
  }
}
