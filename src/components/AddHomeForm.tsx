"use client";
import { useSupabase } from "@/hooks/useSupabase";
import { generateRandomNum } from "@/lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ENV from "../../config/ENV";
import { AddHomeType, homeSchema } from "../../validations/homeSchema";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "../../config/categories";
import { Textarea } from "@/components/ui/textarea";

const mappableCategories = categories.map((x, i) => {
  return {
    id: x.name.toLowerCase(),
    label: x.name,
  };
});

function AddHomeForm() {
  const router = useRouter();
  const { getSession, supabase } = useSupabase();
  const [image, setImage] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: session, isPending: isSessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const form = useForm<AddHomeType>({
    resolver: yupResolver(homeSchema),
    defaultValues: {
      categories: ["lake", "camp"],
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5000000) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      if (!file.type.includes("image")) {
        toast.error("Only images are allowed");
        return;
      }
      setImage((prev) => {
        return [...prev, file];
      });
    }
  };

  const { mutate: createHome, isPending: isHomeCreating } = useMutation({
    onMutate: () => {
      const toastId = toast.loading("Adding your home...");
      return { toastId };
    },
    mutationFn: async (payload: AddHomeType) => {
      if (isSessionLoading)
        throw new Error("Please wait until we get your session!");
      if (!session) throw new Error("Please login to add a home!");

      const paths: string[] = [];

      if (image?.length) {
        await Promise.all(
          image.map(async (file) => {
            const uniqueName = Date.now() + "_" + generateRandomNum();

            const { data, error } = await supabase.storage
              .from(ENV.UE_BUCKET)
              .upload(uniqueName, file);
            if (error) {
              throw error;
            }
            paths.push(data.path);
          })
        );
      }
      const { error: homeErr } = await supabase.from("homes").insert({
        user_id: session.user.id,
        title: payload.title,
        country: payload.country,
        state: payload.state,
        city: payload.city,
        price: payload.price,
        description: description,
        categories: payload.categories,
        image: paths,
      });

      if (homeErr) throw new Error(homeErr.message);
    },
    onSuccess: (_, __, ctx) => {
      toast.success("Home added successfully", {
        toastId: ctx.toastId,
      });
      router.push("/dashboard?success=Home added successfully");
    },
    onError: (error, _, ctx) => {
      toast.error(error.message, { toastId: ctx?.toastId });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) =>
          form.handleSubmit((data) => createHome(data))(...args)
        }
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your title here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your country here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your state here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your city here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your price here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" mb-2">
            <FormLabel>Image</FormLabel>
            <Input
              id="image"
              className="mt-2"
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="mt-2">
          <Label htmlFor="Description">Description</Label>
          <Textarea
            className="w-full mt-2"
            onChange={(e) => setDescription(e.target!.value)}
            value={description}
          />
        </div>

        <div className="mt-3">
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mappableCategories.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="bg-brand w-full mt-5 mb-5"
          disabled={isHomeCreating}
        >
          {isHomeCreating ? "Processing... ⚙︎" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default AddHomeForm;
