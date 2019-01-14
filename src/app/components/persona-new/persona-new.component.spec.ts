import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaNewComponent } from './persona-new.component';

describe('PersonaNewComponent', () => {
  let component: PersonaNewComponent;
  let fixture: ComponentFixture<PersonaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
