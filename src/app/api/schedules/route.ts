import prisma from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server"

interface IScheduleStore {
  days: string[];
  hourStart: string;
  hourEnd: string;
  userId: string;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  
  try {
    const hoursCreated = await prisma.schedules.findMany({ where: { userId: body.userId } });

    if (hoursCreated.length > 0) {
      return NextResponse.json({ message: 'Horários já criados.' }, { status: 200 });
    }

    const data: any = body.days.map((day: string) => {
      return {
        day,
        hour_start: body.hourStart,
        hour_end: body.hourEnd,
        user_id: body.userId,
        userId: body.userId

      }
    })

    await prisma.schedules.createMany({data});

    return NextResponse.json({ message: 'Horários Criados'}, { status: 201 });
  } catch (error) {
    console.log(error)

    return NextResponse.json({ message: error }, { status: 400 });
  }
}
