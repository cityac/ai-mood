import { UserButton } from '@clerk/nextjs'
import { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">Mood</aside>
      <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
        <header className="h-[60px] border-b border-black/10 flex flex-row">
          <div>Hello</div>
          <div className="h-full w-[calc(100vw-200px)] px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="bg-slate-50 h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
