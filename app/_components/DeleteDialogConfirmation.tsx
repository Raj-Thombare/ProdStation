import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
  deleteProduct: () => void;
};

const DeleteDialogConfirmation = ({ children, deleteProduct }: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription asChild>
              <div className='p-5'>
                <h2>Do you really want to delete this product?</h2>
                <div className='flex justify-end gap-5 mt-5'>
                  <Button>Close</Button>
                  <Button variant='destructive' onClick={deleteProduct}>
                    Delete
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteDialogConfirmation;
