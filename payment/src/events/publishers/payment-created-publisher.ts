import { Subjects, Publisher, PaymentCreatedEvent } from "@oggerticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
