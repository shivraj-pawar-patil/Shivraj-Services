import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCalendarEvents } from "@/server/calendar";
import CalendarClient from "./components/CalendarClient";

export default async function CalendarPage() {
    const { orgId } = auth();

    if (!orgId) {
        redirect("/");
    }

    const events = await getCalendarEvents(orgId);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Appointment Calendar</h1>
            <CalendarClient events={events} />
        </div>
    );
}
