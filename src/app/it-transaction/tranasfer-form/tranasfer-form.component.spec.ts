import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { TranasferFormComponent } from './tranasfer-form.component';

describe('TranasferFormComponent', () => {
  let component: TranasferFormComponent;
  let fixture: ComponentFixture<TranasferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranasferFormComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranasferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
