import { Publisher, Subjects, TicketUpdatedEvent } from "@oggerticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
