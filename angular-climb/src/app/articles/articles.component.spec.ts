import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EpochDatePipe } from '../epoch-date.pipe';
import { ArticlesRandomImageComponent } from '../articles.random.image/articles.random.image.component';


describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesComponent, EpochDatePipe, ArticlesRandomImageComponent ],
      imports: [RouterTestingModule, FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
