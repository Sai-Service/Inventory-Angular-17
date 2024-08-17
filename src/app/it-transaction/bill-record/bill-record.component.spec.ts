import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { BillRecordComponent } from './bill-record.component';

describe('BillRecordComponent', () => {
  let component: BillRecordComponent;
  let fixture: ComponentFixture<BillRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillRecordComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
