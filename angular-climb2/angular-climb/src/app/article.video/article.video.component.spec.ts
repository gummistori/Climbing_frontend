import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleVideoComponent } from './article.video.component';

describe('Article.VideoComponent', () => {
  let component: ArticleVideoComponent;
  let fixture: ComponentFixture<ArticleVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
