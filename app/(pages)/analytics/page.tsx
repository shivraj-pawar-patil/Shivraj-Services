"use server";
import { auth } from "@clerk/nextjs";
import moment from "moment";
import {
  Card,
  DonutChart,
  Title,
  AreaChart,
  Flex,
} from "@tremor/react";

import React from "react";
import prisma from "@/lib/prisma";
async function page() {
  const { orgId } = auth();
  const users = await prisma?.user.findMany({
    select: {
      gender: true,
      type: true,
      date: true,
    },
    where: {
      orgId: orgId!,
    },
  });

  console.log("users", users);

  const userTypes = users.length
    ? [
        {
          type: "Dacryocystitis",
          users: users.filter((u) => u.type == "Dacryocystitis").length,
        },
        {
          type: "Cataract",
          users: users.filter((u) => u.type == "Cataract").length,
        },
        {
          type: "Pterygium",
          users: users.filter((u) => u.type == "Pterygium").length,
        },
        {
          type: "Spectacles",
          users: users.filter((u) => u.type == "Spectacles").length,
        },
        {
          type: "Follow-up",
          users: users.filter((u) => u.type == "Follow-up").length,
        },
      ]
    : [];

  const genderdata = users.length
    ? [
        {
          gender: "male",
          users: users.filter((u) => u.gender == "male").length,
        },
        {
          gender: "female",
          users: users.filter((u) => u.gender == "female").length,
        },
      ]
    : [];

  const areaChartData = users.filter(
    (_) => moment(_.date).get("year") == moment().get("year")
  ).length
    ? [
        {
          date: `Jan ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 0).length,
        },
        {
          date: `Feb ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 1).length,
        },
        {
          date: `Mar ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 2).length,
        },
        {
          date: `Apr ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 3).length,
        },
        {
          date: `May ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 4).length,
        },
        {
          date: `Jun ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 5).length,
        },
        {
          date: `Jul  ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 6).length,
        },
        {
          date: `Aug  ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 7).length,
        },
        {
          date: `Sep ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 8).length,
        },
        {
          date: `Oct ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 9).length,
        },
        {
          date: `Nov ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 10).length,
        },
        {
          date: `Dec ${moment().get("year")}`,
          users: users.filter((_) => _.date.getMonth() == 11).length,
        },
      ]
    : [];

  return (
    <div className="pr-8">
      <Flex className="m-4">
        <Card className="max m-2">
          <Title>User Type</Title>
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
      <Card className="m-4">
        <Title>Users over time</Title>
        <AreaChart
          className="h-72 mt-4"
          data={areaChartData}
          index="date"
          categories={["users"]}
          colors={["indigo", "cyan"]}
        />
      </Card>
    </div>
  );
}

export default page;
