'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'

import useDocumentStore from './state/document-store'

import Navbar from './components/Navbar/Navbar'
import FilterDocumentsForm from './components/Document/FilterDocumentsForm'
import Document from './components/Document/Document'
import EditDocumentModal from './components/Document/EditDocumentModal'
import DeleteDocumentModal from './components/Document/DeleteDocumentModal'
import FilteredDocumentsModal from './components/Document/FilteredDocumentsModal'
import withAuth from './hoc/with-auth'

function Home() {
  const [documents, fetchDocuments, documentsLoading, documentsFetched] = useDocumentStore(
    useShallow((state) => [state.documents, state.fetchDocuments, state.loading, state.fetched])
  )

  useEffect(() => {
    if (!documentsFetched) {
      fetchDocuments()
    }
  }, [documentsFetched])

  return (
    <>
      <Navbar />

      <section className="mt-[96px] flex justify-center px-[12px]">
        <FilterDocumentsForm />
      </section>

      <section className="mt-[96px] flex justify-center">
        {documentsLoading && <p>Loading your documents...</p>}

        {!documentsLoading && !documents.length && (
          <p>
            You don't have any documents yet.{' '}
            <Link href="/documents/new" aria-label="Add some documents">
              Add some.
            </Link>
          </p>
        )}

        {!documentsLoading && !!documents.length && (
          <div className="flex flex-col gap-[32px] w-11/12 md:w-2/3 lg:w-1/3">
            {documents.map((doc) => {
              return <Document key={doc.id} doc={doc} />
            })}
          </div>
        )}
      </section>

      <FilteredDocumentsModal />
      <EditDocumentModal />
      <DeleteDocumentModal />
    </>
  )
}

export default withAuth(Home)
