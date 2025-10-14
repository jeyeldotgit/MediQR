import {
  mysqlTable,
  varchar,
  text,
  datetime,
  mysqlEnum,
  char,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

// -----------------------------------------------------------------------------
// USERS
// -----------------------------------------------------------------------------
export const users = mysqlTable("users", {
  id: char("id", { length: 36 })
    .default(sql`(UUID())`)
    .primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["patient", "staff"]).notNull(),
  createdAt: datetime("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// -----------------------------------------------------------------------------
// PATIENTS
// -----------------------------------------------------------------------------
export const patients = mysqlTable("patients", {
  id: char("id", { length: 36 })
    .default(sql`(UUID())`)
    .primaryKey(),
  userId: char("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  dateOfBirth: datetime("date_of_birth").notNull(),
  address: text("address"),
  contactNumber: varchar("contact_number", { length: 20 }),
  createdAt: datetime("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// -----------------------------------------------------------------------------
// RECORDS
// -----------------------------------------------------------------------------
export const records = mysqlTable(
  "records",
  {
    id: char("id", { length: 36 })
      .default(sql`(UUID())`)
      .primaryKey(),
    patientId: char("patient_id", { length: 36 })
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    authorId: char("author_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    notes: text("notes").notNull(),
    createdAt: datetime("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    patientIdx: index("idx_patient_id").on(table.patientId),
    authorIdx: index("idx_author_id").on(table.authorId),
  })
);

// -----------------------------------------------------------------------------
// QR TOKENS
// -----------------------------------------------------------------------------
export const qrTokens = mysqlTable(
  "qr_tokens",
  {
    id: char("id", { length: 36 })
      .default(sql`(UUID())`)
      .primaryKey(),
    patientId: char("patient_id", { length: 36 })
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: datetime("expires_at").notNull(),
    createdAt: datetime("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    patientIdx: index("idx_qr_patient_id").on(table.patientId),
  })
);

// -----------------------------------------------------------------------------
// AUDIT LOGS
// -----------------------------------------------------------------------------
export const auditLogs = mysqlTable(
  "audit_logs",
  {
    id: char("id", { length: 36 })
      .default(sql`(UUID())`)
      .primaryKey(),
    userId: char("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    patientId: char("patient_id", { length: 36 })
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    action: varchar("action", { length: 255 }).notNull(), // e.g. "VIEW_RECORDS"
    createdAt: datetime("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    userIdx: index("idx_audit_user_id").on(table.userId),
    patientIdx: index("idx_audit_patient_id").on(table.patientId),
  })
);

// -----------------------------------------------------------------------------
// RELATIONS
// -----------------------------------------------------------------------------
export const usersRelations = relations(users, ({ one, many }) => ({
  patient: one(patients, {
    fields: [users.id],
    references: [patients.userId],
  }),
  records: many(records),
  auditLogs: many(auditLogs),
}));

export const patientsRelations = relations(patients, ({ one, many }) => ({
  user: one(users, {
    fields: [patients.userId],
    references: [users.id],
  }),
  records: many(records),
  qrTokens: many(qrTokens),
  auditLogs: many(auditLogs),
}));

export const recordsRelations = relations(records, ({ one }) => ({
  patient: one(patients, {
    fields: [records.patientId],
    references: [patients.id],
  }),
  author: one(users, {
    fields: [records.authorId],
    references: [users.id],
  }),
}));

export const qrTokensRelations = relations(qrTokens, ({ one }) => ({
  patient: one(patients, {
    fields: [qrTokens.patientId],
    references: [patients.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
  patient: one(patients, {
    fields: [auditLogs.patientId],
    references: [patients.id],
  }),
}));
