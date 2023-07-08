import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-trello-gray">
      <button
        className="flex bg-trello-blue hover:bg-trello-gray hover:text-trello-blue p-1 items-center space-x-4 border border-neutral-300 transition ease-out drop-shadow-sm"
        onClick={() => signIn("google")}>
        <Image
          width={48}
          height={48}
          className="bg-trello-gray p-3"
          src="/google.png"
          alt="google" />
        <span className="pr-4">Sign up with Google</span>
      </button>
    </div>
  )
}
