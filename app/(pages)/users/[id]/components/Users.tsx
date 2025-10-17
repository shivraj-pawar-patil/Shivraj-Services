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
import { deleteUser } from "@/server/user"; // Assumed path
import { useToast } from "@/components/ui/use-toast"; // Assumed path
import moment from "moment";
import { useOrganization } from "@clerk/nextjs";
import { FaQrcode, FaWhatsapp, FaInfo, FaUserEdit } from "react-icons/fa";

// Utility function to check if a date is today
const isToday = (date: Date | string) => {
  const checkDate = moment(date);
  return checkDate.isSame(moment(), 'day');
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
  // NOTE: Added createdAt field for "Today's Users" filter
  date: Date | string; 
};

export default function DataTableDemo({ users }: { users: User[] }) {
  const { organization } = useOrganization();
  
  // State for manual filters
  const [showTodayUsers, setShowTodayUsers] = React.useState(false);
  
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("intId")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("city")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div>Phone Number</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "from_camp",
      header: () => <div>From Camp</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("from_camp") ? "Yes" : "No"}</div>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          <Link href={`/users/${row.getValue("id")}/info`}>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
             <FaInfo className="h-3 w-3" />
            </Button>
          </Link>
          <Link href={`/qrcode/${row.getValue("id")}`}>
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
          <Link href={`/users/${row.getValue("id")}`}>
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
  
  // 1. Prepare data for "Today's Users" filter
  const filteredUsers = React.useMemo(() => {
    if (!showTodayUsers) {
      return users;
    }
    return users.filter(user => isToday(user.date));
  }, [users, showTodayUsers]);


  const table = useReactTable({
    // Use the potentially filtered data
    data: filteredUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Important: Use a custom filterFn for boolean columns like 'from_camp'
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // Optional: Add custom filter function for 'from_camp' to handle boolean
    // By default, TanStack Table stringifies the boolean, so we ensure proper boolean filtering.
    // If you don't add this, filtering for true/false might not work as expected.
    filterFns: {
      booleanFilter: (row, columnId, value) => {
        return row.getValue(columnId) === value;
      },
    },
    // Apply the custom filter function to the 'from_camp' column definition if needed
    // For simple boolean true/false checks, getFilteredRowModel() often works well enough
    // when setting the filter value to a boolean, but this is a safer approach.
  });

  // Ensure the 'from_camp' column uses the boolean filter if it's defined
  React.useEffect(() => {
    const fromCampColumn = table.getColumn("from_camp");
    if (fromCampColumn) {
        fromCampColumn.columnDef.filterFn = 'booleanFilter' as any;
    }
  }, [table]);


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
          
          {/* Main Filters: Search, Today's Users, From Camp */}
          <div className="flex flex-wrap gap-2 flex-1">
            <Input
              placeholder="Filter by name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full max-w-sm sm:max-w-xs"
            />
            
            {/* "Today's Users" Filter Button */}
            <Button
              variant={showTodayUsers ? "default" : "outline"}
              onClick={() => setShowTodayUsers(prev => !prev)}
              className="w-full sm:w-auto"
            >
              Today&apos;s Users
            </Button>

            {/* "From Camp" Filter Button */}
            <Button
              variant={
                table.getColumn("from_camp")?.getFilterValue() === true
                  ? "default"
                  : "outline"
              }
              onClick={() => {
                const currentFilter = table.getColumn("from_camp")?.getFilterValue();
                // Toggle logic: true -> undefined (off)
                if (currentFilter === true) {
                  table.getColumn("from_camp")?.setFilterValue(undefined);
                } else {
                  // Set filter to true, so it only shows rows where from_camp is true
                  table.getColumn("from_camp")?.setFilterValue(true);
                }
              }}
              className="w-full sm:w-auto"
            >
              From Camp Only
            </Button>
          </div>

          {/* Column Visibility and Delete */}
          <div className="flex gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">Columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
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
                    );
                  })}
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
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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