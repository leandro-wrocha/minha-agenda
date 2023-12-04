import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json()

  const oauthClient2 = new google.auth.OAuth2({
    clientId: '110021042847-m78dc8u7ohenfj8ou96mhue6fdn3gto6.apps.googleusercontent.com',
    clientSecret: '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',
  })
  oauthClient2.setCredentials({
    refresh_token: data.data.refresh
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: oauthClient2
  })

  console.log((await calendar.events.list({
    calendarId: 'primary'
  })).data.items)

  return NextResponse.json({}, { status: 200 })
}