'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {createLinkAction} from '@/app/dashboard/actions';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export function CreateLinkDialog() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // ✅ control dialog
    const router = useRouter();

    const handleCreate = async () => {
        setLoading(true);

        const res = await createLinkAction({url});

        setLoading(false);

        if (res?.error) {
            const firstError =
                Object.values(res.error)[0]?.[0] || 'Something went wrong';
            alert(firstError);
            return;
        }

        // ✅ success case
        setUrl('');
        setOpen(false); // ✅ CLOSE MODAL
        router.refresh(); // ✅ refresh dashboard
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Link</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Short Link</DialogTitle>
                </DialogHeader>

                <div className='space-y-4'>
                    <div>
                        <Label>URL</Label>
                        <Input
                            placeholder='https://example.com'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleCreate}
                        disabled={loading}
                        className='w-full'
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
