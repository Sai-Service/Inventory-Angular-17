import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { OuComponent } from './ou.component';

describe('OuComponent', () => {
  let component: OuComponent;
  let fixture: ComponentFixture<OuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OuComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
