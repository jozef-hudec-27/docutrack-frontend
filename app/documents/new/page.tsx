'use client'

import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { toast } from 'react-hot-toast'

import Navbar from '../../components/Navbar/Navbar'
import withAuth from '../../hoc/with-auth'
import { fileTypes } from '../../config'

import type { FormEvent } from 'react'

import type { NewDocumentFormState } from '../../types/form-types'

function NewDocumentPage() {
  const [formData, setFormData] = useState<NewDocumentFormState>({
    name: '',
    tag: '',
    description: '',
  })
  const [file, setFile] = useState<File | null>(null)

  function handleChange(file: File) {
    setFile(file)
  }

  function onTypeError() {
    toast('File type not supported.', { icon: '😠' })
  }

  function onSizeError() {
    toast('File is too big (max 10 MB).', { icon: '😠' })
  }

  function limitLength(string: string) {
    return string.length < 25 ? string : `${string.slice(0, 30)}...`
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <>
      <Navbar />

      <section className="mt-[96px] flex justify-center">
        <form className="flex flex-col items-center gap-[16px] w-[300px]" onSubmit={onSubmit}>
          <FileUploader
            handleChange={handleChange}
            onTypeError={onTypeError}
            onSizeError={onSizeError}
            name="file"
            types={fileTypes}
            classes="w-[300px]"
            hoverTitle=" "
            minSize={0}
            maxSize={10}
            required
          >
            <div className="flex justify-center items-center px-[12px] py-[12px] border-black-5 border-[2px] rounded-[16px] cursor-pointer">
              <p className="text-black-50">{file ? limitLength(file.name) : 'Drop file or click to upload'}</p>
            </div>
          </FileUploader>

          <input
            type="text"
            id="input-name"
            className="input input--small w-full"
            placeholder="Name"
            aria-label="Name"
            value={formData.name}
            onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, name: e.target.value }))}
          />
          <input
            type="text"
            id="input-tag"
            className="input input--small w-full"
            placeholder="Tag"
            aria-label="Tag"
            value={formData.tag}
            onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, tag: e.target.value }))}
          />

          <textarea
            id="input-description"
            className="input input--small w-full min-h-[128px]"
            placeholder="Description"
            aria-label="Description"
            value={formData.description}
            onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, tag: e.target.value }))}
          ></textarea>

          <button type="submit" className="btn btn--secondary w-full">
            Create
          </button>
        </form>
      </section>
    </>
  )
}

export default withAuth(NewDocumentPage)
