CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(10) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
