CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    migrationid character varying(150) NOT NULL,
    productversion character varying(32) NOT NULL,
    CONSTRAINT pk___efmigrationshistory PRIMARY KEY (migrationid)
);

START TRANSACTION;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migrationid" = '20260911172125_Initial') THEN
    CREATE TABLE "BusinessProfiles" (
        "Id" uuid NOT NULL,
        "OrganizationNumber" character varying(30),
        "Name" character varying(200) NOT NULL,
        "AddressLine" character varying(150),
        "PostalCode" character varying(10),
        "PhoneNumber" character varying(20),
        "EmailAddress" character varying(100),
        "Country" character varying(50),
        "PostalPlace" character varying(50),
        "Longitude" double precision,
        "Latitude" double precision,
        "Description" character varying(1000),
        CONSTRAINT "PK_BusinessProfiles" PRIMARY KEY ("Id")
    );
    END IF;
END $EF$;

DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM "__EFMigrationsHistory" WHERE "migrationid" = '20260911172125_Initial') THEN
    INSERT INTO "__EFMigrationsHistory" (migrationid, productversion)
    VALUES ('20260911172125_Initial', '10.0.12');
    END IF;
END $EF$;
COMMIT;

