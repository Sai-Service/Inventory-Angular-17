import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AssetTrnsReportComponent } from './asset-trns-report.component';

describe('AssetTrnsReportComponent', () => {
  let component: AssetTrnsReportComponent;
  let fixture: ComponentFixture<AssetTrnsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetTrnsReportComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetTrnsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
