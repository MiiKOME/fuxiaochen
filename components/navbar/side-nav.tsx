'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BookText, HomeIcon, Tags } from 'lucide-react';

import { PATHS } from '@/config';

import { buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/util';

const adminNavItems: Array<{
  label: string;
  link: string;
  icon?: React.ReactNode;
}> = [
  {
    label: '首页',
    link: PATHS.ADMIN_HOME,
    icon: <HomeIcon className="w-[18px] h-[18px]" />,
  },
  {
    label: '文章管理',
    link: PATHS.ADMIN_ARTICLE,
    icon: <BookText className="w-[18px] h-[18px]" />,
  },
  {
    label: '标签管理',
    link: PATHS.ADMIN_TAG,
    icon: <Tags className="w-[18px] h-[18px]" />,
  },
];

export function SideNav() {
  const pathname = usePathname();

  return adminNavItems.map((el) => (
    <Link
      key={el.link}
      href={el.link}
      className={cn(
        buttonVariants({
          variant: pathname === el.link ? 'secondary' : 'default',
        }),
        'text-md px-4 py-2 flex gap-2 items-center !justify-start w-full',
      )}
    >
      {el.icon}
      <span>{el.label}</span>
    </Link>
  ));
}
