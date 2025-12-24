import { Suspense } from "react";

import EventDetails from '@/components/EventDetails';

interface EventDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage(
    { params }: EventDetailsPageProps
) {
    const slug = params.then(p => p.slug);

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <EventDetails params={slug} />
            </Suspense>
        </main>
    )
};
