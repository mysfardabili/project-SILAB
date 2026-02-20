"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, FileUp, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RequestCorrectionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    const formData = new FormData(e.currentTarget);
    const course = formData.get("course") as string;
    const date = formData.get("date") as string;
    const reason = formData.get("reason") as string;

    if (!course || !date || !reason) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        router.push("/dashboard/attendance");
      }, 3000);
      
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Request Submitted!</h2>
          <p className="text-gray-600">
            Your attendance correction request has been sent to the instructor. You will be redirected shortly.
          </p>
          <div className="pt-4">
            <Link 
              href="/dashboard/attendance"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <Link 
            href="/dashboard/attendance"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Request Correction</h1>
          <p className="mt-2 text-sm text-gray-600">
            Submit a request if you believe your attendance was recorded incorrectly. Make sure to provide valid reasoning and evidence if applicable.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Course Selection */}
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-sm font-medium text-gray-700">
                    Course <span className="text-red-500">*</span>
                  </Label>
                  <select 
                    id="course"
                    name="course" 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled selected hidden>Select course</option>
                    <option value="web-tech">Web Technology</option>
                    <option value="data-structures">Data Structures</option>
                    <option value="comp-networks">Computer Networks</option>
                    <option value="database">Database Systems</option>
                  </select>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date of Class <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      type="date" 
                      id="date" 
                      name="date"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Status Claim */}
              <div className="space-y-2">
                <Label htmlFor="expectedStatus" className="text-sm font-medium text-gray-700">
                  Expected Status <span className="text-red-500">*</span>
                </Label>
                <select 
                  id="expectedStatus"
                  name="expectedStatus" 
                  defaultValue="present"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled hidden>Select expected status</option>
                  <option value="present">Present</option>
                  <option value="late">Late (System marked as Absent)</option>
                  <option value="excused">Excused / Sick Leave</option>
                </select>
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                  Reason for Correction <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  placeholder="Explain why your attendance should be corrected. Be specific."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide clear details that can help your instructor verify your claim.
                </p>
              </div>

              {/* File Upload (UI only) */}
              <div className="space-y-2 pt-2">
                <Label className="text-sm font-medium text-gray-700">
                  Supporting Evidence (Optional)
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer group">
                  <div className="space-y-1 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                      <FileUp className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
