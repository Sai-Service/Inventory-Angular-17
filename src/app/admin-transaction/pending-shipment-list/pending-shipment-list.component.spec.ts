import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { PendingShipmentListComponent } from './pending-shipment-list.component';

describe('PendingShipmentListComponent', () => {
  let component: PendingShipmentListComponent;
  let fixture: ComponentFixture<PendingShipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingShipmentListComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
