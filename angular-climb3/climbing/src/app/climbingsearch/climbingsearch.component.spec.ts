import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbingsearchComponent } from './climbingsearch.component';

describe('ClimbingsearchComponent', () => {
  let component: ClimbingsearchComponent;
  let fixture: ComponentFixture<ClimbingsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimbingsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimbingsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
