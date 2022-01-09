export interface Ang {
  pageno: number;
  source: Source;
  count: number;
  page?: PageEntity[] | null;
  error: boolean;
}
export interface Source {
  id: number;
  akhar: string;
  unicode: string;
  english: string;
  length: number;
  pageName: PageName;
}
export interface PageName {
  akhar: string;
  unicode: string;
  english: string;
}
export interface PageEntity {
  line: Line;
}
export interface Line {
  id: string;
  shabadid: string;
  gurmukhi: DefaultOrGurmukhiOrLarivaarOrFirstletters;
  larivaar: DefaultOrGurmukhiOrLarivaarOrFirstletters;
  translation: Translation;
  transliteration: Transliteration;
  writer: Writer;
  raag: Raag;
  pageno: number;
  lineno: number;
  firstletters: DefaultOrGurmukhiOrLarivaarOrFirstletters;
}
export interface DefaultOrGurmukhiOrLarivaarOrFirstletters {
  akhar: string;
  unicode: string;
}
export interface Translation {
  english: English;
  punjabi: Punjabi;
  spanish: string;
}
export interface English {
  default: string;
}
export interface Punjabi {
  default: DefaultOrGurmukhiOrLarivaarOrFirstletters;
}
export interface Transliteration {
  english: EnglishOrDevanagari;
  devanagari: EnglishOrDevanagari;
}
export interface EnglishOrDevanagari {
  text: string;
  larivaar: string;
}
export interface Writer {
  id: number;
  akhar: string;
  unicode: string;
  english: string;
}
export interface Raag {
  id: number;
  akhar: string;
  unicode: string;
  english: string;
  startang: number;
  endang: number;
  raagwithpage: string;
}
