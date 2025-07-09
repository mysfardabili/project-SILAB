"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeNewDiscussionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    course: "",
    category: ""
  });

  const courses = [
    "Web Technology",
    "Data Structures", 
    "Database Systems",
    "Software Engineering",
    "Computer Networks",
    "Operating Systems"
  ];

  const categories = [
    "General Question",
    "Technical Help",
    "Assignment Help",
    "Study Group",
    "Project Discussion",
    "Exam Preparation"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Question submitted successfully! 🎉");
      router.push("/dashboard/home/discussions");
    }, 1500);
  };

  const isFormValid = formData.title.trim() && formData.content.trim() && formData.course && formData.category;

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/home/discussions"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Discussions
        </Link>
        <div className="flex items-center gap-2">
          <Plus className="h-6 w-6 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-900">Ask a Question</h1>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Question Title *
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., How to implement binary search in JavaScript?"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full"
              required
            />
            <p className="text-xs text-gray-500">
              Be specific and clear about what you're asking
            </p>
          </div>

          {/* Course Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Course *
              </Label>
              <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Question Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              Question Details *
            </Label>
            <textarea
              id="content"
              rows={6}
              placeholder="Describe your question in detail. Include any code, error messages, or specific examples that might help others understand your problem..."
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              required
            />
            <p className="text-xs text-gray-500">
              Provide context, what you've tried, and what specifically you need help with
            </p>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for getting good answers:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Be specific about what you're trying to achieve</li>
              <li>• Include relevant code or error messages</li>
              <li>• Mention what you've already tried</li>
              <li>• Use proper formatting for code snippets</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="flex items-center gap-2 flex-1 sm:flex-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Question
                </>
              )}
            </Button>
            <Link href="/dashboard/home/discussions" className="flex-1 sm:flex-none">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

      {/* Preview Section (Optional Enhancement) */}
      {formData.title && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Preview:</h3>
          <div className="bg-white rounded-md border-l-4 border-indigo-400 p-4">
            <h4 className="font-medium text-gray-900 mb-2">{formData.title}</h4>
            {formData.course && (
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {formData.course}
                </span>
                {formData.category && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {formData.category}
                  </span>
                )}
              </div>
            )}
            {formData.content && (
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{formData.content}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}