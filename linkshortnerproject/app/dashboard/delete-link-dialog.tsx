'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {deleteLinkAction} from '@/app/dashboard/actions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';

export function DeleteLinkDialog({id}: {id: number}) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const res = await deleteLinkAction({id});

        if (res?.error) {
            alert(Object.values(res.error)[0]?.[0]);
            return;
        }

        setOpen(false);
        router.refresh();
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant='destructive' size='sm'>
                    Delete
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this link?
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
