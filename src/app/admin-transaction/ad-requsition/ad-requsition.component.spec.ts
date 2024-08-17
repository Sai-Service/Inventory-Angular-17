import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AdRequsitionComponent } from './ad-requsition.component';

describe('AdRequsitionComponent', () => {
  let component: AdRequsitionComponent;
  let fixture: ComponentFixture<AdRequsitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdRequsitionComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdRequsitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
