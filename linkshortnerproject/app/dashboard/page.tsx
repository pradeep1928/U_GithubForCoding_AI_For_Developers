import {redirect} from 'next/navigation';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {auth} from '@clerk/nextjs/server';

import {getUserLinks} from '../../data/links';
import {CreateLinkDialog} from './create-link-dialog';
import {DeleteLinkDialog} from './delete-link-dialog';
import {EditLinkDialog} from './edit-link-dialog';

export default async function DashboardPage() {
    const {userId} = await auth();
    if (!userId) redirect('/');

    const userLinks = await getUserLinks(userId);
    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                <CreateLinkDialog />
            </div>
            {userLinks.length === 0 ? (
                <p className='text-muted-foreground'>No links created yet.</p>
            ) : (
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {userLinks.map((link) => (
                        <Card
                            key={link.id}
                            className='hover:shadow-lg transition bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-cyan-500/10'
                        >
                            <CardHeader>
                                <CardTitle className='text-lg'>
                                    {link.shortCode}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className='space-y-2'>
                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            Short URL
                                        </p>
                                        <p className='text-blue-600 font-mono break-all'>
                                            {process.env.NEXT_PUBLIC_APP_URL}/
                                            {link.shortCode}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='text-xs text-muted-foreground'>
                                            Original URL
                                        </p>
                                        <a
                                            href={link.url}
                                            target='_blank'
                                            className='text-sm underline break-all'
                                        >
                                            {link.url}
                                        </a>
                                    </div>

                                    <p className='text-xs text-muted-foreground pt-2'>
                                        Created:{' '}
                                        {new Date(
                                            link.createdAt!,
                                        ).toLocaleString()}
                                    </p>

                                    <div className='flex gap-2 pt-3'>
                                        <EditLinkDialog
                                            id={link.id}
                                            initialUrl={link.url}
                                        />
                                        <DeleteLinkDialog id={link.id} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
