import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article.VideoComponent } from './article.video.component';

describe('Article.VideoComponent', () => {
  let component: Article.VideoComponent;
  let fixture: ComponentFixture<Article.VideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article.VideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article.VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
