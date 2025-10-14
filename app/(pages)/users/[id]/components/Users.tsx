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


export type User = {
  id: string;
  intId: number;
  name: string;
  gender: "female" | "male";
  city: string;
  phoneNumber: string;
  info: any;
};
export default function DataTableDemo({ users }: { users: User[] }) {
  const { organization } = useOrganization();
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
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <div>
          {" "}
          <Link href={`/users/${row.getValue("id")}/info`}>
            <Button size={"sm"} variant={"outline"}>
             <FaInfo />
            </Button>
          </Link>{" "}
          <Link href={`/qrcode/${row.getValue("id")}`}>
            <Button size={"sm"} variant={"outline"}>
             <FaQrcode />
            </Button>
          </Link>{" "}
          <Link
            target="_blank"
            href={
              `https://wa.me/91${row.original.phoneNumber}?text=` +
              `Thank you ${row?.original?.name} for visiting the ${organization?.name}!` +
              "%0a" +
              "ID: " +
              row?.original?.id +
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
              row.original?.info?.balance
            }
          >
            <Button size={"sm"} variant={"outline"}>
             <FaWhatsapp />
            </Button>
          </Link>{" "}
          <Link href={`/users/${row.getValue("id")}`}>
            {" "}
            <Button size={"sm"} variant={"outline"}>
             <FaUserEdit />
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

  const table = useReactTable({
    data: users,
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
    <div className="w-full p-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
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
        <div className="ml-auto">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="destructive"
              className="mr-2"
              size={"sm"}
              onClick={async () => {
                await deleteUser(
                  table
                    .getFilteredSelectedRowModel()
                    .rows.map((_) => _.original.id)
                );
                toast({
                  description: "User was deleted succesfully!",
                  variant: "destructive",
                });
              }}
            >
              Delete
            </Button>
          )}
          <Link href="/users/create-user">
            {" "}
            <Button size={"sm"} variant={"outline"}>
              Create User
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
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
      <div className="flex items-center space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
