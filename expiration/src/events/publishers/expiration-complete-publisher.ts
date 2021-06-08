import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@oggerticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
