import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@clerk/nextjs/server';

import { getUserLinks } from '../../data/links';

export default async function DashboardPage() {
    const {userId} = await auth();
    if (!userId) redirect('/');

    const userLinks = await getUserLinks(userId);
    console.log(userLinks);
    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

            {userLinks.length === 0 ? (
                <p className='text-muted-foreground'>No links created yet.</p>
            ) : (
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {userLinks.map((link) => (
                        <Card
                            key={link.id}
                            className='hover:shadow-lg transition'
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
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
