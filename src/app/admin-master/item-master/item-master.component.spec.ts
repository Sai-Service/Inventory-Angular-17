import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule,Validators} from '@angular/forms';
import { ItemMasterComponent } from './item-master.component';

describe('ItemMasterComponent', () => {
  let component: ItemMasterComponent;
  let fixture: ComponentFixture<ItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemMasterComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        Validators
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
