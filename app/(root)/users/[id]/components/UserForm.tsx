"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { TUserSchema, userSchema } from "@/lib/type";
import { createUser, updateUser } from "@/actions/user";
import { useToast } from "@/components/ui/use-toast";

interface UserFormProps {
  user: User | null;
}

export const UserForm = ({ user }: UserFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      gender: user?.gender,
      location: user?.city,
      phone_no: user?.phoneNumber
    } || {
      name: "",
      gender: "",
      location: "",
      phone_no: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: TUserSchema) => {
    try {
      console.log("[DATA-FORM]", data);
      if (user) {
        console.log(user);
        await updateUser(data,user.id)
        toast({
          description: 'user was updated successfully !'
        })
        router.push("/users");
        revalidatePath('/users')
      } else {
        await createUser(data);
        toast({
          description: "User was created successfully !",
        });
        router.push("/users");
        revalidatePath('/users')
      }
    } catch (e) {
        toast({
          description: 'Something went wrong. Please try again later',
          variant: 'destructive',
        })
      console.log("Error while creating user ", e);
    }
  };

  return (
    <Suspense fallback="<div>Loading</div>">
      <div
        className="h-full p-4 space-y-2 max-w-3xl mx-auto"
        suppressHydrationWarning
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <div className="space-y-2 w-full col-span-2">
              <div>
                <h3 className="text-lg font-medium">User</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter your gender"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="City, Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="phone_no"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone NO:</FormLabel>
                    <FormControl>
                      <Input
                       type="number"
                        disabled={isLoading}
                        placeholder="Phone NO:"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-center">
                <Button disabled={isLoading}>
                  <Plus className="h-5 w-5 mr-3" />
                  {user ? "Edit" : "Create"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
};
