import { analyse } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { update } from '@/utils/actions'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  const analysis = await analyse(entry.content)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis!,
    },
  })
  update(['/journal'])
  return NextResponse.json({ data: entry })
}
