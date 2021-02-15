import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientActiveTokensModalComponent } from './client-active-tokens-modal.component';

describe('ScopeManagementModalComponent', () => {
  let component: ClientActiveTokensModalComponent;
  let fixture: ComponentFixture<ClientActiveTokensModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientActiveTokensModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientActiveTokensModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
