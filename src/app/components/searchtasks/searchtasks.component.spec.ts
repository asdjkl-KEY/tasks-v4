import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtasksComponent } from './searchtasks.component';

describe('SearchtasksComponent', () => {
  let component: SearchtasksComponent;
  let fixture: ComponentFixture<SearchtasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchtasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchtasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
