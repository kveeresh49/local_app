export class AlertModelObj {
  type: string;
  msg: string;
  timeout: number;
  constructor(type: string, msg: string, timeout: number = 9000) {
    this.type = type;
    this.msg = msg;
    this.timeout = timeout;
  }
}
