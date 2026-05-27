'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {updateLinkAction} from '@/app/dashboard/actions';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';

export function EditLinkDialog({
    id,
    initialUrl,
}: {
    id: number;
    initialUrl: string;
}) {
    const [url, setUrl] = useState(initialUrl);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleUpdate = async () => {
        const res = await updateLinkAction({id, url});

        if (res?.error) {
            alert(Object.values(res.error)[0]?.[0]);
            return;
        }

        setOpen(false);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm'>
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Link</DialogTitle>
                </DialogHeader>

                <Input value={url} onChange={(e) => setUrl(e.target.value)} />

                <Button onClick={handleUpdate}>Update</Button>
            </DialogContent>
        </Dialog>
    );
}
