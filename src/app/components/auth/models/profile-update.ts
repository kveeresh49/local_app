export class ProfileUpdateRequest {
  path: string;
  operation: string;
  value: string;
  constructor(path: string, operation: string, value: string) {
    this.path = path;
    this.operation = operation;
    this.value = value;
  }
}