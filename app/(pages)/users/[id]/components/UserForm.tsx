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
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { TUserSchema, userSchema } from "@/lib/type";
import { createUser, updateUser, searchUsers } from "@/server/user";
import { useToast } from "@/components/ui/use-toast";

import { User as UserIcon, Phone, MapPin, Stethoscope, Tent, Users as UsersIcon } from "lucide-react";

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
        serialno: user.serialno ?? undefined,
        from_camp: user.from_camp ?? false,
      }
      : {
        name: "",
        gender: "",
        location: "",
        phone_no: "",
        type: "",
        serialno: undefined,
        from_camp: false,
      },
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    <Suspense fallback="<div>Loading...</div>">
      <div className="min-h-screen bg-muted/20 flex flex-col items-center " suppressHydrationWarning>
        <div className="w-full max-w-3xl space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight">{user ? "Edit Patient" : "Register New Patient"}</h2>
            <p className="text-muted-foreground">
              {user
                ? "Update the patient's personal information."
                : "Fill in the details below to create a new patient record."}
            </p>
          </div>
          <div className="bg-background rounded-lg border shadow-sm p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            disabled={isLoading}
                            placeholder="e.g. Anand Kumar"
                            className="pl-9"
                            autoComplete="off"
                            {...field}
                            onChange={async (e) => {
                              field.onChange(e);
                              const value = e.target.value;
                              if (value.length > 2 && !user) {
                                const results = await searchUsers(value, orgId);
                                setSuggestions(results);
                                setShowSuggestions(true);
                              } else {
                                setSuggestions([]);
                                setShowSuggestions(false);
                              }
                            }}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          />
                        </div>
                      </FormControl>
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground rounded-md border shadow-md overflow-hidden">
                          <div className="p-2 bg-muted/50 border-b">
                            <p className="text-xs font-semibold text-muted-foreground">
                              Similar Patients Found ({suggestions.length})
                            </p>
                          </div>
                          <div className="max-h-[200px] overflow-y-auto p-1">
                            {suggestions.map((suggestion) => (
                              <div
                                key={suggestion.id}
                                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  router.push(`/users/${suggestion.intId}/info`);
                                }}
                              >
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <UserIcon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex flex-col flex-1 overflow-hidden">
                                  <span className="font-medium truncate">{suggestion.name}</span>
                                  <span className="text-xs text-muted-foreground truncate">
                                    {suggestion.city} • {suggestion.phoneNumber}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <FormField
                    name="phone_no"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="tel"
                              maxLength={10}
                              disabled={isLoading}
                              placeholder="9876543210"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <FormField
                    name="location"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              disabled={isLoading}
                              placeholder="e.g. Mumbai"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Patient Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dacryocystitis">Dacryocystitis</SelectItem>
                            <SelectItem value="Cataract">Cataract</SelectItem>
                            <SelectItem value="Pterygium">Pterygium</SelectItem>
                            <SelectItem value="Spectacles">Spectacles</SelectItem>
                            <SelectItem value="Follow-up">Follow-up</SelectItem>
                            <SelectItem value="OPD">OPD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* From Camp */}
                <FormField
                  control={form.control}
                  name="from_camp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Registered via Medical Camp?
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Check this if the patient was acquired through an outreach camp.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex gap-4 pt-2">
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Saving..." : (user ? "Update Patient Record" : "Create Patient Record")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    className="w-full"
                    onClick={() => router.push("/users")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
