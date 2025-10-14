import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, varchar, int } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const usersTable = mysqlTable("users_table", {
	id: serial().notNull(),
	name: varchar({ length: 255 }).notNull(),
	age: int().notNull(),
	email: varchar({ length: 255 }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "users_table_id"}),
	unique("id").on(table.id),
	unique("users_table_email_unique").on(table.email),
]);
