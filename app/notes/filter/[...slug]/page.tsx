import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryId = slug?.[0];
  const filterCategoryId = categoryId === 'All' ? undefined : categoryId;

  return <NotesClient categoryId={filterCategoryId} />;
}

