import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { statistics } from "./statistics";
import { teacher } from "../roleBased/teacher";

export const meeting = pgTable("meeting", {
  id: uuid("id").defaultRandom().primaryKey(),
  meetLink: text("meetLink"),
  teacherId: integer("teacherId").notNull(),
  startTime: timestamp("startTime", { mode: "date", withTimezone: true }),
  endTime: timestamp("startTime", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  students: text("students").array().$type<Array<string>>().notNull(),
});

//1 meeting only 1 teacher
export const meetingTeacherRelation = relations(meeting, ({ one }) => ({
  teacher: one(teacher, {
    fields: [meeting.teacherId],
    references: [teacher.id],
  }),
}));

// 1 meeting many statistics
export const meetingStatisticsRelation = relations(meeting, ({ many }) => ({
  meetingRelations: many(statistics),
}));
