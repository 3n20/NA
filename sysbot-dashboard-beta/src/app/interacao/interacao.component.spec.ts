import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteracaoComponent } from './interacao.component';

describe('InteracaoComponent', () => {
  let component: InteracaoComponent;
  let fixture: ComponentFixture<InteracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
