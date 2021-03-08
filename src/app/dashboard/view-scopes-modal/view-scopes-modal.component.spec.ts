import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScopesModalComponent } from './view-scopes-modal.component';

describe('ViewScopesModalComponent', () => {
  let component: ViewScopesModalComponent;
  let fixture: ComponentFixture<ViewScopesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScopesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScopesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
