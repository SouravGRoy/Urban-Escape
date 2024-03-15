import React, { Suspense } from 'react';
import DashboardFetch from '@/components/home/Dashboard-fetch';
import Loader from '@/components/loader';

export default function Dashboard({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={
            <Loader />}>
            <DashboardFetch
                params={params} />
        </Suspense>
    )
}
