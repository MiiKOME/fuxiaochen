import { NextResponse } from 'next/server';

import prisma from '@/libs/prisma';
import { DynamicRouteHandleParams, Tag } from '@/types';
import { createSuccessResponse } from '@/utils';

export async function GET(req: Request, { params }: DynamicRouteHandleParams) {
  const tagID = params.id;
  // const tagInDB = await prisma.tag.findUnique({ where: { id: tagID } });
  // TODO: 处理不存在的情况
  const tag = await prisma.tag.findFirst({
    where: {
      id: tagID,
    },
    include: {
      articles: true,
    },
  });
  if (!tag) {
    return NextResponse.json(createSuccessResponse<null>(null));
  }
  const { articles, ...rest } = tag;
  const tagWithArticleCount: Tag = {
    ...rest,
    articleCount: articles?.filter((item) => item.published)?.length || 0,
  };
  return NextResponse.json(createSuccessResponse<Tag>(tagWithArticleCount));
}

export async function PUT(req: Request, { params }: DynamicRouteHandleParams) {
  const tagID = params.id;
  const body = await req.json();
  // const tagInDB = await prisma.tag.findUnique({ where: { id: tagID } });
  // TODO: 处理不存在的情况
  const tag = await prisma.tag.update({
    where: { id: tagID },
    data: { ...body },
    include: {
      articles: true,
    },
  });
  const { articles, ...rest } = tag;
  const tagWithArticleCount: Tag = {
    ...rest,
    articleCount: articles?.length || 0,
  };
  return NextResponse.json(createSuccessResponse<Tag>(tagWithArticleCount));
}

export async function DELETE(
  req: Request,
  { params }: DynamicRouteHandleParams,
) {
  const tagID = params.id;
  const tag = await prisma.tag.delete({
    where: { id: tagID },
    include: {
      articles: true,
    },
  });
  const { articles, ...rest } = tag;
  const tagWithArticleCount: Tag = {
    ...rest,
    articleCount: articles?.length || 0,
  };
  return NextResponse.json(createSuccessResponse<Tag>(tagWithArticleCount));
}
