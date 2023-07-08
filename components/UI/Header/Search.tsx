'use client'

import { useEffect, useState } from "react"
import { useBoardStore } from "@/store/BoardStore"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function Search() {
  const [setSearchString] = useBoardStore(s => [s.setSearchString])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const debounce = setTimeout(() => setSearchString(filter), 500)
    return () => clearTimeout(debounce)
  }, [filter])

  return (
    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
      <MagnifyingGlassIcon className="w-6" />
      <input
        className="flex-1 outline-none p-1"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        type="text"
        placeholder="Search..." />
      <button type="submit" hidden />
    </form>
  )
}
