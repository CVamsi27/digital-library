import { NextResponse } from "next/server";
export async function GET(){
    return NextResponse.json(process.env.GITHUB_ID ?? "undefined");
}