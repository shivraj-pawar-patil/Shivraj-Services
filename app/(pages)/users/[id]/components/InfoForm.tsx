"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { revalidatePath } from "next/cache";
import { Suspense } from "react";

import { TUserInfoSchema, userInfoSchema } from "@/lib/type";
import { updateUserInfo } from "@/server/user";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserFormProps } from "./UserForm";
import Link from "next/link";

function InfoForm({ user, orgId }: UserFormProps) {
  console.log("user--------->", user);
  const router = useRouter();
  const [date, setDate] = React.useState<Date>(new Date());
  const form = useForm<TUserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user?.name ?? "",
      location: user?.city ?? "",
      age: user?.info?.age ?? "",
      date: user?.info?.date ?? "",
      rSPHu: user?.info?.rSPHu ?? "",
      rCYLu: user?.info?.rCYLu ?? "",
      rAXISu: user?.info?.rAXISu ?? "",
      rVISIONu: user?.info?.rVISIONu ?? "",
      rSPHb: user?.info?.rSPHb ?? "",
      rCYLb: user?.info?.rCYLb ?? "",
      rAXISb: user?.info?.rAXISb ?? "",
      rVISIONb: user?.info?.rVISIONb ?? "",
      lSPHu: user?.info?.lSPHu ?? "",
      lCYLu: user?.info?.lCYLu ?? "",
      lAXISu: user?.info?.lAXISu ?? "",
      lVISIONu: user?.info?.lVISIONu ?? "",
      lSPHb: user?.info?.lSPHb ?? "",
      lCYLb: user?.info?.lCYLb ?? "",
      lAXISb: user?.info?.lAXISb ?? "",
      lVISIONb: user?.info?.lVISIONb ?? "",
    },
  });

  const onSubmit = async (data: TUserInfoSchema) => {
    console.log("data-------->", data);

    try {
      if (user) {
        console.log(user);
        await updateUserInfo(data, user.id);
        router.push("/users");
        revalidatePath("/users");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Suspense fallback="<div>Loading</div>">
      <div suppressHydrationWarning>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="m-16">
            <div className="my-5 grid grid-cols-2 space-x-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1">
                    <FormLabel>Name :</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="w-[600px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-start justify-end !ml-0 ">
                <FormLabel className="mb-2">Date :</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal !ml-0 ",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      // onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 !ml-0 !mt-2">
                    <FormLabel>Location :</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="w-[600px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="age"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 !ml-0 !mt-2">
                    <FormLabel>Age :</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-[282px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 ">
              <Card className="w-[600px] bg-slate-800">
                <CardHeader>
                  <CardTitle>Right Eye</CardTitle>
                  <CardDescription>
                    Enter the details of right eye
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex ">
                    <div className="grid w-full grid-cols-4 gap-4 ">
                      <FormLabel className="text-center">SPH</FormLabel>
                      <FormLabel className="text-center">CYL</FormLabel>
                      <FormLabel className="text-center">AXIS</FormLabel>
                      <FormLabel className="text-center">VISION</FormLabel>
                      <FormField
                        name="rSPHu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="rCYLu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1  ">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="rAXISu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="rVISIONu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="rSPHb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="rCYLb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="rAXISb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="rVISIONb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-[600px] bg-slate-800">
                <CardHeader>
                  <CardTitle>Left Eye</CardTitle>
                  <CardDescription>
                    Enter the details of left eye
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex ">
                    <div className="grid w-full grid-cols-4 gap-4 ">
                      <FormLabel className="text-center">SPH</FormLabel>
                      <FormLabel className="text-center">CYL</FormLabel>
                      <FormLabel className="text-center">AXIS</FormLabel>
                      <FormLabel className="text-center">VISION</FormLabel>
                      <FormField
                        name="lSPHu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lCYLu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lAXISu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lVISIONu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="lSPHb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lCYLb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lAXISb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="lVISIONb"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex mt-10 space-x-4 justify-center">
              <Link href={"/users"}>
                {" "}
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button
                onClick={() => {
                  onSubmit({
                    name: form.getValues("name"),
                    age: form.getValues("age"),
                    location: form.getValues("location"),
                    rSPHu: form.getValues("rSPHu"),
                    rCYLu: form.getValues("rCYLu"),
                    rAXISu: form.getValues("rAXISu"),
                    rVISIONu: form.getValues("rVISIONu"),
                    rSPHb: form.getValues("rSPHb"),
                    rCYLb: form.getValues("rCYLb"),
                    rAXISb: form.getValues("rAXISb"),
                    rVISIONb: form.getValues("rVISIONb"),
                    lSPHu: form.getValues("lSPHu"),
                    lCYLu: form.getValues("lCYLu"),
                    lAXISu: form.getValues("lAXISu"),
                    lVISIONu: form.getValues("lVISIONu"),
                    lSPHb: form.getValues("lSPHb"),
                    lCYLb: form.getValues("lCYLb"),
                    lAXISb: form.getValues("lAXISb"),
                    lVISIONb: form.getValues("lVISIONb"),
                  });
                }}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}

export default InfoForm;