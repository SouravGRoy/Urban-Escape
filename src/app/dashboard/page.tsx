import React from 'react';
import Navbar from '@/components/base/Navbar'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getUEImageURL } from '@/lib/utils';
import { Eye, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeleteHomeBtn from '@/components/DeleteHomeBtn';
import Toast from '@/components/common/Toast';
import Link from 'next/link';

export default async function Dashboard() {

    const supabase = createServerComponentClient({ cookies })
    const user = await supabase.auth.getUser()
    const { data: homes, error } = await supabase.from("homes").select("id,image,title,country,city,state,price,created_at").eq("user_id", user.data.user?.id)
    return (
        <div>
          <Toast/>
            <Navbar />
            <div className='container mt-5'>
                <Table>
                    <TableCaption>Your added Homes</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Country</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead >Image</TableHead>
                            <TableHead >Price</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {homes &&
                            homes.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.country}</TableCell>
                                    <TableCell >{item.state}</TableCell>
                                    <TableCell>{item.city}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell >
                                        <Image
                                            src={getUEImageURL(item.image)}
                                            className='rounded-full shadow-sm w-12 h-12'
                                            width={50}
                                            height={50}
                                            alt='Home_img' />
                                    </TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell className="text-right  space-x-2">
                                       
                                          <DeleteHomeBtn id={item.id}/>
                                          <Link href={`/home/${item.id}`}>
                                          <Button size='sm' className='bg-green-300'
                                                style={{
                                                    padding: '5px 10px',
                                                    fontSize: '12px'
                                                }}>
                                                <Eye width={20} height={20} />
                                            </Button>
                                          </Link>
                                            
                                       
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}
