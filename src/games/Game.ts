export class Game {
  title: string;
  url: string;
  iconUrl: string;

  constructor(title: string, url: string, iconUrl: string) {
    this.title = title;
    this.url = url;
    this.iconUrl = iconUrl;
  }

  toString(): string {
    return `Game Title: ${this.title}, URL: ${this.url}, IconURL: ${this.iconUrl}`;
  }
}
