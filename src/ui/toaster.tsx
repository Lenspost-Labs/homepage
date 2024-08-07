'use client';

import {
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastClose,
  useToast,
  Toast
} from '@/ui';
import { FC } from 'react';

const Toaster: FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ description, action, title, id, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export default Toaster;
