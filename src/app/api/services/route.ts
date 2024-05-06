import prisma from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IService {
  name: string;
  timeInSeconds: number;
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const hoursCreated = await prisma.service.findMany({
      where: { user_id: body.userId },
    });

    if (hoursCreated.length > 0) {
      return NextResponse.json(
        { message: "Serviços já criados." },
        { status: 200 },
      );
    }

    const data: any = body.services.map((service: IService) => {
      return {
        name: service.name,
        service_time_in_seconds: service.timeInSeconds,
        user_id: body.userId,
      };
    });

    await prisma.service.createMany({ data });

    return NextResponse.json({ message: "Serviços criados" }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 400 });
  }
};
