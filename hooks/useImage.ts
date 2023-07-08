import { getURL } from "@/lib/getUrl"
import { useEffect, useState } from "react"

export default function useImage(todo: Todo) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    async function getImage() {
      const url = await getURL(todo.image!)
      if (url) {
        setImageUrl(url.toString())
      }
    }

    if (todo.image) {
      getImage()
    }
  }, [todo])

  return { imageUrl }
}
