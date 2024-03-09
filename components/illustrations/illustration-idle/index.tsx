import * as React from 'react';

import { cn } from '@/lib/util';

import { IllustrationIdleDark } from './illustration-idle-dark';
import { IllustrationIdleLight } from './illustration-idle-light';

export function IllustrationIdle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <>
      <IllustrationIdleDark
        {...props}
        className={cn(props.className, 'hidden dark:block')}
      />
      <IllustrationIdleLight
        {...props}
        className={cn(props.className, 'block dark:hidden')}
      />
    </>
  );
}
