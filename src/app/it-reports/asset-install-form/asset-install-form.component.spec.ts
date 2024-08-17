import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AssetInstallFormComponent } from './asset-install-form.component';

describe('AssetInstallFormComponent', () => {
  let component: AssetInstallFormComponent;
  let fixture: ComponentFixture<AssetInstallFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetInstallFormComponent],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetInstallFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
