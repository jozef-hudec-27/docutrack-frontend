'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { toast } from 'react-hot-toast'

import useDocumentStore from './state/document-store'

import Navbar from './components/Navbar/Navbar'
import FilterDocumentsForm from './components/Document/FilterDocumentsForm'
import Document from './components/Document/Document'
import EditDocumentModal from './components/Document/EditDocumentModal'
import DeleteDocumentModal from './components/Document/DeleteDocumentModal'
import FilteredDocumentsModal from './components/Document/FilteredDocumentsModal'
import withAuth from './hoc/with-auth'

function Home() {
  const [nextDocumentsPage, setNextDocumentsPage] = useState<string | null>(null)

  const [documents, fetchDocuments, setDocuments, documentsLoading, initialDocumentsLoading, documentsFetched] =
    useDocumentStore(
      useShallow((state) => [
        state.documents,
        state.fetchDocuments,
        state.setDocuments,
        state.loading,
        state.initialLoading,
        state.fetched,
      ])
    )

  async function fetchMoreDocuments() {
    if (!nextDocumentsPage || documentsLoading || initialDocumentsLoading) {
      return false
    }

    try {
      const response = await fetchDocuments(Number(nextDocumentsPage.split('?page=')[1]))
      setNextDocumentsPage(response.next_page_url)
      setDocuments([...documents, ...response.data])

      if (!response.next_page_url) {
        toast('All documents loaded.', { position: 'bottom-center' })
      }
    } catch {
      toast('Could not fetch more documents.', { icon: '😠' })
    }
  }

  useEffect(() => {
    async function getDocuments() {
      try {
        const response = await fetchDocuments(1, true)
        setNextDocumentsPage(response.next_page_url)
        setDocuments(response.data)
      } catch {
        toast('Could not fetch your documents.', { icon: '😠' })
      }
    }

    if (!documentsFetched) {
      getDocuments()
    }
  }, [documentsFetched])

  useEffect(() => {
    function handleScroll() {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

      if (bottom) {
        fetchMoreDocuments()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [nextDocumentsPage])

  return (
    <>
      <Navbar />

      <section className="mt-[96px] flex justify-center px-[12px]">
        <FilterDocumentsForm />
      </section>

      <section className="mt-[96px] mb-[48px] flex justify-center">
        {initialDocumentsLoading && <p>Loading your documents...</p>}

        {!initialDocumentsLoading && !documents.length && (
          <p>
            You don't have any documents yet.{' '}
            <Link href="/documents/new" aria-label="Add some documents">
              Add some.
            </Link>
          </p>
        )}

        {!initialDocumentsLoading && !!documents.length && (
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
