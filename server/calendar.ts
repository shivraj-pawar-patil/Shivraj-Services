"use server";

import prisma from "@/lib/prisma";

export async function getCalendarEvents(orgId: string) {
    const users = await prisma.user.findMany({
        where: {
            orgId,
        },
        select: {
            id: true,
            intId: true,
            name: true,
            date: true,
            type: true,
            info: true,
        },
    });

    const events = users.map((user) => {
        // Basic event from visit date
        const visitEvent = {
            id: user.id,
            title: `${user.name} (${user.type})`,
            start: user.date,
            end: user.date,
            allDay: true,
            resource: { type: 'visit', intId: user.intId }
        };

        // Check for delivery date in info
        const info = user.info as any;
        if (info && info.delevery_date) {
            return [visitEvent, {
                id: `${user.id}-delivery`,
                title: `Delivery: ${user.name}`,
                start: new Date(info.delevery_date),
                end: new Date(info.delevery_date),
                allDay: true,
                resource: { type: 'delivery' }
            }];
        }

        return [visitEvent];
    }).flat();

    return events;
}
