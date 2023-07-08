import Board from "@/components/UI/Board/Board"
import Header from "@/components/UI/Header/Header"

export default function Home() {
  return (
    <main className="flex flex-col text-neutral-400">
      <Header />
      <Board />
    </main>
  )
}
