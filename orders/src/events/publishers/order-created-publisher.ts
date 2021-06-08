import { Publisher, OrderCreatedEvent, Subjects } from "@oggerticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
