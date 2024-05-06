import React, { FC } from 'react';
import {
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastClose,
  Toast
} from '@/ui/toast';
import { useToast } from '@/ui/use-toast';

const Toaster: FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
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
