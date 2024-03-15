'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LogOut } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { signOutAction } from './auth.action';

export type LoggedInDropdownProps = PropsWithChildren;

export const LoggedInDropdown = (props: LoggedInDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <form>
          <DropdownMenuItem
            onClick={() => {
              signOutAction();
            }}
          >
            <LogOut size={16} className='mr-2' />
            Logout
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
