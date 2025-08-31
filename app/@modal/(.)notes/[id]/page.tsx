import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notesApi } from '@/lib/api/notes';
import Modal from '@/components/Modal/Modal';
import NotePreviewClient from './NotePreview.client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModalNotePage({ params }: PageProps) {
  const { id } = await params;
  
  const queryClient = new QueryClient();
  
  // Prefetch note data on server
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => notesApi.getNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Modal>
        <NotePreviewClient noteId={id} />
      </Modal>
    </HydrationBoundary>
  );
}

