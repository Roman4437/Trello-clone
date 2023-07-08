import { useModalStore } from "@/store/ModalStore"

import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export default function ImagePicker() {
  const [image, setImage, imagePickerRef] = useModalStore(s => [s.image, s.setImage, s.imagePickerRef])

  function handlePickImage(event: React.ChangeEvent<HTMLInputElement>) {
    const image = event.target.files![0]
    const isImage = image.type.startsWith("image/")

    if (!isImage) return

    setImage(image)
  }

  function handleClearImage() {
    setImage(undefined)

    if (imagePickerRef.current)
      imagePickerRef.current.value = ""
  }

  return (
    <div>
      <button className="w-full border border-neutral-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        type="button"
        onClick={() => imagePickerRef.current?.click()}
      >
        <PhotoIcon className="h-6 mr-2 inline-block" />
        Upload Image
      </button>
      {image &&
        <Image
          className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed rounded-md"
          src={URL.createObjectURL(image)}
          width={176}
          height={176}
          alt="image"
          onClick={handleClearImage}
        />}
      <input
        hidden
        type="file"
        accept="image/*"
        ref={imagePickerRef}
        onChange={handlePickImage}
      />
    </div>
  )
}
