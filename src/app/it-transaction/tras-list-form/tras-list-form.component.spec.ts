import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { TrasListFormComponent } from './tras-list-form.component';

describe('TrasListFormComponent', () => {
  let component: TrasListFormComponent;
  let fixture: ComponentFixture<TrasListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrasListFormComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrasListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
