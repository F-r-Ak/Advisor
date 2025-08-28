import { NumberedHttpStatus } from "../../enums/numbered-http-status";

export interface ApResponse<T> {
  data: T;
  message: string;
  exception: null;
  status: NumberedHttpStatus;
}
