import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesRandomImageComponent } from './articles.random.image.component';

describe('ArticlesRandomImageComponent', () => {
  let component: ArticlesRandomImageComponent;
  let fixture: ComponentFixture<ArticlesRandomImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesRandomImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesRandomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
