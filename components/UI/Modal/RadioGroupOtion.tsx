import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface RadioGroupOtionProps {
  type: {
    id: string
    name: string
    description: string
    color: string
  }
}

export default function RadioGroupOtion({ type }: RadioGroupOtionProps) {
  return (
    <RadioGroup.Option
      className={({ active, checked }) => `${active && "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"} ${checked && `${type.color} bg-opacity-75 text-white`} relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}
      key={type.id}
      value={type.id}
    >
      {({ active, checked }) => <>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="text-sm">
              <RadioGroup.Label
                className={`font-medium ${checked ? "text-white " : "text-neutral-900"}`}
                as="p"
              >
                {type.name}
              </RadioGroup.Label>
              <RadioGroup.Description
                className={`inline ${checked ? "text-white" : "text-neutral-500"}`}
                as="span"
              >
                <span>{type.description}</span>
              </RadioGroup.Description>
            </div>
          </div>
          {checked && <div className="shrink-0 text-white">
            <CheckCircleIcon className="h-6" />
          </div>}
        </div>
      </>}
    </RadioGroup.Option>
  )
}
