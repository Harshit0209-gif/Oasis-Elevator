import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  projectType: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Real email/CRM integration is a follow-up deliverable — this stub
  // validates and accepts the submission so the form has a working target.
  return NextResponse.json({ success: true });
}
