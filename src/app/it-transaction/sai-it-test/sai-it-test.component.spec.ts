import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaiItTestComponent } from './sai-it-test.component';

describe('SaiItTestComponent', () => {
  let component: SaiItTestComponent;
  let fixture: ComponentFixture<SaiItTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaiItTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaiItTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
