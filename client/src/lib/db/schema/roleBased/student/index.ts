import { integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { users } from "../../users";

export const student = pgTable("student", {
  id: uuid("id").defaultRandom().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
