import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0];
  const filterTag = tag === 'All' ? undefined : tag;

  return <NotesClient tag={filterTag} />;
}

