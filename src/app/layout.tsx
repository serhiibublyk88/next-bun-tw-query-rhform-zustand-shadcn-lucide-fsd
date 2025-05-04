import { QueryProvider } from '@/shared/providers/QueryProvider';
import { Toaster } from '@/shared/ui/toaster';
import { Header } from '@/widgets/header';
import './globals.css';

export const metadata = {
  title: 'Autokatalog',
  description: 'Autoverwaltung mit Next.js, Zustand und Shadcn',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <QueryProvider>
          <Header />
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
