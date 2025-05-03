'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, Button } from '@/shared/ui';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">Wirklich löschen?</h2>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Diese Aktion kann nicht rückgängig gemacht werden.
        </p>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Abbrechen
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Wird gelöscht...' : 'Löschen'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
