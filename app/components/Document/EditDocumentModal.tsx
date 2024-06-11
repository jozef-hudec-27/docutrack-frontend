import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import useDocumentStore from '../../state/document-store'

import Modal from '../modal/Modal'
import useInputs from '../../hooks/useInputs'
import { changeFormDataFactory } from '../../utils'
import api from '../../api/axios-instance'

import type { ComponentPropsWithRef, FormEvent } from 'react'
import type { NewDocumentFormState } from '../../types/form-types'

function EditDocumentModal() {
  const [inputs, setInputs] = useState<ComponentPropsWithRef<'input'>[]>([])
  const [formData, setFormData] = useState<NewDocumentFormState>({
    name: '',
    tag: '',
    description: '',
  })

  const [documentToEdit, setDocumentToEdit, setDocuments] = useDocumentStore(
    useShallow((state) => [state.documentToEdit, state.setDocumentToEdit, state.setDocuments])
  )

  const editDocumentMutation = useMutation({
    mutationFn: async (data: NewDocumentFormState) => {
      return await api(true).put(`/documents/${documentToEdit?.id}`, data)
    },
    onError: () => {
      toast('Failed to edit the document.', { icon: '😠' })
    },
    onSuccess: () => {
      setDocumentToEdit(undefined)
      setDocuments((prevDocuments) => {
        const updatedDocuments = prevDocuments.map((doc) =>
          doc.id === documentToEdit.id
            ? {
                ...doc,
                ...formData,
              }
            : { ...doc }
        )

        return updatedDocuments
      })
    },
  })

  const changeFormData = changeFormDataFactory(setFormData)

  useEffect(() => {
    if (documentToEdit) {
      setFormData({
        name: documentToEdit.name,
        tag: documentToEdit.tag,
        description: documentToEdit.description || '',
      })

      setInputs([
        {
          type: 'text',
          id: 'input-name',
          className: 'input input--small w-full',
          placeholder: 'Name',
          'aria-label': 'Name',
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
          onChange: (e) => changeFormData('tag', e.target.value),
          maxLength: 255,
          required: true,
        },
      ])

      setTimeout(() => {
        const nameInput = document.getElementById('input-name') as HTMLInputElement | null
        const tagInput = document.getElementById('input-tag') as HTMLInputElement | null

        if (nameInput && tagInput) {
          nameInput.value = documentToEdit.name
          tagInput.value = documentToEdit.tag
        }
      }, 0)
    } else {
      setInputs([])
      setFormData({ name: '', tag: '', description: '' })
    }
  }, [documentToEdit])

  const inputElements = useInputs({ inputs })

  function setIsOpen(open: boolean) {
    if (!open) {
      setDocumentToEdit(undefined)
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = { ...formData }

    if (!!!data.description) {
      delete data.description
    }

    editDocumentMutation.mutate(data)
  }

  return (
    documentToEdit && (
      <Modal isOpen={!!documentToEdit} setIsOpen={setIsOpen} contentLabel="Edit document modal">
        <form className="flex flex-col gap-[16px]" onSubmit={onSubmit}>
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
            className="btn btn--secondary disabled:cursor-wait"
            disabled={editDocumentMutation.isPending}
          >
            Save
          </button>
        </form>
      </Modal>
    )
  )
}

export default EditDocumentModal
