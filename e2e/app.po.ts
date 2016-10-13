import { browser, element, by } from 'protractor';

export class SandwichClubPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sc-root h1')).getText();
  }
}
