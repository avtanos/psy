import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/scheduling";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const slots = await getAvailableSlots(params.id, 14);
  return NextResponse.json({
    slots: slots.map((s) => ({
      startAt: s.startAt.toISOString(),
      endAt: s.endAt.toISOString(),
    })),
  });
}
