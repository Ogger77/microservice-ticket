import { Ticket } from "../ticket";

it("implements OCC", async (done) => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make 2 seperate changes to ticket
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the 1st ticket
  await firstInstance!.save();

  // save the 2nd ticket and expect err
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }
  throw new Error("SHould not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});
