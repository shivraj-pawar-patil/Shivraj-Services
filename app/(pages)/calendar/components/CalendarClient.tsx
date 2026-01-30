"use client";

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/navigation";

// Setup the localizer by providing the moment (or globalize, or Luxon) instance
// to the localizer function.
const localizer = momentLocalizer(moment);
const Calendar = BigCalendar as any;

interface CalendarClientProps {
    events: any[];
}

export default function CalendarClient({ events }: CalendarClientProps) {
    const router = useRouter();

    const formattedEvents = events.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));

    return (
        <div className="h-[calc(100vh-100px)] bg-background rounded-md shadow-md p-4">
            <Calendar
                localizer={localizer}
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                onSelectEvent={(event: any) => {
                    if (event.resource?.intId) {
                        router.push(`/users/${event.resource.intId}/info`);
                    }
                }}
                eventPropGetter={(event: any) => {
                    const isDelivery = event.resource?.type === 'delivery';
                    return {
                        style: {
                            backgroundColor: isDelivery ? '#10b981' : '#3b82f6', // Green for delivery, Blue for visit
                        }
                    }
                }}
            />
        </div>
    );
}
