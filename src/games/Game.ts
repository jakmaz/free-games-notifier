export class Game {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }

  // Example method
  logDetails(): void {
    console.log(`${this.title}: ${this.url}`);
  }
}
