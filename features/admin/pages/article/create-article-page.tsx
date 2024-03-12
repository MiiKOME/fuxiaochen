import Link from 'next/link';

import { PATHS, PATHS_MAP } from '@/config';

import { CreateArticleForm } from '../../components';

export const CreateArticlePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href={PATHS.ADMIN_ARTICLE}>
          <h2 className="text-3xl font-semibold tracking-tight transition-colors text-foreground/80 hover:text-foreground ">
            {PATHS_MAP[PATHS.ADMIN_ARTICLE_CREATE]}
          </h2>
        </Link>

        <div>/</div>
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          创建文章
        </h2>
      </div>

      <CreateArticleForm />
    </div>
  );
};
