import { useShallow } from 'zustand/react/shallow'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import useDocumentStore from '../../state/document-store'

import Modal from '../modal/Modal'
import api from '../../api/axios-instance'

import type { FormEvent } from 'react'

function DeleteDocumentModal() {
  const [documentToDelete, setDocumentToDelete, setDocuments] = useDocumentStore(
    useShallow((state) => [state.documentToDelete, state.setDocumentToDelete, state.setDocuments])
  )

  const deleteDocumentMutation = useMutation({
    mutationFn: async () => {
      return api(true).delete(`/documents/${documentToDelete?.id}`)
    },
    onError: () => {
      toast('Could not delete document.', { icon: '😠' })
    },
    onSuccess: () => {
      setDocumentToDelete(undefined)
      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== documentToDelete?.id))
    },
  })

  function setIsOpen(open: boolean) {
    if (!open) {
      setDocumentToDelete(undefined)
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    deleteDocumentMutation.mutate()
  }

  return (
    <Modal isOpen={!!documentToDelete} setIsOpen={setIsOpen} contentLabel="Delete document modal">
      <div className="flex flex-col items-center gap-[8px]">
        <h2>Do you really want to delete this document?</h2>
        <p>You can't undo this.</p>
      </div>

      <form className="flex justify-center flex-wrap gap-[24px] mt-[36px]" onSubmit={onSubmit}>
        <button
          type="submit"
          className="btn btn--secondary disabled:cursor-wait"
          disabled={deleteDocumentMutation.isPending}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          No, go back
        </button>
      </form>
    </Modal>
  )
}

export default DeleteDocumentModal
