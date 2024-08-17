import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillrcdSrcFormComponent } from './billrcd-src-form.component';

describe('BillrcdSrcFormComponent', () => {
  let component: BillrcdSrcFormComponent;
  let fixture: ComponentFixture<BillrcdSrcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillrcdSrcFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillrcdSrcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
