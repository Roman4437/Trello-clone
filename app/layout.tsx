import { getServerSession } from "next-auth"

import AuthProvider from "@/components/Providers/AuthProvider/AuthProvider"
import SessionProvider from "@/components/Providers/SessionProvider/SessionProvider"

import Modal from "@/components/UI/Modal/Modal"

import "@/styles/globals.css"

export const metadata = {
  title: "Manage Your Team's Projects From Anywhere | Trello",
  description: "Trello"
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className="bg-trello-gray scrollbar-none">
        <SessionProvider session={session}>
          <AuthProvider>
            <Modal />
            {children}
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
