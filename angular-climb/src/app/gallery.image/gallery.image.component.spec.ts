import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gallery.ImageComponent } from './gallery.image.component';

describe('Gallery.ImageComponent', () => {
  let component: Gallery.ImageComponent;
  let fixture: ComponentFixture<Gallery.ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gallery.ImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gallery.ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
