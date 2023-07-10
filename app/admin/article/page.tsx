'use client';

import React, { useState } from 'react';

import { Edit } from 'lucide-react';
import Link from 'next/link';
import useSWR from 'swr';

import { ClientPagination, PageLoading, PreviewImage } from '@/components';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PLACEHOLDER_COVER,
  ZERO,
} from '@/constants';
import { ARTICLE_URL, getArticles, updateArticle } from '@/services';
import { GetArticlesRequest } from '@/types';
import { formatToDate, obj2QueryString } from '@/utils';

import { DeleteArticleItemButton } from './delete-article-item-button';

const defaultGetArticlesReq: GetArticlesRequest = {
  pageSize: DEFAULT_PAGE_SIZE,
  page: DEFAULT_PAGE,
  title: undefined,
  published: undefined,
};

const AdminArticle = () => {
  const [req, setReq] = useState<GetArticlesRequest>({
    ...defaultGetArticlesReq,
  });
  const { data, isLoading, mutate } = useSWR(
    `${ARTICLE_URL}${obj2QueryString(req)}`,
    () => getArticles(req),
  );
  const articles = data?.data;
  const total = data?.total || 0;

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <div className="flex justify-end">
        <Link href={'/admin/create-article'}>
          <Button>创建文章</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">标题</TableHead>
            <TableHead className="w-[120px]">封面</TableHead>
            <TableHead className="w-[180px]">friendly_url</TableHead>
            <TableHead className="w-[220px]">描述</TableHead>
            <TableHead className="w-[160px]">标签</TableHead>
            <TableHead className="w-[160px]">创建时间</TableHead>
            <TableHead className="w-[160px]">更新时间</TableHead>
            <TableHead className="w-[120px]">发布状态</TableHead>
            <TableHead className="min-w-[120px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles?.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="max-w-[220px] text-ellipsis overflow-hidden whitespace-nowrap">
                {article.title}
              </TableCell>
              <TableCell className="w-[120px]">
                <PreviewImage
                  triggerNode={
                    <img
                      src={article.cover ? article.cover : PLACEHOLDER_COVER}
                      className="cursor-pointer"
                      alt={article.title}
                    />
                  }
                  imageUrl={article.cover ? article.cover : PLACEHOLDER_COVER}
                />
              </TableCell>
              <TableCell className="w-[180px] text-ellipsis overflow-hidden whitespace-nowrap">
                {article.friendlyUrl}
              </TableCell>
              <TableCell className="w-[220px]">
                <div className="text-xs text-ellipsis overflow-hidden break-all line-clamp-3">
                  {article.description}
                </div>
              </TableCell>
              <TableCell className="w-160px text-primary-500 text-xs font-medium">
                {article.tags
                  ? article.tags.map((tag) => tag.name).join('、')
                  : '-'}
              </TableCell>
              <TableCell className="w-[160px]">
                {formatToDate(new Date(article.createdAt))}
              </TableCell>
              <TableCell className="w-[160px]">
                {formatToDate(new Date(article.updatedAt))}
              </TableCell>
              <TableCell className="w-[120px]">
                <div className="flex flex-col justify-center space-y-1">
                  <Switch
                    checked={article.published}
                    onCheckedChange={(checked) => {
                      updateArticle(article.id, { published: checked })
                        .then((res) => {
                          if (res.code !== ZERO) {
                            toast({
                              variant: 'destructive',
                              title: res.msg || 'Error',
                              description: res.error || 'error',
                            });
                          } else {
                            toast({
                              variant: 'default',
                              title: 'Success',
                              description: '操作成功',
                            });
                          }
                        })
                        .finally(() => {
                          mutate();
                        });
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="flex space-x-2 min-w-[120px]">
                <Link href={`/admin/create-article?id=${article.id}`}>
                  <Button size={'icon'} variant={'outline'}>
                    <Edit size={16} />
                  </Button>
                </Link>
                <DeleteArticleItemButton
                  article={article}
                  refreshArticle={mutate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {Boolean(total) ? (
        <ClientPagination
          className="mt-4"
          page={req.page}
          total={total}
          changePage={(currentPage: number) => {
            setReq({
              ...req,
              page: currentPage,
            });
          }}
        />
      ) : (
        <div className="w-full text-center p-8 text-gray-500 h-[44vh]">
          无数据
        </div>
      )}
    </div>
  );
};

export default AdminArticle;