import React from "react";
import prisma from "@/lib/prisma";
import DataTableDemo, { User } from "./[id]/components/Users";
import { auth } from "@clerk/nextjs";
import { endOfDay, startOfDay } from "date-fns";
const PAGE_SIZE = 20;

type UsersPageProps = {
  searchParams: {
    page?: string;
    q?: string;
    camp?: string;
    type?: string;
    date?: string;
  };
};

async function page({ searchParams }: UsersPageProps) {
  const { orgId } = auth();
  const requestedPage = Number(searchParams.page || "1");
  const pageIndex = Number.isFinite(requestedPage)
    ? Math.max(0, Math.floor(requestedPage) - 1)
    : 0;
  const search = searchParams.q?.trim() || undefined;
  const selectedDate = searchParams.date ? new Date(searchParams.date) : undefined;
  const where = {
    orgId: orgId!,
    ...(search && { name: { contains: search, mode: "insensitive" as const } }),
    ...(searchParams.camp === "true" && { from_camp: true }),
    ...(searchParams.type && { type: searchParams.type }),
    ...(selectedDate && !Number.isNaN(selectedDate.getTime()) && {
      OR: [
        { date: { gte: startOfDay(selectedDate), lt: endOfDay(selectedDate) } },
        { updatedAt: { gte: startOfDay(selectedDate), lt: endOfDay(selectedDate) } },
      ],
    }),
  };

  const [totalCount, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
    select: {
      id: true,
      intId: true,
      serialno: true,
      name: true,
      gender: true,
      phoneNumber: true,
      city: true,
      type: true,
      info: true,
      from_camp: true,
      date: true,
      updatedAt: true,
    },
    where: {
      ...where,
    },
    orderBy: [{ updatedAt: "desc" }, { intId: "desc" }],
    skip: pageIndex * PAGE_SIZE,
    take: PAGE_SIZE,
    }),
  ]);

  return (
    <DataTableDemo
      users={users as User[]}
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={PAGE_SIZE}
      filters={{
        search: search || "",
        camp: searchParams.camp === "true",
        type: searchParams.type || "",
        date: searchParams.date || "",
      }}
    />
  );
}

export default page;
