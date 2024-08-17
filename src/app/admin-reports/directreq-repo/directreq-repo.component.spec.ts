import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectreqRepoComponent } from './directreq-repo.component';

describe('DirectreqRepoComponent', () => {
  let component: DirectreqRepoComponent;
  let fixture: ComponentFixture<DirectreqRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectreqRepoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectreqRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
