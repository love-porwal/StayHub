import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {PropertyDataService} from "../services/property-data.service"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  props:any;
  images:any;
constructor(private propData:PropertyDataService,private router: Router) {
  this.propData.property().subscribe((data)=>{
    console.log(data)
     this.props=data.property
    //  this.images=JSON.parse(data.property.album)
   })
}

parseAlbum(album: string): string[] {
  try {
    return JSON.parse(album) as string[];
  } catch (error) {
    console.error('Error parsing album:', error);
    return [];
  }
}

navigateToDetails(item:any) {
  // Navigate to the details page using the item's ID
  // console.log(item)
  this.router.navigate(['/details', item.id],{ state: { data: item } });
}
}