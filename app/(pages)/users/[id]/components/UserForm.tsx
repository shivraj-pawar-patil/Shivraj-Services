"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { TUserSchema, userSchema } from "@/lib/type";
import { createUser, updateUser } from "@/server/user";
import { useToast } from "@/components/ui/use-toast";

interface Users extends User {
  info: any;
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
    defaultValues: user
      ? {
          name: user.name ?? "",
          gender: user.gender ?? "",
          location: user.city ?? "",
          phone_no: user.phoneNumber ?? "",
          type: user.type ?? "",
          from_camp: user.from_camp ?? false,
        }
      : {
          name: "",
          gender: "",
          location: "",
          phone_no: "",
          type: "",
          from_camp: undefined,
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
      } else {
        await createUser(data, orgId);
        toast({
          description: "User was created successfully !",
        });
        router.push("/users");
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
        className="min-h-screen bg-background p-4 md:p-8 lg:p-16"
        suppressHydrationWarning
      >
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 md:space-y-8 pb-10"
            >
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  {user ? "Edit User" : "Create New User"}
                </h3>
                <p className="text-muted-foreground">
                  {user ? "Update user information" : "Enter user details to create a new user"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Enter your name"
                          className="w-full"
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
                      <FormLabel className="text-foreground font-medium">Gender</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Enter your gender"
                          className="w-full"
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
                      <FormLabel className="text-foreground font-medium">Location</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="City, Country"
                          className="w-full"
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
                      <FormLabel className="text-foreground font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          disabled={isLoading}
                          placeholder="Enter phone number"
                          className="w-full"
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
                      <FormLabel className="text-foreground font-medium">Patient Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                            <SelectItem key={_} value={_}>
                              {_}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="from_camp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">From Camp</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage /> 
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? "Processing..." : (user ? "Update User" : "Create User")}
                  </Button>
                </div>
            </div>
          </form>
        </Form>
        </div>
      </div>
    </Suspense>
  );
};
