import { prismaMock } from "../setup_test/singleton";
import { getUsers } from "../setup_test/function";

test("should return an array of users", async () => {
  const sampleUsers = [
    {
      id: 1,
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Dine",
      email: "janedine@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  prismaMock.user.findMany.mockResolvedValue(sampleUsers);
  await expect(getUsers()).resolves.toEqual(sampleUsers);
});
