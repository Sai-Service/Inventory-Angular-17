import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AdUserRequFormComponent } from './ad-user-requ-form.component';
import { AppRoutingModule } from '../../app-routing.module';


describe('AdUserRequFormComponent', () => {
  let component: AdUserRequFormComponent;
  let fixture: ComponentFixture<AdUserRequFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdUserRequFormComponent],
      imports: [ FormsModule, ReactiveFormsModule, AppRoutingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdUserRequFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
