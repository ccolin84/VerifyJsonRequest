export enum JsonValue {
  Null = "null",
  Undefined = "undefined",
  Number = "number",
  String = "string",
  Boolean = "boolean",
}

export interface RequestJsonKey {
  key: string;
  errorMessage: string;
  expected: Array<RequestJsonKey[] | JsonValue>;
}
