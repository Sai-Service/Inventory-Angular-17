import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItassetissueFormComponent } from './itassetissue-form.component';

describe('ItassetissueFormComponent', () => {
  let component: ItassetissueFormComponent;
  let fixture: ComponentFixture<ItassetissueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItassetissueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItassetissueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
