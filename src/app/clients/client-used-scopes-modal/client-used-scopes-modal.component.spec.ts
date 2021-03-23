import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUsedScopesModalComponent } from './client-used-scopes-modal.component';

describe('ClientUsedScopesModalComponent', () => {
  let component: ClientUsedScopesModalComponent;
  let fixture: ComponentFixture<ClientUsedScopesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientUsedScopesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUsedScopesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
