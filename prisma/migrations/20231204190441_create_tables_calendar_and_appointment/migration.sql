-- CreateTable
CREATE TABLE "calendars" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "calendars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour_start" TIMESTAMP(3) NOT NULL,
    "hour_end" TIMESTAMP(3) NOT NULL,
    "user_extgmail" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "calendar_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "calendars_identifier_key" ON "calendars"("identifier");

-- CreateIndex
CREATE INDEX "calendars_id_user_id_identifier_idx" ON "calendars"("id", "user_id", "identifier");

-- CreateIndex
CREATE INDEX "appointments_id_calendar_id_user_id_service_id_idx" ON "appointments"("id", "calendar_id", "user_id", "service_id");

-- AddForeignKey
ALTER TABLE "calendars" ADD CONSTRAINT "calendars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_calendarId_fkey" FOREIGN KEY ("calendarId") REFERENCES "calendars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
