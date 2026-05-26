import {redirect} from 'next/navigation';

import {Button} from '@/components/ui/button';
import {SignInButton, SignUpButton} from '@clerk/nextjs';
import {auth} from '@clerk/nextjs/server';

export default async function Home() {
    const {userId} = await auth();
    if (userId) redirect('/dashboard');

    return (
        <main className='flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'>
            {/* Hero Section */}
            <section className='flex flex-col items-center justify-center px-6 py-24 sm:py-32'>
                <div className='max-w-4xl mx-auto text-center'>
                    <div className='mb-8'>
                        <h1 className='text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-50 mb-6'>
                            Shorten Your Links,{' '}
                            <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                                Expand Your Reach
                            </span>
                        </h1>
                        <p className='text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed'>
                            Create short, shareable links in seconds. Track
                            clicks, manage your URLs, and amplify your online
                            presence with our powerful link shortener.
                        </p>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <SignUpButton mode='modal'>
                            <Button className='h-12 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white'>
                                Get Started Free
                            </Button>
                        </SignUpButton>
                        <SignInButton mode='modal'>
                            <Button
                                variant='outline'
                                className='h-12 px-8 text-base font-semibold border-slate-600 text-slate-50 hover:bg-slate-800'
                            >
                                Sign In
                            </Button>
                        </SignInButton>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='px-6 py-20 sm:py-24'>
                <div className='max-w-6xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl sm:text-5xl font-bold text-slate-50 mb-4'>
                            Powerful Features
                        </h2>
                        <p className='text-lg text-slate-400 max-w-2xl mx-auto'>
                            Everything you need to manage and optimize your
                            links
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {/* Feature 1 */}
                        <div className='bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-blue-500/10'>
                            <div className='w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4'>
                                <svg
                                    className='w-6 h-6 text-blue-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-50 mb-2'>
                                Instant Shortening
                            </h3>
                            <p className='text-slate-400'>
                                Convert long URLs into concise, shareable links
                                in just one click
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className='bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-cyan-500/10'>
                            <div className='w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4'>
                                <svg
                                    className='w-6 h-6 text-cyan-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-50 mb-2'>
                                Advanced Analytics
                            </h3>
                            <p className='text-slate-400'>
                                Track clicks, monitor traffic patterns, and gain
                                insights into your link performance
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className='bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-purple-500/10'>
                            <div className='w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4'>
                                <svg
                                    className='w-6 h-6 text-purple-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 6V4m6 2a8 8 0 11-16 0 8 8 0 0116 0zm-7 5a1 1 0 11-2 0 1 1 0 012 0z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-50 mb-2'>
                                Custom Aliases
                            </h3>
                            <p className='text-slate-400'>
                                Create branded, memorable short links that
                                reflect your brand identity
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className='bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-green-500/10'>
                            <div className='w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4'>
                                <svg
                                    className='w-6 h-6 text-green-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-50 mb-2'>
                                Secure & Safe
                            </h3>
                            <p className='text-slate-400'>
                                Your links are encrypted and protected with
                                enterprise-grade security
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className='bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-pink-500/10'>
                            <div className='w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4'>
                                <svg
                                    className='w-6 h-6 text-pink-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-50 mb-2'>
                                Easy Integration
                            </h3>
                            <p className='text-slate-400'>
                                Simple API and integrations with your favorite
                                tools and platforms
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className='bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-slate-600/80 transition-all hover:shadow-lg hover:shadow-yellow-500/10'>
                            <div className='w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4'>
                                <svg
                                    className='w-6 h-6 text-yellow-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M13 10V3L4 14h7v7l9-11h-7z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-50 mb-2'>
                                Lightning Fast
                            </h3>
                            <p className='text-slate-400'>
                                Optimized infrastructure ensures your links
                                redirect instantly, anywhere in the world
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='px-6 py-20 sm:py-24 bg-slate-800/50 border-t border-slate-700/50'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h2 className='text-4xl sm:text-5xl font-bold text-slate-50 mb-6'>
                        Ready to Get Started?
                    </h2>
                    <p className='text-xl text-slate-300 mb-8 max-w-2xl mx-auto'>
                        Join thousands of users who are already shortening links
                        and tracking their performance
                    </p>
                    <div className='flex justify-center'>
                        <SignUpButton mode='modal'>
                            <Button className='h-12 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white'>
                                Create Account
                            </Button>
                        </SignUpButton>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='px-6 py-12 border-t border-slate-700/50 mt-auto'>
                <div className='max-w-6xl mx-auto text-center'>
                    <p className='text-slate-400'>
                        © 2026 LinkShortener. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}
