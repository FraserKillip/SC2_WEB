import { SC2Page } from './app.po';

describe('sc2 App', function() {
  let page: SC2Page;

  beforeEach(() => {
    page = new SC2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sc2 works!');
  });
});
