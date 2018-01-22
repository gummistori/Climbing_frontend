import { AppPage } from './app.po';

describe('angular-climb App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Ttile', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Fjallateymið - climbing.is');
  });

  it('Get Articles', () => {
    page.navigateToArticles();
    page.debugger();
    // expect(page.)
  });
});
