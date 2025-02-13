import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLdgerRepoComponent } from './stock-ldger-repo.component';

describe('StockLdgerRepoComponent', () => {
  let component: StockLdgerRepoComponent;
  let fixture: ComponentFixture<StockLdgerRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockLdgerRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockLdgerRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
