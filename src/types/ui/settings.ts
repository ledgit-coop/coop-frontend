export interface SettingOption {
  key: string;
  name: string;
  value?: string;
  helper?: string;
}

export interface Settings {
  id?: string;
  key: string;
  name: string;
  value: string;
}
