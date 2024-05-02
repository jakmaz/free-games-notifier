export class Game {
  title: string;
  url: string;
  iconUrl: string;

  constructor(title: string, url: string, iconUrl: string) {
    this.title = title;
    this.url = url;
    this.iconUrl = iconUrl;
  }

  csvString(): string {
    return `${this.title},${this.url}`;
  }
}
