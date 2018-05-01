import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseScriptsComponent } from './database-scripts.component';

describe('DatabaseScriptsComponent', () => {
  let component: DatabaseScriptsComponent;
  let fixture: ComponentFixture<DatabaseScriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseScriptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
