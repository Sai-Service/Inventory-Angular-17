import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AssetDiscardComponent } from './asset-discard.component';

describe('AssetDiscardComponent', () => {
  let component: AssetDiscardComponent;
  let fixture: ComponentFixture<AssetDiscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetDiscardComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetDiscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
