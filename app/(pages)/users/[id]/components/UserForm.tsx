"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { TUserSchema, userSchema } from "@/lib/type";
import { createUser, updateUser } from "@/server/user";
import { useToast } from "@/components/ui/use-toast";

interface Users extends User {
 info: any
}
export interface UserFormProps {
  user: Users | null;
  orgId: string;
}

export const UserForm = ({ user, orgId }: UserFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      gender: user?.gender,
      location: user?.city,
      phone_no: user?.phoneNumber,
      type: user?.type,
    } || {
      name: "",
      gender: "",
      location: "",
      phone_no: "",
      type: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: TUserSchema) => {
    try {
      if (user) {
        await updateUser(data, user.id);
        toast({
          description: "user was updated successfully !",
        });
        router.push("/users");
        revalidatePath("/users");
      } else {
        await createUser(data, orgId);
        toast({
          description: "User was created successfully !",
        });
        router.push("/users");
        revalidatePath("/users");
      }
    } catch (e) {
      toast({
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
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

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type Of Patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Dacryocystitis",
                          "Cataract",
                          "Pterygium",
                          "Spectacles",
                          "Follow-up",
                        ].map((_) => (
                          <SelectItem key={_} value={_}>{_}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center">
                <Button disabled={isLoading}>
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
