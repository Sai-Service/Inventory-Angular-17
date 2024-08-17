import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { ItemMstSearchFrmComponent } from './item-mst-search-frm.component';

describe('ItemMstSearchFrmComponent', () => {
  let component: ItemMstSearchFrmComponent;
  let fixture: ComponentFixture<ItemMstSearchFrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemMstSearchFrmComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemMstSearchFrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
