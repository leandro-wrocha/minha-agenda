import { prisma } from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IUserCreate {
  data: {
    name: string
    email: string
    access_token: string
    refresh_token: string
    register_steps: number
  }
}

export async function GET () {}

export async function POST (request: NextRequest) {
  const data = await request.json() as IUserCreate

  try {
    await prisma.user.create({
      data: data.data
    })

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    return NextResponse.json({}, { status: 500 })
  }
}