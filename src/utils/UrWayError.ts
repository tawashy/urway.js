export class UrWayError extends Error {
  status: string;
  constructor(status: string) {
    super(); // (1)
    this.status = status;
    this.message = this.message;
  }
}
