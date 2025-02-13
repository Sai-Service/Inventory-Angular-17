import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaCommonRepoComponent } from './fa-common-repo.component';

describe('FaCommonRepoComponent', () => {
  let component: FaCommonRepoComponent;
  let fixture: ComponentFixture<FaCommonRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaCommonRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaCommonRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
