import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousTrascComponent } from './miscellaneous-trasc.component';

describe('MiscellaneousTrascComponent', () => {
  let component: MiscellaneousTrascComponent;
  let fixture: ComponentFixture<MiscellaneousTrascComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscellaneousTrascComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscellaneousTrascComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
