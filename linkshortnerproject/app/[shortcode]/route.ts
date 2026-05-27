// /app/[shortCode]/route.ts

import {NextResponse} from 'next/server';

import {getLinkByShortCode} from '../../data/links';

export async function GET(
    req: Request,
    context: {params: Promise<{shortcode: string}>},
) {
    const {shortcode} = await context.params;
    console.log('shortCode', shortcode);

    if (!shortcode) {
        return NextResponse.json({error: 'Shortcode missing'}, {status: 400});
    }

    try {
        const link = await getLinkByShortCode(shortcode);

        if (!link) {
            return NextResponse.json({error: 'Link not found'}, {status: 404});
        }

        // ✅ Redirect to original URL
        return NextResponse.redirect(link.url, 301);
    } catch (err) {
        return NextResponse.json(
            {
                error:
                    err instanceof Error
                        ? err.message
                        : 'Internal Server Error',
            },
            {status: 500},
        );
    }
}
