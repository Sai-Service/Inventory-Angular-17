import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHistoryFormComponent } from './asset-history-form.component';

describe('AssetHistoryFormComponent', () => {
  let component: AssetHistoryFormComponent;
  let fixture: ComponentFixture<AssetHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetHistoryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
