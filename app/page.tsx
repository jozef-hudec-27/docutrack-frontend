'use client'

import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Filter, Tag, FileEarmark } from 'react-bootstrap-icons'

import Navbar from './components/Navbar/Navbar'
import useDocumentStore from './state/document-store'
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

      <section className="mt-[96px] flex justify-center">
        <div className="flex items-center gap-[16px]">
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
          <div>
            <p>You don't have any documents yet.</p>
          </div>
        )}

        <div className="flex flex-col gap-[32px]">
          {documents.map((document) => {
            return (
              <div key={document.id} className="flex flex-col gap-[8px] p-[12px] hover:bg-black-2 rounded-[8px]">
                <div className="flex items-center gap-[4px] text-black-50">
                  <Tag size={18} aria-hidden />
                  <p className="text-sm" aria-label={`Document tag: ${document.tag}`}>
                    {document.tag}
                  </p>
                </div>

                <div className="flex items-center gap-[12px] text-black-100">
                  <FileEarmark size={24} />
                  <p>{document.name}</p>
                </div>

                <button className='w-fit mt-[8px] text-black-100 text-sm font-bold'>...more</button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default withAuth(Home)
