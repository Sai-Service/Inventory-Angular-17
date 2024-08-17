import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AdRequListComponent } from './ad-requ-list.component';

describe('AdRequListComponent', () => {
  let component: AdRequListComponent;
  let fixture: ComponentFixture<AdRequListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdRequListComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdRequListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
