import Gallery from '@/views/Gallery';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('gallery');

export default function GalleryPage() {
  return <Gallery />;
}
