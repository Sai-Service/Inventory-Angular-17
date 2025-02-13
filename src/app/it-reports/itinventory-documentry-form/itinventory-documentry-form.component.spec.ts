import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinventoryDocumentryFormComponent } from './itinventory-documentry-form.component';

describe('ItinventoryDocumentryFormComponent', () => {
  let component: ItinventoryDocumentryFormComponent;
  let fixture: ComponentFixture<ItinventoryDocumentryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItinventoryDocumentryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItinventoryDocumentryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
