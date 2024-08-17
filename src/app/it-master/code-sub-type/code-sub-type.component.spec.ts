import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { CodeSubTypeComponent } from './code-sub-type.component';

describe('CodeSubTypeComponent', () => {
  let component: CodeSubTypeComponent;
  let fixture: ComponentFixture<CodeSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeSubTypeComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
