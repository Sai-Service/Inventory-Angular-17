import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AssetScrapReportComponent } from './asset-scrap-report.component';

describe('AssetScrapReportComponent', () => {
  let component: AssetScrapReportComponent;
  let fixture: ComponentFixture<AssetScrapReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetScrapReportComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetScrapReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
