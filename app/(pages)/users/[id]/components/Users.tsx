"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
// import { deleteUser } from "@/server/user";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import { useOrganization } from "@clerk/nextjs";
import { FaQrcode, FaWhatsapp, FaInfo, FaUserEdit } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateWhatsappMessage } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

// ⬇️ NEW imports for calendar
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Utility function to check if a date is today
const isToday = (date: Date | string) => {
  const checkDate = moment(date);
  return checkDate.isSame(moment(), "day");
};

export type User = {
  id: string;
  intId: number;
  serialno?: number;
  name: string;
  gender: "female" | "male";
  city: string;
  from_camp: boolean;
  phoneNumber: string;
  info: any;
  date: Date | string;
  type?: string;
  updatedAt?: Date | string;
};

export default function DataTableDemo({ users }: { users: User[] }) {

  // State for filters
  const [type, setType] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "intId",
      header: "intId",
      cell: ({ row }) => <div>{row.getValue("intId")}</div>,
    },
    {
      accessorKey: "serialno",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("serialno")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <span className="ml-2">↑</span>
            ) : column.getIsSorted() === "desc" ? (
              <span className="ml-2">↓</span>
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link
          href={`/users/${row.original.intId}/info`}
          className="font-medium hover:underline text-primary"
        >
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <Badge variant={type === "Follow-up" ? "secondary" : "default"}>
            {type}
          </Badge>
        );
      },
    },
    {
      id: "visit",
      header: "Visit",
      cell: ({ row }) => {
        const info = row.original.info as any;
        const history = info?.history || [];
        const count = history.length + 1;
        const suffix = ["th", "st", "nd", "rd"];
        const v = count % 100;
        const label = `${count
          }${suffix[(v - 20) % 10] || suffix[v] || suffix[0]} Visit`;

        if (count === 1) {
          return <Badge variant="outline">{label}</Badge>;
        }

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Badge
                variant="outline"
                role="button"
                tabIndex={0}
                className="cursor-pointer hover:bg-muted active:scale-95 transition-transform"
              >
                {label} (View History)
              </Badge>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Visit History</h4>
                <div className="grid gap-4 max-h-[300px] overflow-y-auto">
                  {history
                    .slice()
                    .reverse()
                    .map((record: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col gap-1 border-b pb-2 last:border-0"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {record.updatedAt
                              ? moment(record.updatedAt).format("DD MMM YYYY")
                              : "Unknown Date"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Visit {history.length - index}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
                          <span>Glass: {record.glass_type || "-"}</span>
                          <span>
                            Total: ₹{record.totalAmount || "0"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string;
        return (
          <Badge
            variant="outline"
            className={
              gender === "male"
                ? "border-blue-200 text-blue-700 bg-blue-50"
                : "border-pink-200 text-pink-700 bg-pink-50"
            }
          >
            {gender}
          </Badge>
        );
      },
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("city")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div>Phone Number</div>,
      cell: ({ row }) => (
        <a
          href={`tel:${row.getValue("phoneNumber")}`}
          className="hover:underline text-muted-foreground"
        >
          {row.getValue("phoneNumber")}
        </a>
      ),
    },
    {
      accessorKey: "from_camp",
      header: () => <div>From Camp</div>,
      cell: ({ row }) => (
        <Badge variant={row.getValue("from_camp") ? "default" : "secondary"}>
          {row.getValue("from_camp") ? "Camp" : "Direct"}
        </Badge>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Updated At
            {column.getIsSorted() === "asc" ? (
              <span className="ml-2">↑</span>
            ) : column.getIsSorted() === "desc" ? (
              <span className="ml-2">↓</span>
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("updatedAt");
        return (
          <div className="text-muted-foreground text-sm">
            {date ? moment(date).format("DD MMM YYYY, h:mm a") : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { organization } = useOrganization();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`/users/${row.getValue("intId")}/info`}>
                <DropdownMenuItem>
                  <FaInfo className="mr-2 h-4 w-4" /> View Info
                </DropdownMenuItem>
              </Link>
              <Link href={`/qrcode/${row.getValue("intId")}`}>
                <DropdownMenuItem>
                  <FaQrcode className="mr-2 h-4 w-4" /> QR Code
                </DropdownMenuItem>
              </Link>
              <Link
                target="_blank"
                href={generateWhatsappMessage(row.original, organization?.name || "")}
              >
                <DropdownMenuItem>
                  <FaWhatsapp className="mr-2 h-4 w-4" /> WhatsApp
                </DropdownMenuItem>
              </Link>
              <Link href={`/users/${row.getValue("intId")}/opd`}>
                <DropdownMenuItem>
                  <FaWhatsapp className="mr-2 h-4 w-4" /> OPD
                </DropdownMenuItem>
              </Link>
              <Link href={`/users/${row.getValue("intId")}`}>
                <DropdownMenuItem>
                  <FaUserEdit className="mr-2 h-4 w-4" /> Edit User
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { toast } = useToast();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // ✅ Filter by calendar date only
  const filteredUsers = React.useMemo(() => {
    let data = [...users].sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      if (dateB !== dateA) {
        return dateB - dateA;
      }
      return b.intId - a.intId;
    });

    if (selectedDate) {
      data = data.filter(
        (user) =>
          moment(user.date).isSame(moment(selectedDate), "day") ||
          (user.updatedAt &&
            moment(user.updatedAt).isSame(moment(selectedDate), "day"))
      );
    }

    return data;
  }, [users, selectedDate]);

  const table = useReactTable({
    data: filteredUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-4 md:p-6 min-h-screen bg-background">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Patients</h1>
            <Badge variant="secondary" className="text-sm">
              {table.getFilteredRowModel().rows.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/users/create-user">
              <Button size="sm" className="w-full sm:w-auto">
                Create Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <div className="flex flex-wrap gap-2 flex-1">
            {/* Search Filter */}
            <Input
              placeholder="Filter by name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full max-w-sm sm:max-w-xs"
            />

            {/* From Camp Filter */}
            <Button
              variant={
                table.getColumn("from_camp")?.getFilterValue() === true
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                const currentFilter =
                  table.getColumn("from_camp")?.getFilterValue();
                if (currentFilter === true) {
                  table.getColumn("from_camp")?.setFilterValue(undefined);
                } else {
                  table.getColumn("from_camp")?.setFilterValue(true);
                }
              }}
              className="w-full sm:w-auto"
            >
              From Camp Only
            </Button>

            {/* ✅ Calendar Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={selectedDate ? "default" : "outline"}
                  className="w-full sm:w-auto"
                >
                  {selectedDate
                    ? moment(selectedDate).format("DD MMM YYYY")
                    : "Filter by Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  initialFocus
                  modifiers={{
                    today: new Date(),
                  }}
                  modifiersClassNames={{
                    today:
                      "bg-blue-500 text-white rounded-md hover:bg-blue-600",
                  }}
                />
              </PopoverContent>
            </Popover>

            {selectedDate && (
              <Button
                variant="outline"
                onClick={() => setSelectedDate(undefined)}
                className="w-full sm:w-auto"
              >
                Clear Date
              </Button>
            )}

            {/* Type Filter */}
            <div>
              <Select
                onValueChange={(value) => {
                  table
                    .getColumn("type")
                    ?.setFilterValue(
                      value !== "Select Type Of Patient" ? value : undefined
                    );
                  setType(value);
                }}
                value={type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type Of Patient" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Select Type Of Patient",
                    "Dacryocystitis",
                    "Cataract",
                    "Pterygium",
                    "Spectacles",
                    "Follow-up",
                    "OPD",
                  ].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Filters */}
            {(type || selectedDate || table.getState().columnFilters.length > 0) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setType("");
                  setSelectedDate(undefined);
                  table.resetColumnFilters();
                }}
                className="px-2 lg:px-3"
              >
                Reset
                <span className="sr-only">Reset Filters</span>
              </Button>
            )}
          </div>

          {/* Column Visibility & Delete */}
          <div className="flex gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.id === "intid")
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  await deleteUser(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((_) => _.original.id)
                  );
                  toast({
                    description: "User was deleted successfully!",
                    variant: "destructive",
                  });
                }}
                className="w-full sm:w-auto"
              >
                Delete
              </Button>
            )} */}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                      <div className="mb-2 rounded-full bg-muted p-4">
                        <MoreHorizontal className="h-6 w-6 opacity-20" />
                      </div>
                      <p className="text-lg font-medium">No results found.</p>
                      <p className="text-sm">
                        Try adjusting your filters or search query.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </span>
            ) : (
              <span>
                Showing{" "}
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}{" "}
                to{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{" "}
                of {table.getFilteredRowModel().rows.length} results
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="w-full sm:w-auto"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="w-full sm:w-auto"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
