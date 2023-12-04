import { prisma } from "@/services/prisma"
import { NextRequest, NextResponse } from "next/server"

interface IServiceCreate {
  name: string
  price: number
  time: number
  description?: string
}

interface IRequestToCreateService {
  data: {
    email: string
    services: IServiceCreate[]
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json() as IRequestToCreateService


  try {

    const user = await prisma.user.findUnique({
      where: {
        email: data.data.email
      }
    })

    if (!user) {
      return NextResponse.json({}, { status: 400 })
    }

    const servicesFormated = data.data.services.map(service => {
      return {
        ...service,
        price: Number(service.price),
        time: Number(service.time),
        user_id: user.id
      }
    })

    await prisma.service.createMany({
      data: servicesFormated,
    })

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        register_steps: 2
      }
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({}, { status: 500 })
  }
}
