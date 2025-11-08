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
import { deleteUser } from "@/server/user";
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

// ⬇️ NEW imports for calendar
import { Calendar } from "@/components/ui/calendar";
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
  name: string;
  gender: "female" | "male";
  city: string;
  from_camp: boolean;
  phoneNumber: string;
  info: any;
  date: Date | string;
  type?: string;
};

export default function DataTableDemo({ users }: { users: User[] }) {
  const { organization } = useOrganization();

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
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("intId")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: ({ row }) => <div>{row.getValue("city")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div>Phone Number</div>,
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "from_camp",
      header: () => <div>From Camp</div>,
      cell: ({ row }) => (
        <div>{row.getValue("from_camp") ? "Yes" : "No"}</div>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          <Link href={`/users/${row.getValue("intId")}/info`}>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <FaInfo className="h-3 w-3" />
            </Button>
          </Link>
          <Link href={`/qrcode/${row.getValue("intId")}`}>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <FaQrcode className="h-3 w-3" />
            </Button>
          </Link>
          <Link
            target="_blank"
            href={
              `https://wa.me/91${row.original.phoneNumber}?text=` +
              `Thank you ${row?.original?.name} for visiting the ${organization?.name}!` +
              "%0a" +
              "ID: " +
              row?.original?.intId +
              "%0a" +
              "Delivery Date: " +
              moment(row.original?.info?.delevery_date).format("DD-MM-YYYY") +
              "%0a" +
              "Glass Type: " +
              row.original?.info?.glass_type +
              "%0a------------------%0a" +
              "Right Eye:" +
              "%0aSPH: " +
              row.original?.info?.rSPHu +
              " / " +
              row.original?.info?.rSPHb +
              "%0aCYL: " +
              row.original?.info?.rCYLu +
              " / " +
              row.original?.info?.rCYLb +
              "%0aAXIS: " +
              row.original?.info?.rAXISu +
              " / " +
              row.original?.info?.rAXISb +
              "%0aVISION: " +
              row.original?.info?.rVISIONu +
              " / " +
              row.original?.info?.rVISIONb +
              "%0a------------------%0a" +
              "Left Eye:" +
              "%0aSPH: " +
              row.original?.info?.lSPHu +
              " / " +
              row.original?.info?.lSPHb +
              "%0aCYL: " +
              row.original?.info?.lCYLu +
              " / " +
              row.original?.info?.lCYLb +
              "%0aAXIS: " +
              row.original?.info?.lAXISu +
              " / " +
              row.original?.info?.lAXISb +
              "%0aVISION: " +
              row.original?.info?.lVISIONu +
              " / " +
              row.original?.info?.lVISIONb +
              "%0a------------------%0a" +
              "Advance: ₹" +
              row.original?.info?.advance +
              "%0aBalance: ₹" +
              row.original?.info?.balance +
              "%0a------------------%0a" +
              "Please visit again after six month!"
            }
          >
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <FaWhatsapp className="h-3 w-3" />
            </Button>
          </Link>
          <Link href={`/users/${row.getValue("intId")}`}>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <FaUserEdit className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      ),
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
    let data = [...users].sort((a, b) => b.intId - a.intId);

    if (selectedDate) {
      data = data.filter((user) =>
        moment(user.date).isSame(moment(selectedDate), "day")
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
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/users/create-user">
              <Button size="sm" className="w-full sm:w-auto">
                Create User
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
                  ].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

            {table.getFilteredSelectedRowModel().rows.length > 0 && (
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
            )}
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
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
