import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { ProductSubTypeComponent } from './product-sub-type.component';

describe('ProductSubTypeComponent', () => {
  let component: ProductSubTypeComponent;
  let fixture: ComponentFixture<ProductSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSubTypeComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
