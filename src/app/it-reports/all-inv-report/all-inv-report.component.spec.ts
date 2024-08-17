import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AllInvReportComponent } from './all-inv-report.component';

describe('AllInvReportComponent', () => {
  let component: AllInvReportComponent;
  let fixture: ComponentFixture<AllInvReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllInvReportComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllInvReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
