import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorMasterComponent } from './vendor-master.component';

describe('VendorMasterComponent', () => {
  let component: VendorMasterComponent;
  let fixture: ComponentFixture<VendorMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorMasterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
