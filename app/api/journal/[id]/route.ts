import { analyse } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { update } from '@/utils/actions'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })
  const analysis = await analyse(updatedEntry.content)
  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis!,
    },
    update: analysis!,
  })
  console.log({
    1: 1,
    updatedEntry,
  })
  update(['/journal'])
  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } })
}
