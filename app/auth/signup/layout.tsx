import { type Metadata } from 'next';

import { type FCProps } from '@/types';

export const metadata: Metadata = {
  title: '注册',
};

export default function Layout({ children }: FCProps) {
  return <>{children}</>;
}
