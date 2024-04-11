import { Notifier } from "../notifiers/Notifier.js";
import { NtfyChannel } from "../notifiers/NtfyChannel.js";
import { NtfySettings } from "./types/types.js";

export interface NotifierFactory {
  create(settings: any): Notifier;
}

export class NotifierFactory implements NotifierFactory {
  create(settings: NtfySettings): Notifier {
    return new NtfyChannel(settings);
  }
}
