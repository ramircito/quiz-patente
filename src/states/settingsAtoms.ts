import { atomWithStorage } from "jotai/utils";
import { Settings } from "../models/settings";

export const settingsAtom = atomWithStorage<Settings>(
  "settingsAtom",
  new Settings()
);