'use client'

import { Fragment } from "react"
import { firstChildOptions, secondChildOptions } from "./options"
import { Dialog, Transition } from "@headlessui/react"
import { useModalStore } from "@/store/ModalStore"

import TaskTypeRadioGroup from "./TaskTypeRadioGroup"
import ImagePicker from "./ImagePicker"
import TaskInput from "./TaskInput"
import useUpload from "@/hooks/useUpload"

export default function Modal() {
  const [isOpen, taskInput, closeModal, buttonRef] = useModalStore(s => [s.isOpen, s.taskInput, s.closeModal, s.buttonRef])
  const { handleSubmit } = useUpload()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-10"
        as="form"
        onClose={() => closeModal()}
        onSubmit={handleSubmit}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              {...firstChildOptions}
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              {...secondChildOptions}
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  className="text-lg font-medium leading-6 text-neutral-900 pb-2"
                  as="h3"
                >
                  Add a New Task
                </Dialog.Title>
                <div className="mt-2">
                  <TaskInput />
                  <TaskTypeRadioGroup />
                  <ImagePicker />
                  <div className="mt-4">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font medium text-blue-950 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed"
                      type="submit"
                      ref={buttonRef}
                      disabled={!taskInput}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}