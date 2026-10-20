import { NextRequest } from 'next/server';
import { adminClient } from '@/lib/admin';

export interface Actor {
  user: { id: string; email?: string };
  isCeo: boolean;
  isPrimaryCeo: boolean;
}

export async function getActor(req: NextRequest): Promise<Actor> {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!accessToken) throw new Error('Unauthorized');

  const { data: { user }, error } = await adminClient().auth.getUser(accessToken);
  if (error || !user) throw new Error('Unauthorized');

  const emails = (process.env.CEO_EMAIL ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
  const [primaryEmail] = emails;
  const isPrimaryCeo = !!primaryEmail && (user.email ?? '').trim().toLowerCase() === primaryEmail;
  const isCeo = emails.includes((user.email ?? '').trim().toLowerCase());

  return { user, isCeo, isPrimaryCeo };
}

export function assertCanMutate(actor: Actor, doc: { client_name?: string }): void {
  if (actor.isCeo && !actor.isPrimaryCeo) {
    if (!doc.client_name?.toUpperCase().startsWith('TEST — ')) {
      throw Object.assign(new Error('QA account may only act on TEST — documents'), { status: 403 });
    }
  }
}
