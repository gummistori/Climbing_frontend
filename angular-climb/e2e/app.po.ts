import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  navigateToArticles() {
    return browser.get('/#/Articles');
  }

  getTitle() {
    return browser.getTitle();
  }

  debugger() {
    browser.debugger();
  }
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
