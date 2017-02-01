import { SandwichClubPage } from './app.po';

describe('sandwich-club App', function() {
  let page: SandwichClubPage;

  beforeEach(() => {
    page = new SandwichClubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sc works!');
  });
});
