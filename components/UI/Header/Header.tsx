'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

import Search from "./Search"

export default function Header() {
  const { data } = useSession()

  return (
    <header className="flex flex-col md:flex-row items-center p-5 bg-neutral-500/10 justify-between">
      <div className="bg-trello-gradient" />
      <Image
        width={224}
        height={64}
        alt="logo"
        className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        src="/Trello_logo.svg.png"
      />
      <div className="flex w-full items-center space-x-5 md:justify-end">
        <Search />
        <button
          className="relative w-11 h-11 border rounded-full border-trello-blue"
          onClick={() => signOut()}
        >
          <Image src={data?.user?.image!} fill className="rounded-full hover:opacity-50 transition-all" alt="pfp" />
        </button>
      </div>
    </header>
  )
}