import { Notifier } from "../notificators/Notifier.js";
import { NtfyChannel } from "../notificators/NtfyChannel.js";
import { NtfySettings } from "./Settings.js";

export interface NotifierFactory {
  create(settings: any): Notifier;
}

export class NotifierFactory implements NotifierFactory {
  create(settings: NtfySettings): Notifier {
    return new NtfyChannel(settings);
  }
}
