export class SC2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sc2-app h1')).getText();
  }
}
