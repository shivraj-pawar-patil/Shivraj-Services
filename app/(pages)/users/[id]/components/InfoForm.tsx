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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


function InfoForm({ user, orgId }: UserFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date>(
    user?.date ? new Date(user?.date) : new Date()
  );
  const [deleveryDate, setDeleveryDate] = React.useState<Date | undefined>(
    user?.info?.delevery_date
      ? new Date(user?.info?.delevery_date!)
      : new Date()
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
      date: user?.info?.date ? new Date(user.info.date) : undefined,
      delevery_date: user?.info?.delevery_date
        ? new Date(user.info.delevery_date)
        : undefined,
      totalAmount: user?.info?.totalAmount ?? "0",
      advance: user?.info?.advance ?? "0",
      balance: user?.info?.balance ?? "0",
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
      <div suppressHydrationWarning className="min-h-screen bg-muted/20 pb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 md:p-8 max-w-7xl mx-auto space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Patient Prescription</h1>
                <p className="text-muted-foreground">
                  Manage patient details, prescription, and billing information.
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto items-center">
                {/* History Modal */}
                {user?.info?.history && (Array.isArray(user.info.history) && user.info.history.length > 0) && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" title="View History">
                        {(() => {
                          const count = (user.info.history?.length || 0) + 1;
                          const suffix = ["th", "st", "nd", "rd"];
                          const v = count % 100;
                          return `${count}${suffix[(v - 20) % 10] ||
                            suffix[v] ||
                            suffix[0]
                            } Visit`;
                        })()}
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Patient History</SheetTitle>
                        <SheetDescription>
                          Previous versions of patient information.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-4 space-y-4">
                        {[...user.info.history].reverse().map((record: any, idx: number) => (
                          <Card key={idx}>
                            <CardHeader className="p-4">
                              <CardTitle className="text-sm font-medium">
                                {record.updatedAt ? format(new Date(record.updatedAt), "PPP p") : "Unknown Date"}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 text-sm space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="font-semibold text-muted-foreground">Total:</span> ₹{record.totalAmount}
                                </div>
                                <div>
                                  <span className="font-semibold text-muted-foreground">Balance:</span> ₹{record.balance}
                                </div>
                                <div>
                                  <span className="font-semibold text-muted-foreground">Glass:</span> {record.glass_type}
                                </div>
                              </div>
                              <div className="mt-4 border-t pt-4">
                                <h4 className="font-semibold text-sm mb-2 text-center">Right Eye (OD)</h4>
                                <div className="grid grid-cols-5 gap-1 text-xs text-center font-medium text-muted-foreground mb-1">
                                  <span></span><span>SPH</span><span>CYL</span><span>AXIS</span><span>VIS</span>
                                </div>
                                <div className="grid grid-cols-5 gap-1 text-xs text-center items-center mb-1">
                                  <span className="text-muted-foreground font-medium">Dist</span>
                                  <div className="bg-muted/50 p-1 rounded">{record.rSPHu || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.rCYLu || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.rAXISu || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.rVISIONu || "-"}</div>
                                </div>
                                <div className="grid grid-cols-5 gap-1 text-xs text-center items-center">
                                  <span className="text-muted-foreground font-medium">Near</span>
                                  <div className="bg-muted/50 p-1 rounded">{record.rSPHb || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.rCYLb || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.rAXISb || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.rVISIONb || "-"}</div>
                                </div>

                                <h4 className="font-semibold text-sm mt-4 mb-2 text-center">Left Eye (OS)</h4>
                                <div className="grid grid-cols-5 gap-1 text-xs text-center font-medium text-muted-foreground mb-1">
                                  <span></span><span>SPH</span><span>CYL</span><span>AXIS</span><span>VIS</span>
                                </div>
                                <div className="grid grid-cols-5 gap-1 text-xs text-center items-center mb-1">
                                  <span className="text-muted-foreground font-medium">Dist</span>
                                  <div className="bg-muted/50 p-1 rounded">{record.lSPHu || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.lCYLu || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.lAXISu || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.lVISIONu || "-"}</div>
                                </div>
                                <div className="grid grid-cols-5 gap-1 text-xs text-center items-center">
                                  <span className="text-muted-foreground font-medium">Near</span>
                                  <div className="bg-muted/50 p-1 rounded">{record.lSPHb || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.lCYLb || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.lAXISb || "-"}</div>
                                  <div className="bg-muted/50 p-1 rounded">{record.lVISIONb || "-"}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
                <Link href={"/users"} className="w-full md:w-auto">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Personal Info & Financials */}
              <div className="space-y-6 md:col-span-1">
                {/* Personal Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly className="bg-muted" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="age"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} readOnly className="bg-muted" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Important Dates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <FormLabel>Registration Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(e) => {
                              if (e) {
                                form.setValue("date", e);
                                setDate(e);
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <FormLabel>Delivery Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !deleveryDate && "text-muted-foreground"
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
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={deleveryDate}
                            onSelect={(e) => {
                              if (e) {
                                form.setValue("delevery_date", e);
                                setDeleveryDate(e);
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                </Card>

                {/* Financials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Billing & Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="glass_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Glass Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                "Bifocal", "Kryptok", "Executive", "D Bifocal",
                                "Photogrey", "SP", "Resilens", "High Index",
                                "Ar.Coating", "Progressive", "Constant Use",
                                "Near Only", "For Distance Only", "Blue Cut Blue Coating",
                                "Blue Cut Hmc", "Hc kt", "Cr pg", "Pg glass",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="totalAmount"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total (₹)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Auto-calc balance
                                  const total = parseFloat(e.target.value) || 0;
                                  const adv = parseFloat(form.getValues('advance')?.toString() || '0');
                                  form.setValue('balance', (total - adv).toString());
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="advance"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Advance (₹)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Auto-calc balance
                                  const adv = parseFloat(e.target.value) || 0;
                                  const total = parseFloat(form.getValues('totalAmount')?.toString() || '0');
                                  form.setValue('balance', (total - adv).toString());
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="balance"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Balance (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} readOnly className="bg-muted font-bold" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Prescription */}
              <div className="md:col-span-2 space-y-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Eye Prescription</CardTitle>
                    <CardDescription>Enter the refraction details for both eyes.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Reusable Eye Section Function could be created, but keeping explicit for now */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <div className="h-6 w-1 bg-primary rounded-full" />
                        <h3 className="font-semibold text-lg">Right Eye (OD)</h3>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="font-medium text-sm text-muted-foreground">SPH</div>
                        <div className="font-medium text-sm text-muted-foreground">CYL</div>
                        <div className="font-medium text-sm text-muted-foreground">AXIS</div>
                        <div className="font-medium text-sm text-muted-foreground">VISION</div>
                      </div>
                      {/* Upper Row */}
                      <div className="grid grid-cols-4 gap-4">
                        <FormField name="rSPHu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                        <FormField name="rCYLu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                        <FormField name="rAXISu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                        <FormField name="rVISIONu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                      </div>
                      {/* Lower Row */}
                      <div className="grid grid-cols-4 gap-4">
                        <FormField name="rSPHb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                        <FormField name="rCYLb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                        <FormField name="rAXISb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                        <FormField name="rVISIONb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <div className="h-6 w-1 bg-primary rounded-full" />
                        <h3 className="font-semibold text-lg">Left Eye (OS)</h3>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="font-medium text-sm text-muted-foreground">SPH</div>
                        <div className="font-medium text-sm text-muted-foreground">CYL</div>
                        <div className="font-medium text-sm text-muted-foreground">AXIS</div>
                        <div className="font-medium text-sm text-muted-foreground">VISION</div>
                      </div>
                      {/* Upper Row */}
                      <div className="grid grid-cols-4 gap-4">
                        <FormField name="lSPHu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                        <FormField name="lCYLu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                        <FormField name="lAXISu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                        <FormField name="lVISIONu" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Dist." className="text-center" /></FormControl></FormItem>} />
                      </div>
                      {/* Lower Row */}
                      <div className="grid grid-cols-4 gap-4">
                        <FormField name="lSPHb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                        <FormField name="lCYLb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                        <FormField name="lAXISb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                        <FormField name="lVISIONb" control={form.control} render={({ field }) => <FormItem><FormControl><Input {...field} placeholder="Near" className="text-center" /></FormControl></FormItem>} />
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Hidden button to prevent enter key form submission issues if any, actual submit is in header */}
            <button type="submit" hidden></button>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}

export default InfoForm;
