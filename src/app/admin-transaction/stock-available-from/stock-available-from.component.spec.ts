import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { StockAvailableFromComponent } from './stock-available-from.component';

describe('StockAvailableFromComponent', () => {
  let component: StockAvailableFromComponent;
  let fixture: ComponentFixture<StockAvailableFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockAvailableFromComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockAvailableFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
