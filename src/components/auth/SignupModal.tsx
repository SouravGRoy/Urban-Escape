"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RegisterType, registerSchema } from "../../../validations/authShema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import SocialBtns from "./SocialBtns";

export default function SignupModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (payload: RegisterType) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
        },
      },
    });

    if (error) {
      toast.error(error.message, { theme: "colored" });
      setLoading(false);
    } else if (data.user) {
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      setOpen(false);
      router.refresh();
      toast.success("Logged in successfully", { theme: "colored" });
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <li
          className="hover:bg-gray-200 rounded-md p-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Sign up
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between items-center">
              <span>Sign Up</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-xl font-bold text-center">
                  Welcome to UrbanEscape
                </h1>
                <p className="text-sm mt-4 text-gray-500 dark:text-gray-400 font-semibold">
                  Create an account!
                </p>
                <div className="mt-4">
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your name"
                    aria-describedby="name-error"
                  />
                  <span id="name-error" className="text-red-400">
                    {errors.name?.message}
                  </span>
                </div>
                <div className="mt-4">
                  <Input
                    id="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    aria-describedby="email-error"
                  />
                  <span id="email-error" className="text-red-400">
                    {errors.email?.message}
                  </span>
                </div>
                <div className="mt-4">
                  <Input
                    id="password"
                    {...register("password")}
                    placeholder="Enter your password"
                    type="password"
                    aria-describedby="password-error"
                  />
                  <span id="password-error" className="text-red-400">
                    {errors.password?.message}
                  </span>
                </div>
                <div className="mt-4">
                  <Input
                    id="password_confirmation"
                    {...register("password_confirmation")}
                    placeholder="Confirm your password"
                    type="password"
                    aria-describedby="password_confirmation-error"
                  />
                  <span
                    id="password_confirmation-error"
                    className="text-red-400"
                  >
                    {errors.password_confirmation?.message}
                  </span>
                </div>
                <div className="mt-4">
                  <Button className="bg-brand w-full" disabled={loading}>
                    {loading ? "Processing ⚙︎" : "Continue"}
                  </Button>
                </div>
                <h1 className="text-center my-2 text-lg font-bold">
                  ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
                </h1>
              </form>
              <SocialBtns />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
