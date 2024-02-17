import prisma from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const userEmail = params.get('email')
  let userReturn = {
    email: userEmail,
    step: 0,
  }


  try {
    if (!userEmail) {
      return NextResponse.json({ message: 'teste' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      },
      include: {
        Schedules: true,
        Service: true,
      }
    })

    if (user && user.Schedules.length === 0) {
      userReturn.step = 1;

      return NextResponse.json({ userReturn }, { status: 200 });
    } 

    if (user && user.Service.length === 0) {
      userReturn.step = 2;

      return NextResponse.json({ userReturn }, { status: 200 });
    }

    userReturn.step = 3;
    return NextResponse.json({ userReturn }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
