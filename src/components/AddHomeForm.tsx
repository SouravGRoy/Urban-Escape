"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { countries } from '../../config/countries'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { categories } from '../../config/categories'
import ReactQuill from 'react-quill';
import { useForm } from "react-hook-form"
import 'react-quill/dist/quill.snow.css';
import { yupResolver } from "@hookform/resolvers/yup"
import { AddHomeType, homeSchema } from '../../validations/homeSchema'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { generateRandomNum } from '@/lib/utils'
import ENV from '../../config/ENV'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'


export default function AddHomeForm() {
  const router = useRouter()
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null);
  const supabase = createClientComponentClient()
  const [homeCategories, setHomeCategories] = useState<Array<string> | []>([]);
  // *VALIDATION 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddHomeType>({
    resolver: yupResolver(homeSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setValue("image", file)
    }
  };
  // UPDATED Code - Because In useEffect hook, you're using setValue without including it in the dependency array. This leads to the warning you mentioned. You should include setValue in the dependency array to address the warning.
  useEffect(() => {
    setValue("categories", homeCategories);
    setValue("description", description);
  }, [homeCategories, description, setValue]);


  const onSubmit = async (payload: AddHomeType) => {
    setLoading(true);
    // Updated as the user object is null or undefined, this will prevent potential runtime errors.
    const user = await supabase.auth.getUser?.()
    const uniquePath = Date.now() + "_" + generateRandomNum()
    const { data: imageData, error: imgErr } = await supabase.storage.from(ENV.UE_BUCKET).upload(uniquePath, image!)

    if (imgErr) {
      toast.error(imgErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }
    const { data: homeData, error: homeErr } = await supabase.from("homes").insert({
      user_id: user.data.user?.id,
      title: payload.title,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      price: payload.price,
      description: payload.description,
      categories: homeCategories,
      image: imageData?.path,
    })
    if (homeErr) {
      toast.error(homeErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }
    router.push("/dashboard?success=Home added successfully")

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <div className='mt-2'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id="title"
            placeholder='Enter your title here'
            {...register("title")} />
          <span className='text-red-500'>{errors?.title?.message}</span>
        </div>
        <div className='mt-2'>
          <Label htmlFor='country'>Countries</Label>
          <select
            className='outline-brand h-10 px-3 py-2 rounded-md w-full border'
            id='country'
            {...register("country")}
          >
            <option value="">⎯ Select Country ⎯</option>
            {countries.map((item) =>
              (<option key={item.value} value={item.value}>{item.label}</option>)
            )}
          </select>
          <span className='text-red-500'>{errors?.country?.message}</span>
        </div>
        <div className='mt-2'>
          <Label htmlFor='state'>State</Label>
          <Input
            id="state"
            placeholder='Enter your state here'
            {...register("state")}
          />
          <span className='text-red-500'>{errors?.state?.message}</span>
        </div>
        <div className='mt-2'>
          <Label htmlFor='city'>City</Label>
          <Input
            id="city"
            placeholder='Enter your city here'
            {...register("city")}
          />
          <span className='text-red-500'>{errors?.city?.message}</span>
        </div>
        <div className='mt-2'>
          <Label htmlFor='price'>Price</Label>
          <Input
            id="price"
            placeholder='Enter your price here'
            {...register("price")}
          />
          <span className='text-red-500'>{errors?.price?.message}</span>
        </div>
        {/* Images are added from here */}
        <div className='mt-2'>
          <Label htmlFor='image'>Image</Label>
          <Input id="image" type='file' multiple onChange={handleImageChange} />
          <span className='text-red-500'>{errors?.image?.message}</span>
        </div>
      </div>
      <div className='mt-2'>
        <Label htmlFor='Description'>Description</Label>

        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          className='w-full'
        />

        <span className='text-red-500'>{errors?.description?.message}</span>
      </div>
      <div className='mt-2'>
        <Label htmlFor='categories'>Categories</Label>
        <div className=' grid grid-cols-2 mt-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {categories.map((item) =>
          (<div key={item.name} className='flex space-x-4'>
            <input type='checkbox'
              id={item.name}
              value={item.name}
              checked={(homeCategories as string[]).includes(item.name)} onChange={(event) => {
                if (event.target.checked) {
                  setHomeCategories([...homeCategories, item.name])
                } else {
                  const filterCategories = homeCategories.filter((item) => item !== event.target.value);
                  setHomeCategories(filterCategories)
                }
              }} />

            <Label htmlFor={item.name} className='text-sm font-medium'>{item.name}</Label>
          </div>
          ))}
        </div>
        <span className='text-red-500'>{errors?.categories?.message}</span>
      </div>
      <Button className="bg-brand w-full mt-5 mb-5" disabled={loading}>{loading ? "Processing.. ⚙︎" : "Submit"}</Button>
    </form>
  )
}
