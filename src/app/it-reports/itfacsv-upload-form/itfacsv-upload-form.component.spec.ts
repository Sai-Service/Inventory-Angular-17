import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ITFAcsvUploadFormComponent } from './itfacsv-upload-form.component';

describe('ITFAcsvUploadFormComponent', () => {
  let component: ITFAcsvUploadFormComponent;
  let fixture: ComponentFixture<ITFAcsvUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ITFAcsvUploadFormComponent],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ITFAcsvUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
