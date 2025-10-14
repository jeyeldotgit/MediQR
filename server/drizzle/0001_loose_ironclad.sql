CREATE TABLE `patients` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`user_id` char(36) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`date_of_birth` datetime NOT NULL,
	`address` text,
	`contact_number` varchar(20),
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `patients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qr_tokens` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`patient_id` char(36) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `qr_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `qr_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`patient_id` char(36) NOT NULL,
	`author_id` char(36) NOT NULL,
	`notes` text NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` char(36) NOT NULL DEFAULT (UUID()),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('patient','staff') NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
RENAME TABLE `users_table` TO `audit_logs`;--> statement-breakpoint
ALTER TABLE `audit_logs` DROP INDEX `users_table_email_unique`;--> statement-breakpoint
ALTER TABLE `audit_logs` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `audit_logs` MODIFY COLUMN `id` char(36) NOT NULL DEFAULT (UUID());--> statement-breakpoint
ALTER TABLE `audit_logs` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `audit_logs` ADD `user_id` char(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD `patient_id` char(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD `action` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE `patients` ADD CONSTRAINT `patients_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `qr_tokens` ADD CONSTRAINT `qr_tokens_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `records` ADD CONSTRAINT `records_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `records` ADD CONSTRAINT `records_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_qr_patient_id` ON `qr_tokens` (`patient_id`);--> statement-breakpoint
CREATE INDEX `idx_patient_id` ON `records` (`patient_id`);--> statement-breakpoint
CREATE INDEX `idx_author_id` ON `records` (`author_id`);--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_audit_user_id` ON `audit_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_audit_patient_id` ON `audit_logs` (`patient_id`);--> statement-breakpoint
ALTER TABLE `audit_logs` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `audit_logs` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `audit_logs` DROP COLUMN `email`;