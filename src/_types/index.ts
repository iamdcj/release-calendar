export const codeToName = {
  svu: "SVU",
  ptf: "Platform",
  fs: "Sports",
} as any;

export const nameToCode = {
  "spark video unit": "svu",
  platform: "ptf",
  sports: "fs",
} as any;

export const businessUnitsArray = ["fs", "fnc", "fbn", "fts", "fw", "otk"];

export const BusinessUnits = {
  fw: "Fox Weather",
  fbn: "Fox Business",
  fs: "Fox Sports",
  fnc: "Fox News",
  fts: "Fox TV",
  otk: "Outkick",
} as any;

export interface Event {
  id: any;
  title: string;
  version: string;
  start: string;
  end: string;
  release_type: string;
  team: string;
  components: string;
  business_units: string;
  build_owner: string;
}
