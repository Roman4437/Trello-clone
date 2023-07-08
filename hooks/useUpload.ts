import { useBoardStore } from "@/store/BoardStore"
import { useModalStore } from "@/store/ModalStore"
import { useSession } from "next-auth/react"

export default function useUpload() {
  const [image, taskInput, taskType, setTaskInput, setImage, closeModal, imagePickerRef, buttonRef] = useModalStore(s => [s.image, s.taskInput, s.taskType, s.setTaskInput, s.setImage, s.closeModal, s.imagePickerRef, s.buttonRef])
  const addTask = useBoardStore(s => s.addTask)
  const { data } = useSession()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!taskInput) return

    if (buttonRef.current)
      buttonRef.current.disabled = true

    try {
      await addTask(taskInput, taskType, data?.user?.email!, image)
    } catch (error) {
      console.error(error)
    } finally {
      setImage(undefined)
      setTaskInput("")

      if (imagePickerRef.current)
        imagePickerRef.current.value = ""

      closeModal()
    }
  }

  return { handleSubmit }
}
