import { NextResponse } from 'next/server';

import { hash } from '@node-rs/argon2';
import { z } from 'zod';

import { env } from '@/env';
import { db } from '@/server/db';

// TODO: move the schema to a shared location
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  // TODO: increase the password's strength
  password: z.string().min(8),
});

export async function POST(request: Request) {
  if (env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }

  const parsed = createUserSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 });
  }

  const { email, name, password } = parsed.data;
  const hashedPassword = await hash(password, {
    // A recommended minimum parameters - https://thecopenhagenbook.com/password-authentication#password-storage
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const user = await db.user.upsert({
    where: { email },
    create: {
      email,
      name,
      credentials: {
        create: {
          hashedPassword,
        },
      },
    },
    update: {
      name,
      credentials: {
        update: {
          hashedPassword,
        },
      },
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: 'A new user created successfully.' },
    { status: 201 },
  );
}
