import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { GatePassGenComponent } from './gate-pass-gen.component';

describe('GatePassGenComponent', () => {
  let component: GatePassGenComponent;
  let fixture: ComponentFixture<GatePassGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatePassGenComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GatePassGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
