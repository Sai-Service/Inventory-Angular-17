import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransReceComponent } from './stock-trans-rece.component';

describe('StockTransReceComponent', () => {
  let component: StockTransReceComponent;
  let fixture: ComponentFixture<StockTransReceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockTransReceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockTransReceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
