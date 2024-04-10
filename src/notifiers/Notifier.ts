export interface Notifier {
  send(message: string): Promise<void>;
}
