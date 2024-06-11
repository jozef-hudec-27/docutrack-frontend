'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { Filter } from 'react-bootstrap-icons'

import useDocumentStore from './state/document-store'

import Navbar from './components/Navbar/Navbar'
import Document from './components/Document/Document'
import EditDocumentModal from './components/Document/EditDocumentModal'
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
        <div className="flex justify-center items-center gap-[16px] flex-wrap">
          <input
            type="text"
            className="input input--small w-[300px]"
            placeholder="Name"
            aria-label="Filter documents by name"
          />
          <input
            type="text"
            className="input input--small w-[150px]"
            placeholder="Tag"
            aria-label="Filter documents by tag"
          />
          <button className="btn btn--secondary flex items-center gap-[8px] ml-[8px]" title="Filter documents">
            <Filter size={24} aria-hidden />
            Filter
          </button>
        </div>
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

      <EditDocumentModal />
    </>
  )
}

export default withAuth(Home)
