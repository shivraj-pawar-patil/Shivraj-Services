import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCalendarEvents } from "@/server/calendar";
import CalendarClient from "./components/CalendarClient";

export default async function CalendarPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const orgId = user.id; // Using user ID as org ID for now based on existing patterns
    const events = await getCalendarEvents(orgId);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Appointment Calendar</h1>
            <CalendarClient events={events} />
        </div>
    );
}
