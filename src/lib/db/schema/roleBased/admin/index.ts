import { integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { users } from "../../users";
import { relations } from "drizzle-orm";
import { teacher } from "../teacher";

export const admin = pgTable("admin", {
    id: uuid("id").defaultRandom().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const adminToTeacherRelation = relations(admin, ({ many }) => ({
  adminToTeacherRelation: many(teacher),
}));
