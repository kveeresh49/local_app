export class AlertModelObj {
    type: string;
    msg: string;
    timeout?: number
  constructor(type: string, msg: string, timeout?: number) {
    this.type = type;
    this.msg = this.msg;
    this.timeout = 4000;
  }
}
