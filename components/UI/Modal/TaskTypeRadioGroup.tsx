import { useModalStore } from "@/store/ModalStore"

import { RadioGroup } from "@headlessui/react"
import RadioGroupOtion from "./RadioGroupOtion"

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500"
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked out",
    color: "bg-yellow-500"
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed ",
    color: "bg-green-500"
  }
]

export default function TaskTypeRadiogroup() {
  const [taskType, setTaskType] = useModalStore(s => [s.taskType, s.setTaskType])

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={taskType}
          onChange={v => setTaskType(v)}
        >
          <div className="space-y-2">
            {types.map(type => <RadioGroupOtion key={type.id} type={type} />)}
          </div>
        </RadioGroup>
      </div >
    </div >
  )
}
