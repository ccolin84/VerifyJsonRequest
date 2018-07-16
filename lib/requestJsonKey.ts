export enum JsonValue {
  Null = "null",
  Number = "number",
  String = "string",
  Boolean = "boolean",
}

export interface ValueType {
  type: "value";
  value: JsonValue;
}

export interface ObjectType {
  type: "object";
  value: RequestJsonKey[];
}

export interface RequestJsonKey {
  key: string;
  errorMessage: string;
  expectedType: ValueType | ObjectType;
}
