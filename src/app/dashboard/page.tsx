import React, { Suspense } from 'react';
import DashboardFetch from '@/components/home/Dashboard-fetch';

export default function Dashboard({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={
            <div>
                loading ...
            </div>}>
            <DashboardFetch
                params={params} />
        </Suspense>
    )
}
