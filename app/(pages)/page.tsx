import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Shield, Phone, Mail, ArrowRight, BarChart3, Lock } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/20 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
            New: Advanced Analytics Dashboard
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Transform Your <br className="hidden md:inline" /> Optical Practice
          </h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            The all-in-one SaaS platform designed for eye care professionals.
            Seamlessly manage patient records, track clinical analytics, and optimize your practice workflow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 shadow-lg shadow-primary/25">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 backdrop-blur-sm bg-background/50">
                Log In
              </Button>
            </Link>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Everything You Need to Scale
            </h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
              Empowering doctors with tools to deliver better care and run a smarter business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  Keep precise records of patient visits, prescriptions, and history in one secure, searchable database.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center"><ArrowRight className="h-3 w-3 mr-2 text-primary" /> Digital Case History</li>
                  <li className="flex items-center"><ArrowRight className="h-3 w-3 mr-2 text-primary" /> Easy Search & Retrieval</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle>Clinical Analytics</CardTitle>
                <CardDescription>
                  Gain actionable insights into your practice&apos;s performance with real-time data visualization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center"><ArrowRight className="h-3 w-3 mr-2 text-primary" /> Revenue Tracking</li>
                  <li className="flex items-center"><ArrowRight className="h-3 w-3 mr-2 text-primary" /> Patient Demographics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <Lock className="h-6 w-6" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Enterprise-grade security to ensure your patient data remains confidential and protected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center"><ArrowRight className="h-3 w-3 mr-2 text-primary" /> Encrypted Data</li>
                  <li className="flex items-center"><ArrowRight className="h-3 w-3 mr-2 text-primary" /> Secure Access Control</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted/50 border-t border-border/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                Ready to Upgrade Your Practice?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-[500px]">
                Join the network of forward-thinking eye care specialists relying on Shivraj Services.
                Contact us today for a demo or support.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-background border border-border/50 shadow-sm">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Call Us</p>
                    <p className="text-lg font-semibold text-foreground">8999678681</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-background border border-border/50 shadow-sm">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email Us</p>
                    <p className="text-lg font-semibold text-foreground">shivraj.patil1209@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              {/* Optional: Add an image or illustration here */}
              <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-full opacity-50 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <Activity className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">Eye Optical Services</span>
          </div>
          <p className="text-sm text-muted-foreground text-center sm:text-right">
            &copy; {new Date().getFullYear()} Eye Optical Services. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
