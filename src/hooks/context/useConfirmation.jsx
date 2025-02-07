import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export const useConfirmation = ({ title, message }) => {
  const [promise, setPromise] = useState(null);

  async function Confirmation() {
    console.log('confirsm triger')
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(true);
    handleClose();
  }

  const ConfirmDialog = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
            onClick={handleClose} 
            varient="secondary"
            >
                Cancel
            </Button>
            <Button
            onClick={handleConfirm}
            >
                Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    Confirmation,
    ConfirmDialog
  }
};
