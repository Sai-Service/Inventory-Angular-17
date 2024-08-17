import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { CodeTypeComponent } from './code-type.component';

describe('CodeTypeComponent', () => {
  let component: CodeTypeComponent;
  let fixture: ComponentFixture<CodeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeTypeComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
