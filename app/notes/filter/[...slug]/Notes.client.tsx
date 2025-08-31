'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { notesApi } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', tag, debouncedSearchQuery, currentPage],
    queryFn: () => {
      if (tag) {
        return notesApi.getNotesByTag(tag, debouncedSearchQuery, currentPage);
      }
      return notesApi.getNotes(debouncedSearchQuery, currentPage);
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <div className={css.loading}>Loading notes...</div>;
  }

  if (error) {
    return <div className={css.error}>Error loading notes</div>;
  }

  const notes = data?.notes || [];
  const totalPages = Math.ceil((data?.total || 0) / 12);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>
          {tag ? `Notes with tag "${tag}"` : 'All Notes'}
        </h1>
        <button className={css.createButton} onClick={openModal}>
          Create Note
        </button>
      </div>

      <SearchBox 
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search notes..."
      />

      <div className={css.content}>
        <p className={css.count}>
          {data?.total || 0} {(data?.total || 0) === 1 ? 'note' : 'notes'} found
        </p>

        {notes.length === 0 ? (
          <div className={css.empty}>
            <p>No notes found.</p>
            <button className={css.createLink} onClick={openModal}>
              Create your first note
            </button>
          </div>
        ) : (
          <>
            <NoteList notes={notes} />
            
            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                changePage={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

