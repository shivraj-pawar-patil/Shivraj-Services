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
  name: string;
  intId: number;
  info: any;
  phoneNumber: string;
};

const getGenderCount = (user: User[], condition: string) =>
  user.filter((user) => user.gender.toLowerCase() === condition).length;

const getMonthlyData = (monthIndex: number, users: User[]) => {
  const month = moment().month(monthIndex);
  const monthName = month.format("MMM");
  const curruntYear = users.filter(
    (user) =>
      user.date.getMonth() === monthIndex &&
      user.date.getFullYear() == moment().get("year")
  );
  const previousYear = users.filter(
    (user) =>
      user.date.getMonth() === monthIndex &&
      user.date.getFullYear() == moment().subtract(1, "year").get("year")
  );
  return {
    date: `${monthName}`,
    [moment().subtract(1, "year").get("year")]: previousYear.length,
    [moment().get("year")]: curruntYear.length,
  };
};

const getUserTypeCount = (type: string, users: User[]) =>
  users.filter((u) => u.type === type).length;

/**
 * Helper function to count users registered on the current date.
 */
const getTodayCount = (users: User[]): number => {
  const today = moment().startOf('day');
  return users.filter((user) => moment(user.date).isSame(today, 'day')).length;
};

/**
 * Helper function to count users registered last month.
 */
const getLastMonthCount = (users: User[]): number => {
  const lastMonthStart = moment().subtract(1, 'month').startOf('month');
  const lastMonthEnd = moment().subtract(1, 'month').endOf('month');
  return users.filter((user) =>
    moment(user.date).isBetween(lastMonthStart, lastMonthEnd, 'day', '[]')
  ).length;
};


async function page() {
  const { orgId } = auth();
  const users: User[] = (await prisma?.user.findMany({
    select: {
      gender: true,
      type: true,
      date: true,
      info: true,
      name: true,
      intId: true,
      phoneNumber: true,
    },
    where: {
      orgId: orgId!,
    },
  })) ?? [];

  const userTypes = users.length
    ? [
      "Dacryocystitis",
      "Cataract",
      "Pterygium",
      "Spectacles",
      "Follow-up",
      "OPD"
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
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and statistics about your users
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Type Chart */}
          <Card className="p-6">
            <div className="space-y-4">
              <Title className="text-foreground">User Type Distribution</Title>

              {/* Legend */}
              <div className="flex flex-wrap gap-2">
                <Badge size="xs" color="rose">
                  Dacryocystitis
                </Badge>
                <Badge size="xs" color="cyan">
                  Cataract
                </Badge>
                <Badge size="xs" color="pink">
                  Pterygium
                </Badge>
                <Badge size="xs" color="green">
                  Spectacles
                </Badge>
                <Badge size="xs" color="blue">
                  Follow-up
                </Badge>
                <Badge size="xs" color="blue">
                  OPD
                </Badge>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-center justify-center">
                <DonutChart
                  className="w-full h-full"
                  variant="pie"
                  data={userTypes ?? []}
                  category="users"
                  index="type"
                  colors={["rose", "cyan", "pink", "green", "blue"]}
                />
              </div>
            </div>
          </Card>

          {/* Gender Chart */}
          <Card className="p-6">
            <div className="space-y-4">
              <Title className="text-foreground">Gender Distribution</Title>

              {/* Legend */}
              <div className="flex flex-wrap gap-2">
                <Badge size="xs" color="rose">
                  Male
                </Badge>
                <Badge size="xs" color="cyan">
                  Female
                </Badge>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-center justify-center">
                <DonutChart
                  className="w-full h-full"
                  variant="pie"
                  data={genderdata ?? []}
                  category="users"
                  index="gender"
                  colors={["rose", "cyan"]}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Area Chart */}
        <Card className="p-6">
          <div className="space-y-4">
            <Title className="text-foreground">Patients Over Time</Title>
            <div className="h-80 w-full">
              <AreaChart
                className="h-full w-full"
                data={areaChartData}
                index="date"
                categories={[
                  moment().subtract(1, "year").get("year").toString(),
                  moment().get("year").toString(),
                ]}
                colors={["indigo", "cyan", "pink"]}
              />
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
              <div className="text-sm text-muted-foreground">Total Patients</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {getLastMonthCount(users)}
              </div>
              <div className="text-sm text-muted-foreground">Last Month</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {users.filter(user => user.date.getMonth() === new Date().getMonth()).length}
              </div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {getTodayCount(users)}
              </div>
              <div className="text-sm text-muted-foreground">Today</div>
            </div>
          </Card>
        </div>

        {/* Upcoming Deliveries Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Title className="text-foreground">Upcoming Deliveries</Title>
                <p className="text-sm text-muted-foreground">Patients with delivery dates scheduled for today or tomorrow.</p>
              </div>
              <Badge color="orange">Action Required</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-md">ID</th>
                    <th className="px-4 py-3">Patient Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Delivery Date</th>
                    <th className="px-4 py-3 text-right rounded-r-md">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.filter(u => {
                    if (!u.info?.delevery_date) return false;
                    const dDate = moment(u.info.delevery_date);
                    const today = moment().startOf('day');
                    const tomorrow = moment().add(1, 'day').endOf('day');
                    return dDate.isBetween(today, tomorrow, 'day', '[]');
                  }).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        No deliveries scheduled for today or tomorrow.
                      </td>
                    </tr>
                  ) : (
                    users.filter(u => {
                      if (!u.info?.delevery_date) return false;
                      const dDate = moment(u.info.delevery_date);
                      const today = moment().startOf('day');
                      const tomorrow = moment().add(1, 'day').endOf('day');
                      return dDate.isBetween(today, tomorrow, 'day', '[]');
                    }).map((user) => (
                      <tr key={user.intId} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">#{user.intId}</td>
                        <td className="px-4 py-3 text-foreground">{user.name}</td>
                        <td className="px-4 py-3">{user.phoneNumber}</td>
                        <td className="px-4 py-3">
                          {moment(user.info.delevery_date).calendar(null, {
                            sameDay: '[Today]',
                            nextDay: '[Tomorrow]',
                            nextWeek: 'DD MMM YYYY',
                            lastDay: '[Yesterday]',
                            lastWeek: 'DD MMM YYYY',
                            sameElse: 'DD MMM YYYY'
                          })}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Badge size="xs" color={moment(user.info.delevery_date).isSame(moment(), 'day') ? "green" : "yellow"}>
                            {moment(user.info.delevery_date).isSame(moment(), 'day') ? "Due Today" : "Due Tomorrow"}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default page;
