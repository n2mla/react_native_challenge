export interface Field {
  name: string;
  label: string;
  onChange: (name: string, value: string) => void
  value: string
}

export interface ModelObjectType {
  [key: string]: { label: string; type: string; readOnly: boolean; calculate: string | null };
}