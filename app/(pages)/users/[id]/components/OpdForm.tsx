"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  Printer, 
  Trash, 
  Plus, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon, 
  FileText,
  Activity
} from "lucide-react";
import Link from "next/link";
import { User } from "@prisma/client";
import { Organization } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Users extends User {
  info: any;
}
export interface UserFormProps {
  user: Users | null;
  organization: Organization;
}

// Organization information map — extend as you add organizations
const ORGANIZATIONS: Record<
  string,
  {
    tagline: string;
    doctorName: string;
    address: string;
    contact: string;
    email?: string;
  }
> = {
  "पेडगावकर नेत्र रुग्णालय":{
    tagline: "Comprehensive Vision & Eye Care",
    doctorName: "           ",
    address: "प्लॉट क्र. १०, जिल्हा परिषद कॉलनी, शाहाजी नगर, नांदेड",
    contact: "Appointments: 02462-266357",
  },
  "Om-Sai Optical": {
    tagline: "Comprehensive Vision & Eye Care",
    doctorName: "Dr. Govind Wankhede Patil, MBBS",
    address: "Om-Sai Optical, Balapur",
    contact: "Appointments: +91 91465 23915",
    email: "omsaioptical@gmail.com"
  },
  "Shivraj Services": {
    tagline: "Comprehensive Vision & General Healthcare",
    doctorName: "Dr. Shivraj Pawar Patil, MBBS",
    address: "Shivraj Services Complex, Nanded",
    contact: "Appointments: +91 11111 11111",
    email: "support@shivrajservices.com",
  },
  // Example additional org — modify or add real orgs here
  "Default Clinic": {
    tagline: "General Healthcare & Consultation",
    doctorName: "Authorized Doctor",
    address: "Clinic Address",
    contact: "Appointments: +91 00000 00000",
    email: "support@example.com",
  },
};
function OpdForm({ user, organization }: UserFormProps ) {
  const { user: clerkUser } = useUser()
  const orgName = clerkUser?.organizationMemberships[0]?.organization.name || "Shivraj Services";


  const router = useRouter();
  const { toast } = useToast();

  // Select organization display info based on the current clerk org name
  const orgInfo = ORGANIZATIONS[orgName] || ORGANIZATIONS["Shivraj Services"];

  // Safely parse user.info
  const parsedInfo = React.useMemo(() => {
    if (!user?.info) return {};
    if (typeof user.info === "string") {
      try {
        return JSON.parse(user.info);
      } catch (e) {
        return {};
      }
    }
    return user.info as Record<string, any>;
  }, [user]);

  // States for prefilled & editable patient details
  const [patientName, setPatientName] = React.useState(user?.name ?? "");
  const [age, setAge] = React.useState<string>(parsedInfo?.age ?? "");
  const [city, setCity] = React.useState(user?.city ?? "");
  const [phoneNumber, setPhoneNumber] = React.useState(user?.phoneNumber ?? "");
  
  // Format current date as YYYY-MM-DD for date input
  const todayStr = React.useMemo(() => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }, []);

  const [prescriptionDate, setPrescriptionDate] = React.useState(todayStr);

  // Formatted print timestamp
  const printDateStr = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }, []);

  // States for clinical findings
  const [complaints, setComplaints] = React.useState("");
  const [diagnosis, setDiagnosis] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  const [followUp, setFollowUp] = React.useState("");

  // State for dynamic medicine list
  const [medicines, setMedicines] = React.useState<Medicine[]>([
    { id: "1", name: "", dosage: "", frequency: "", duration: "" }
  ]);
  // Toggle between typed medicines and print-ready handwritten area
  const [handwrittenMode, setHandwrittenMode] = React.useState(false);
  const [handwrittenNotes, setHandwrittenNotes] = React.useState("");

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { id: Date.now().toString(), name: "", dosage: "", frequency: "", duration: "" }
    ]);
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const updateMedicine = (id: string, field: keyof Medicine, value: string) => {
    setMedicines(medicines.map(med => med.id === id ? { ...med, [field]: value } : med));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    toast({
      description: "Prescription details loaded & printed successfully!",
    });
    router.push("/users");
  };

  return (
    <div suppressHydrationWarning className="min-h-screen bg-slate-50/50 pb-12 print:bg-white print:pb-0 print:min-h-0">
      {/* Print settings injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: A4; margin: 1.5cm; }
          html, body {
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            font-size: 12pt;
            line-height: 1.2;
          }
          /* hide interactive UI */
          .no-print, button, input, textarea, .no-print * { display: none !important; }

          /* Make the card use full printable width and remove shadows/borders */
          .max-w-5xl { max-width: 100% !important; width: 100% !important; }
          .shadow-xl, .print\:shadow-none { box-shadow: none !important; }
          .rounded-2xl, .print\:rounded-none { border-radius: 0 !important; }
          .border-slate-200\/80, .print\:border-none { border: none !important; }

          /* Table print styles */
          table { border-collapse: collapse !important; width: 100% !important; font-size: 12pt; }
          table th, table td { padding: 6px 4px !important; vertical-align: top; }
          table thead th { color: #000 !important; font-weight: 700; }
          table tbody tr { border-bottom: 1px solid #e6e6e6; }

          /* Print-only text styles */
          .print\:text-black { color: #000 !important; }
          .print\:block { display: block !important; }

          /* Large blank area for handwriting when needed */
          .print-blank-area { height: 300px; }

          /* Ensure preformatted notes print clearly */
          pre { white-space: pre-wrap; font-family: inherit; font-size: 12pt; }
        }
      `}} />

      {/* Page header controls - Hidden during print */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex flex-col sm:flex-row gap-4 justify-between items-center no-print">
        <div className="flex flex-col gap-1">
          <Link href="/users">
            <Button variant="ghost" className="gap-2 self-start text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-4 w-4" /> Back to Patient List
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            onClick={handlePrint} 
            className="flex-1 sm:flex-initial gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Printer className="h-4 w-4" /> Print Prescription
          </Button>
          <Button 
            onClick={handleSave} 
            variant="outline"
            className="flex-1 sm:flex-initial gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Go Back
          </Button>
        </div>
      </div>

      {/* Main Prescription Card */}
      <Card className="max-w-5xl mx-auto bg-white shadow-xl border-slate-200/80 rounded-2xl overflow-hidden print:border-none print:shadow-none print:rounded-none">
        <CardContent className="p-8 sm:p-12 print:p-0 print:text-black">
          
          {/* Print-only top bar (date + org) */}
          <div className="hidden print:flex justify-between items-center text-[10px] text-slate-700 mb-2">
            <span>{printDateStr}</span>
            <span className="font-semibold">{orgName}</span>
          </div>

          {/* Clinic Letterhead */}
          <div className="border-b-2 border-double border-slate-300 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight print:text-black print:text-2xl">
                {orgName || "Shivraj Services"}
              </h2>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mt-1 print:text-slate-800 print:text-xs">
                {orgInfo.tagline}
              </p>
            </div>
            <div className="text-slate-500 text-xs md:text-right space-y-1 print:text-black print:text-[10px]">
              <p className="font-semibold text-slate-700 print:font-bold">{orgInfo.doctorName}</p>
              <p>{orgInfo.address}</p>
              <p>{orgInfo.contact} {orgInfo.email ? `| ${orgInfo.email}` : ""}</p>
            </div>
          </div>

          {/* Patient Info Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 border-b border-slate-100 pb-6 mb-6 text-sm print:border-slate-300">
            {/* Patient Name */}
            <div>
              <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold mb-1 print:text-slate-600">
                Patient Name
              </span>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border rounded-md px-3 py-1.5 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                placeholder="Enter Name"
              />
              <span className="hidden print:inline font-bold text-slate-900 text-base">{patientName || "—"}</span>
            </div>

            {/* Age & Gender */}
            <div>
              <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold mb-1 print:text-slate-600">
                Age / Gender
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-16 border rounded-md px-3 py-1.5 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                  placeholder="Age"
                />
                <span className="hidden print:inline font-bold text-slate-900 text-base">
                  {age ? `${age} Yrs` : "—"}
                </span>
                <span className="font-bold text-slate-900 text-base">
                  / {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—"}
                </span>
              </div>
            </div>

            {/* Date */}
            <div>
              <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold mb-1 print:text-slate-600">
                Prescription Date
              </span>
              <input
                type="date"
                value={prescriptionDate}
                onChange={(e) => setPrescriptionDate(e.target.value)}
                className="w-full max-w-[180px] border rounded-md px-3 py-1.5 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
              />
              <span className="hidden print:inline font-bold text-slate-900 text-base">
                {prescriptionDate ? new Date(prescriptionDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "—"}
              </span>
            </div>

            {/* Serial Number */}
            <div>
              <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold mb-1 print:text-slate-600">
                Serial No.
              </span>
              <span className="font-mono font-bold text-indigo-600 text-base print:text-black">
                #{user?.serialno || "—"}
              </span>
            </div>

            {/* City / Address */}
            <div>
              <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold mb-1 print:text-slate-600">
                Address / City
              </span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded-md px-3 py-1.5 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                placeholder="Enter City"
              />
              <span className="hidden print:inline font-bold text-slate-900 text-base">{city || "—"}</span>
            </div>

            {/* Mobile Number */}
            <div>
              <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold mb-1 print:text-slate-600">
                Mobile Number
              </span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border rounded-md px-3 py-1.5 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                placeholder="Enter Phone"
              />
              <span className="hidden print:inline font-bold text-slate-900 text-base">{phoneNumber || "—"}</span>
            </div>
          </div>

          {/* Clinical Findings & Diagnosis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-6 mb-6 print:border-slate-300">
            {/* Complaints */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1 print:text-slate-600 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 no-print" /> Chief Complaints / Symptoms
              </label>
              <textarea
                placeholder="Chief complaints, history of illness..."
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
                className="flex min-h-[90px] w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print resize-none"
              />
              <p className="hidden print:block text-slate-800 text-sm whitespace-pre-wrap leading-relaxed font-semibold">
                {complaints || "No complaints recorded."}
              </p>
            </div>

            {/* Diagnosis */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1 print:text-slate-600 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 no-print" /> Diagnosis / Clinical Findings
              </label>
              <textarea
                placeholder="Diagnosis or clinical findings..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="flex min-h-[90px] w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print resize-none"
              />
              <p className="hidden print:block text-slate-800 text-sm whitespace-pre-wrap leading-relaxed font-semibold">
                {diagnosis || "No diagnosis recorded."}
              </p>
            </div>
          </div>

          {/* Prescription Medicines (Rx) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2 print:border-slate-300">
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-4xl text-slate-700 font-extrabold select-none print:text-black">
                  Rₓ
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest no-print">
                  Medicines & Treatment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={handwrittenMode ? "outline" : undefined}
                  size="sm"
                  className={`no-print ${handwrittenMode ? "border-indigo-200 text-indigo-600" : "bg-indigo-600 text-white"}`}
                  onClick={() => setHandwrittenMode(false)}
                >
                  Typed
                </Button>
                <Button
                  type="button"
                  variant={handwrittenMode ? undefined : "outline"}
                  size="sm"
                  className={`no-print ${handwrittenMode ? "bg-indigo-600 text-white" : "border-indigo-200 text-indigo-600"}`}
                  onClick={() => setHandwrittenMode(true)}
                >
                  Handwritten
                </Button>
                {!handwrittenMode && (
                  <Button 
                    onClick={addMedicine}
                    type="button"
                    variant="outline" 
                    size="sm" 
                    className="no-print gap-1.5 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Medicine
                  </Button>
                )}
              </div>
            </div>

            {/* Typed medicines or Handwritten area */}
            {!handwrittenMode ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold text-xs uppercase tracking-wider print:border-slate-300 print:text-black print:text-[10px]">
                      <th className="py-2.5 w-12 text-center">#</th>
                      <th className="py-2.5 min-w-[240px]">Medicine Name</th>
                      <th className="py-2.5 w-44">Dosage Pattern</th>
                      <th className="py-2.5 w-48">Frequency / Instruction</th>
                      <th className="py-2.5 w-36">Duration</th>
                      <th className="py-2.5 w-12 text-right no-print"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((med, index) => (
                      <tr key={med.id} className="border-b border-slate-100 last:border-b-0 print:border-slate-200 print:last:border-b-0">
                        <td className="py-4 font-bold text-slate-400 align-top text-center print:text-black pt-5">
                          {index + 1}
                        </td>
                        <td className="py-3 pr-4 align-top">
                          <input
                            type="text"
                            placeholder="e.g. Paracetamol 650 mg"
                            value={med.name}
                            onChange={(e) => updateMedicine(med.id, "name", e.target.value)}
                            className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                          />
                          <span className="hidden print:block font-bold text-slate-900 text-sm pt-2">
                            {med.name || "—"}
                          </span>
                        </td>
                        <td className="py-3 pr-4 align-top">
                          <div className="flex flex-col gap-1.5">
                            <input
                              type="text"
                              placeholder="e.g. 1-0-1"
                              value={med.dosage}
                              onChange={(e) => updateMedicine(med.id, "dosage", e.target.value)}
                              className="w-full border rounded-md px-3 py-1.5 text-center font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                            />
                            <span className="hidden print:block text-slate-800 text-sm font-semibold font-mono pt-2">
                              {med.dosage || "—"}
                            </span>
                            <div className="flex flex-wrap gap-1 no-print">
                              {["1-0-0", "0-1-0", "0-0-1", "1-0-1", "1-1-1"].map((dose) => (
                                <button
                                  key={dose}
                                  type="button"
                                  onClick={() => updateMedicine(med.id, "dosage", dose)}
                                  className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                                    med.dosage === dose
                                      ? "bg-indigo-600 text-white border-indigo-600"
                                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                  }`}
                                >
                                  {dose}
                                </button>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 align-top">
                          <div className="flex flex-col gap-1.5">
                            <input
                              type="text"
                              placeholder="e.g. After Food"
                              value={med.frequency}
                              onChange={(e) => updateMedicine(med.id, "frequency", e.target.value)}
                              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                            />
                            <span className="hidden print:block text-slate-800 text-sm font-semibold pt-2">
                              {med.frequency || "—"}
                            </span>
                            <div className="flex flex-wrap gap-1 no-print">
                              {["After Food", "Before Food", "Eye Drops", "Once Daily"].map((freq) => (
                                <button
                                  key={freq}
                                  type="button"
                                  onClick={() => updateMedicine(med.id, "frequency", freq)}
                                  className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                                    med.frequency === freq
                                      ? "bg-indigo-600 text-white border-indigo-600"
                                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                  }`}
                                >
                                  {freq}
                                </button>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 align-top">
                          <div className="flex flex-col gap-1.5">
                            <input
                              type="text"
                              placeholder="e.g. 5 Days"
                              value={med.duration}
                              onChange={(e) => updateMedicine(med.id, "duration", e.target.value)}
                              className="w-full border rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                            />
                            <span className="hidden print:block text-slate-800 text-sm font-semibold pt-2">
                              {med.duration || "—"}
                            </span>
                            <div className="flex flex-wrap gap-1 no-print">
                              {["3 Days", "5 Days", "1 Wk", "2 Wk", "1 Mo"].map((dur) => (
                                <button
                                  key={dur}
                                  type="button"
                                  onClick={() => updateMedicine(med.id, "duration", dur)}
                                  className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                                    med.duration === dur
                                      ? "bg-indigo-600 text-white border-indigo-600"
                                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                  }`}
                                >
                                  {dur}
                                </button>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 align-top text-right no-print pt-5">
                          <button
                            type="button"
                            onClick={() => removeMedicine(med.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                            title="Delete Row"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 block no-print">Handwritten Medicines (on-screen notes)</label>
                <textarea
                  placeholder="Write notes here for printing or leave blank to use pen on paper..."
                  value={handwrittenNotes}
                  onChange={(e) => setHandwrittenNotes(e.target.value)}
                  className="w-full min-h-[160px] rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                />

                {/* Print representation: either typed notes or blank dashed lines for handwriting */}
                <div className="hidden print:block mt-2 text-sm text-slate-800">
                  {handwrittenNotes.trim() ? (
                    <pre className="whitespace-pre-wrap font-semibold">{handwrittenNotes}</pre>
                  ) : (
                    // Print a blank space for the doctor to write on paper
                    <div className="h-48" />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Advice / Special instructions & Signature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-6 mt-8 print:border-slate-300">
            {/* Advice */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1 print:text-slate-600">
                Special Advice / Instructions
              </label>
              <textarea
                placeholder="Avoid screen time, follow up if pain increases..."
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="flex min-h-[90px] w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print resize-none"
              />
              <p className="hidden print:block text-slate-800 text-sm whitespace-pre-wrap leading-relaxed font-semibold">
                {advice || "No specific instructions."}
              </p>
            </div>

            {/* Signature & Follow-up */}
            <div className="flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1 print:text-slate-600">
                  Next Follow-up Visit
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 week, or specific date"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  className="w-full max-w-[250px] border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 no-print"
                />
                <span className="hidden print:inline text-slate-800 text-sm font-semibold">
                  {followUp || "As needed / SOS"}
                </span>
              </div>

              {/* Signature section */}
              <div className="flex flex-col items-end mt-auto text-right">
                <div className="h-16 w-40 border-b border-dashed border-slate-300 print:border-slate-400 mb-2"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest print:text-slate-700">
                  Authorized Doctor Stamp & Sign
                </span>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default OpdForm;
