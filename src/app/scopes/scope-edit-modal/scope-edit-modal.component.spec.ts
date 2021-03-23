import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeEditModalComponent } from './scope-edit-modal.component';

describe('ScopeEditModalComponent', () => {
  let component: ScopeEditModalComponent;
  let fixture: ComponentFixture<ScopeEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
