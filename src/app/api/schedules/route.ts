import { prisma } from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IScheduleCreate {
  data: {
    days: string[]
    hour_start: string
    hour_end: string
    email: string
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json() as IScheduleCreate

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.data.email
      }
    })

    if (!user) {
      return NextResponse.json({}, { status: 400 })
    }

    await prisma.schedule.createMany({
      data: data.data.days.map(day => {
        return {
          day,
          hour_start: data.data.hour_start,
          hour_end: data.data.hour_end,
          user_id: user?.id
        }
      })
    })

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        register_steps: 1
      }
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json({}, { status: 500 })
  }
}