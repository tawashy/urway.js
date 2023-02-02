interface UrWayErrorInput {
  status: string;
  message: string;
}

export class UrWayError extends Error {
  status: string;
  constructor({ status, message }: UrWayErrorInput) {
    super();
    this.status = status;
    this.message = message;
  }
}
