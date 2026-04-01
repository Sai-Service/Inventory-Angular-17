import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PovExpMasterReporComponent } from './pov-exp-master-repor.component';

describe('PovExpMasterReporComponent', () => {
  let component: PovExpMasterReporComponent;
  let fixture: ComponentFixture<PovExpMasterReporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PovExpMasterReporComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PovExpMasterReporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
