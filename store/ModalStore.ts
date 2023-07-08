import { createRef } from "react"
import { create } from "zustand"

interface ModalState {
  isOpen: boolean,
  taskInput: string,
  taskType: ColumnType,
  image: File | undefined,
  setTaskInput: (i: string) => void,
  setTaskType: (t: ColumnType) => void
  setImage: (i: File | undefined) => void
  openModal: (t: ColumnType) => void,
  closeModal: () => void,
  imagePickerRef: React.RefObject<HTMLInputElement>,
  buttonRef: React.RefObject<HTMLButtonElement>
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  taskInput: "",
  taskType: "todo",
  image: undefined,
  setTaskInput: input => set({ taskInput: input }),
  setTaskType: type => set({ taskType: type }),
  setImage: image => set({ image: image }),
  openModal: task => set({ isOpen: true, taskType: task }),
  closeModal: () => set({ isOpen: false }),
  imagePickerRef: createRef<HTMLInputElement>(),
  buttonRef: createRef<HTMLButtonElement>()
}))
