import Link from 'next/link';

import { PATHS } from '@/config';

import { EditSnippetForm } from '../components/edit-snippet-form';

export const EditSnippetPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href={PATHS.ADMIN_SNIPPET}>
          <h2 className="text-3xl font-semibold tracking-tight transition-colors text-foreground/80 hover:text-foreground ">
            Snippet管理
          </h2>
        </Link>

        <div>/</div>
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          编辑Snippet
        </h2>
      </div>

      <EditSnippetForm />
    </div>
  );
};