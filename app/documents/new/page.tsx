'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileUploader } from 'react-drag-drop-files'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import Navbar from '../../components/Navbar/Navbar'
import withAuth from '../../hoc/with-auth'
import { fileTypes } from '../../config'
import useInputs from '../../hooks/useInputs'
import { changeFormDataFactory } from '../../utils'
import api from '../../api/axios-instance'

import type { FormEvent } from 'react'
import type { AxiosError } from 'axios'
import type { NewDocumentFormState } from '../../types/form-types'

function NewDocumentPage() {
  const [formData, setFormData] = useState<NewDocumentFormState>({
    name: '',
    tag: '',
    description: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()

  const newDocumentMutation = useMutation({
    mutationFn: async (data: NewDocumentFormState & { file: File }) => {
      return await api(true).post('/documents', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    onError: (error: AxiosError) => {
      const err = error as { response: { data: { errors: { [key: string]: string[] } } } }
      const errors = err?.response?.data?.errors

      if (errors) {
        toast.remove()

        Object.keys(errors).forEach((field) => {
          errors[field].map((errMsg) => {
            toast(errMsg, { icon: '😠', duration: 10000 })
          })
        })
      } else {
        toast('Something went wrong.', { icon: '😠', duration: 6000 })
      }
    },
    onSuccess: () => {
      router.replace('/')
      toast('Document added.')
    },
  })

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = { ...formData, file }

    if (!!!data.description) {
      delete data.description
    }

    newDocumentMutation.mutate(data)
  }

  const changeFormData = changeFormDataFactory<NewDocumentFormState>(setFormData)

  const inputElements = useInputs<NewDocumentFormState>({
    inputs: [
      {
        type: 'text',
        id: 'input-name',
        className: 'input input--small w-full',
        placeholder: 'Name',
        'aria-label': 'Name',
        value: formData.name,
        onChange: (e) => changeFormData('name', e.target.value),
        maxLength: 255,
        required: true,
      },
      {
        type: 'text',
        id: 'input-tag',
        className: 'input input--small w-full',
        placeholder: 'Tag',
        'aria-label': 'Tag',
        value: formData.tag,
        onChange: (e) => changeFormData('tag', e.target.value),
        maxLength: 255,
        required: true,
      },
    ],
  })

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

          {inputElements}

          <textarea
            id="input-description"
            className="input input--small w-full min-h-[128px]"
            placeholder="Description"
            aria-label="Description"
            value={formData.description}
            onChange={(e) => changeFormData('description', e.target.value)}
            maxLength={2000}
          ></textarea>

          <button
            type="submit"
            className="btn btn--secondary w-full disabled:cursor-wait"
            disabled={newDocumentMutation.isPending}
          >
            Create
          </button>
        </form>
      </section>
    </>
  )
}

export default withAuth(NewDocumentPage)
