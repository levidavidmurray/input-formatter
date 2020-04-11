export type InputFormatterMap = object;

export interface SkipFormatOpt {
  length: number;
  position: number;
  skip: boolean;
}

export interface InputFormatterOpts {
  formats?: InputFormatterMap;
  replaceChar?: string;
  skipFormatOpts?: SkipFormatOpt[];
}