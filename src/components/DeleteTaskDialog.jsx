import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { OctagonAlert, Trash, Trash2, X } from 'lucide-react';
import useTodoStore from '@/store/useTodoStore';
const DeleteTaskDialog = ({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone.This task will be permanently deleted.',
  onConfirm,
  children
}) => {

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                <OctagonAlert className="h-5 w-5 text-destructive" />
              </div>
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px]">{description} </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {' '}
              <X /> Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className=" bg-destructive/70 hover:bg-red-500 text-destructive-foreground"
              onClick={onConfirm}>
              {' '}
              <Trash />
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTaskDialog;
