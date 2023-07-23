import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotdetailsComponent implements OnInit{

  item: any;
  // availableSlots: number[] = [];

  constructor(private route: ActivatedRoute) { }
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
    this.item=history.state.data
    // this.item = this.route?.snapshot?.data?.data;
    // this.availableSlots = Array.from({ length: this.item.availableroom }, (_, i) => i + 1);

  }

}