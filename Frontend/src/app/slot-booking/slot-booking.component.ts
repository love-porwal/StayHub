import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetslotsService } from '../services/getslots.service';
@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotdetailsComponent implements OnInit{

  item: any;
  // availableSlots: number[] = [];
Slots:any
  constructor(private route: ActivatedRoute,private GetslotsService:GetslotsService) { }
  parseAlbum(album: string): string[] {
    try {
      return JSON.parse(album) as string[];
    } catch (error) {
      console.error('Error parsing album:', error);
      return [];
    }
  }
  ngOnInit() {
    // Retrieve the item's data from route state
    console.log(history.state.data["Host"])
    console.log(this.route.snapshot.params["id"])
     this.GetslotsService.Slots(this.route.snapshot.params["id"]).subscribe((data)=>{
      console.log(data)
       this.Slots=data
      //  this.images=JSON.parse(data.property.album)
     })
    this.item=history.state.data
    // this.item = this.route?.snapshot?.data?.data;
    // this.availableSlots = Array.from({ length: this.item.availableroom }, (_, i) => i + 1);

  }



  bookSlot(it:any){
    it.isAvailable=!it.isAvailable
  }

}