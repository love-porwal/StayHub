import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotdetailsComponent } from './slot-booking.component';

describe('SlotBookingComponent', () => {
  let component: SlotdetailsComponent;
  let fixture: ComponentFixture<SlotdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotdetailsComponent]
    });
    fixture = TestBed.createComponent(SlotdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
