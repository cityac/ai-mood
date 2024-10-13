import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'
import { Prisma } from '@prisma/client'

type UserWithJournalEntries = Prisma.UserGetPayload<{
  include: {
    entries: true
  }
}>
export const getUserByClerkId = async ({ include = { entries: false } } = {}): Promise<UserWithJournalEntries> => {
  const { userId } = await auth()
  debugger
  console.log({ userId })

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId!,
    },
    include,
  })

  return user
}
