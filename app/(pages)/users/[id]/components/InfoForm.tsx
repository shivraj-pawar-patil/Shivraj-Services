"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function InfoForm({ user, orgId }: UserFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date>(
    new Date(user?.date!) ?? new Date()
  );
  const [deleveryDate, setDeleveryDate] = React.useState<Date | undefined>(
    new Date(user?.info?.delevery_date) ?? undefined
  );

  React.useEffect(() => {
    form.setValue("delevery_date", deleveryDate);
    form.setValue("date", date);
  }, [deleveryDate, date]);

  const form = useForm<TUserInfoSchema>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user?.name ?? "",
      location: user?.city ?? "",
      age: user?.info?.age ?? "",
      date: user?.info?.date ?? "",
      delevery_date: user?.info?.delevery_date ?? "",
      totalAmount: user?.info?.totalAmount ?? 0,
      advance: user?.info?.advance ?? 0,
      balance: user?.info?.balance ?? 0,
      glass_type: user?.info?.glass_type ?? "",
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
    try {
      if (user) {
        await updateUserInfo(data, user.id);
        router.push("/users");
        toast({
          description: "User info was updated!",
        });
      }
    } catch (e) {
      toast({
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
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
                  <FormItem className="col-span-2 md:col-span-1 mb-4">
                    <FormLabel>Name :</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="w-80" />
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
                        "w-80 justify-start text-left font-normal !ml-0 ",
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
                      onSelect={(e) => {
                        form.setValue("date", e);
                        setDate(e as Date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 mb-4 !ml-0 !mt-2">
                    <FormLabel>Location :</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="age"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 mb-4 !ml-0 !mt-2">
                    <FormLabel>Age :</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-start justify-center !ml-0 ">
                <FormLabel className="mb-2">Delevery Date :</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-80 justify-start text-left font-normal !ml-0 ",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deleveryDate ? (
                        format(deleveryDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(e) => {
                        form.setValue("delevery_date", e);
                        setDeleveryDate(e as Date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <FormField
                name="totalAmount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 mb-4 !ml-0 !mt-2">
                    <FormLabel>Total Amount :</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="glass_type"
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 mb-4 !ml-0 !mt-2">
                    <FormLabel>Glass Type :</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-80">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type Of Patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Bifocal",
                          "Kryptok",
                          "Executive",
                          "D Bifocal",
                          "Photogrey",
                          "SP",
                          "Resilens",
                          "High Index",
                          "Ar.Coating",
                          "Progressive",
                          "Constant Use",
                          "Near Only",
                          "For Distnace Only",
                          "Blue Cut Blue Coating",
                          "Blue Cut Hmc",
                          "Hc kt",
                          "Cr pg",
                          "Pg glass",
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
                name="advance"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 mb-4 !ml-0 !mt-2">
                    <FormLabel>Advance :</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
              <FormField
                name="balance"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 mb-4 !ml-0 !mt-2">
                    <FormLabel>Balance :</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="w-80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <Card className="w-full md:w-[600px] lg:w-[600px] bg-slate-800">
                {/* <!-- ... Your existing Card content ... --> */}
                <CardHeader>
                  <CardTitle>Right Eye</CardTitle>
                  <CardDescription>
                    Enter the details of right eye
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid text-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <FormLabel>SPH</FormLabel>
                      <FormField
                        name="rSPHu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>CYL</FormLabel>
                      <FormField
                        name="rCYLu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>AXIS</FormLabel>
                      <FormField
                        name="rAXISu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>VISION</FormLabel>
                      <FormField
                        name="rVISIONu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
              <Card className="w-full md:w-[600px] lg:w-[600px] bg-slate-800">
                <CardHeader>
                  <CardTitle>Left Eye</CardTitle>
                  <CardDescription>
                    Enter the details of left eye
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <FormLabel>SPH</FormLabel>
                      <FormField
                        name="lSPHu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>CYL</FormLabel>
                      <FormField
                        name="lCYLu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>AXIS</FormLabel>
                      <FormField
                        name="lAXISu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel>VISION</FormLabel>
                      <FormField
                        name="lVISIONu"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                          <FormItem className="col-span-2 md:col-span-1 mb-4">
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
                    date: new Date(
                      form.getValues("date") ?? user?.date ?? new Date()
                    ),
                    delevery_date: new Date(
                      form.getValues("delevery_date") ??
                        user?.info?.delevery_date ??
                        undefined
                    ),
                    totalAmount: form.getValues("totalAmount"),
                    balance: form.getValues("balance"),
                    advance: form.getValues("advance"),
                    glass_type: form.getValues("glass_type"),
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
