import 'typeface-roboto';
import '../wca_data/cubing-icons.css';
import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return <ClientOnly />;
}
