"use server";
import { auth } from "@clerk/nextjs";
import moment from "moment";
import { Card, DonutChart, Title, AreaChart, Flex, Badge } from "@tremor/react";
import React from "react";
import prisma from "@/lib/prisma";

type User = {
  gender: string;
  type: string;
  date: Date;
};

const getCurrentYear = () => moment().get("year");

const getGenderCount = (user: User[], condition: string) =>
  user.filter((user) => user.gender.toLowerCase() === condition).length;

const getMonthlyData = (monthIndex: number, users: User[]) => {
  const month = moment().month(monthIndex);
  const monthName = month.format("MMM");
  const filteredUsers = users.filter(
    (user) => user.date.getMonth() === monthIndex
  );
  return {
    date: `${monthName} ${getCurrentYear()}`,
    users: filteredUsers.length,
    male: getGenderCount(filteredUsers, "male"),
    female: getGenderCount(filteredUsers, "female"),
  };
};

const getUserTypeCount = (type: string, users: User[]) =>
  users.filter((u) => u.type === type).length;

async function page() {
  const { orgId } = auth();
  const users: User[] = await prisma?.user.findMany({
    select: {
      gender: true,
      type: true,
      date: true,
    },
    where: {
      orgId: orgId!,
    },
  });

  const userTypes = users.length
    ? [
        "Dacryocystitis",
        "Cataract",
        "Pterygium",
        "Spectacles",
        "Follow-up",
      ].map((type) => ({
        type,
        users: getUserTypeCount(type, users),
      }))
    : [];

  const genderdata = users.length
    ? ["male", "female"].map((gender) => ({
        gender,
        users: getGenderCount(users, gender),
      }))
    : [];

  const areaChartData = users.length
    ? Array.from({ length: 12 }, (_, monthIndex) =>
        getMonthlyData(monthIndex, users)
      )
    : [];

  return (
    <div className="pr-8">
      <Flex className="m-4">
        <Card className="max m-2">
          <Title>User Type</Title>
          <Badge size="xs" color="rose" className="mr-2 mt-1">
            Dacryocystitis
          </Badge>
          <Badge size="xs" color="cyan" className="mr-2">
            Cataract
          </Badge>
          <Badge size="xs" color="pink" className="mr-2">
            Pterygium
          </Badge>
          <Badge size="xs" color="green" className="mr-2">
            Spectacles
          </Badge>
          <Badge size="xs" color="blue">
            Follow-up
          </Badge>
          <DonutChart
            className="mt-6"
            variant="pie"
            data={userTypes ?? []}
            category="users"
            index="type"
            colors={["rose", "cyan", "pink", "green", "blue"]}
          />
        </Card>

        <Card className="max  m-2">
          <Title>Gender</Title>
          <Badge size="xs" color="rose" className="mr-2 mt-1">
            Male
          </Badge>
          <Badge size="xs" color="cyan">
            Female
          </Badge>
          <DonutChart
            className="mt-6"
            variant="pie"
            data={genderdata ?? []}
            category="users"
            index="gender"
            colors={["rose", "cyan"]}
          />
        </Card>
      </Flex>
      <Card className="m-5">
        <Title>Users over time</Title>
        <AreaChart
          className="h-72 mt-4"
          data={areaChartData}
          index="date"
          categories={["users", "male", "female"]}
          colors={["indigo", "cyan", "pink"]}
        />
      </Card>
    </div>
  );
}

export default page;
