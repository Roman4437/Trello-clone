import { useModalStore } from "@/store/ModalStore"

export default function TaskInput() {
  const [taskInput, setTaskInput] = useModalStore(s => [s.taskInput, s.setTaskInput])

  return (
    <input
      className="w-full border border-neutral-300 rounded-md outline-none p-3"
      type="text"
      value={taskInput}
      onChange={e => setTaskInput(e.currentTarget.value)}
      placeholder="Enter a new task..."
    />
  )
}
