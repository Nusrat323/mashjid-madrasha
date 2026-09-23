import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { defaultSettings } from "../data/site.js";

const SettingsContext = createContext(null);

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  const loadSettings = async () => {
    try {
      const data = await api.get("/settings");
      setSettings({
        ...defaultSettings,
        ...data,
        prayerTimes: { ...defaultSettings.prayerTimes, ...data.prayerTimes },
      });
    } catch {
      setSettings(defaultSettings);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return <SettingsContext.Provider value={{ settings, loadSettings }}>{children}</SettingsContext.Provider>;
}
