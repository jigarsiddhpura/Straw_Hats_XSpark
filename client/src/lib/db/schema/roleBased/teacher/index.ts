import { relations, type InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { users } from "../../users";
import { meeting } from "../../meeting";
import { admin } from "../admin";

export const teacher = pgTable("teacher", {
  id: uuid("id").defaultRandom().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  admin_id: integer("admin_id"),
});

export const teacherToMeetingRelation = relations(users, ({ many }) => ({
  meetingRelations: many(meeting),
}));

export const teacherToAdminRelation = relations(teacher, ({ one }) => ({
  admin: one(admin, {
    //fk
    fields: [teacher.admin_id],
    //pk
    references: [admin.id],
  }),
}));
