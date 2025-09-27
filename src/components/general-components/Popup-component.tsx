import React from 'react';
import { XCircle } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button, buttonVariants } from '../ui/button';

type PopupType = 'success' | 'warning' | 'info' | 'error';
type PopupMode = 'viewinfo' | 'action';

interface PopupButton extends Partial<VariantProps<typeof buttonVariants>> {
  comp: React.ReactNode;
  onClick: () => void;
}
interface PopupComponentProps {
  isOpen: boolean;
  onClose: () => void;
  type: PopupType;
  mode: PopupMode;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  primaryButton?: PopupButton;
  secondaryButton?: PopupButton;
  className?: string;
  customComp?: React.ReactNode;
}

const PopupComponent: React.FC<PopupComponentProps> = ({
  isOpen,
  onClose,
  type,
  mode,
  icon,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  className = '',
  customComp,
}) => {
  const getBackgroundClass = () => {
    switch (type) {
      case 'success':
        return 'bg-main-bg';
      case 'warning':
      case 'error':
        return 'bg-main-bg';
      case 'info':
        return 'bg-main-bg';
      default:
        return 'bg-main-bg';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`!max-w-[660px] max-lg:w-[90%] rounded-3xl !bg-transparent  w-full p-0 overflow-hidden border-0 ${className}`}
      >
        <div className={`${getBackgroundClass()} text-white relative`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
          >
            <XCircle className="text-red-500" />
          </button>

          {/* Content */}
          <div className="px-8 py-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="text-6xl">{icon}</div>
            </div>

            {/* Title and Subtitle */}
            <DialogHeader className="space-y-3">
              <DialogTitle className=" lg:text-xl text-lg font-semibold text-white text-center">
                {title}
              </DialogTitle>
              <DialogDescription className="text-main-mute text-center text-sm lg:w-3/5 mx-auto">
                {subtitle}
              </DialogDescription>
            </DialogHeader>
            {customComp && customComp}
            {/* Buttons for action mode */}
            {mode === 'action' && (primaryButton || secondaryButton) && (
              <DialogFooter className="mt-8 !flex !justify-center gap-3 flex-row">
                {secondaryButton && (
                  <Button
                    variant={secondaryButton.variant || 'outline'}
                    onClick={secondaryButton.onClick}
                    className="!min-w-24 !w-[170px] max-lg:!w-fit"
                  >
                    {secondaryButton.comp}
                  </Button>
                )}
                {primaryButton && (
                  <Button
                    variant={primaryButton.variant || 'default'}
                    onClick={primaryButton.onClick}
                    className="!min-w-24 !w-[170px] max-lg:!w-fit"
                  >
                    {primaryButton.comp}
                  </Button>
                )}
              </DialogFooter>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupComponent;
