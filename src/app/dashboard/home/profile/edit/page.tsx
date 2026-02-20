"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Save, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EditProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user data (same as profile page)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@students.uad.ac.id",
    phone: "+62 812-3456-7890",
    location: "Yogyakarta, Indonesia",
    bio: "Passionate about web development and data structures. Always eager to learn new technologies and collaborate on interesting projects.",
    avatar: "",
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push("/dashboard/home/profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/home/profile"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
          <div className="flex items-center gap-2">
            <UserIcon className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Photo Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-semibold bg-indigo-100 text-indigo-800">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button 
                type="button"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2.5 hover:bg-indigo-700 transition-colors shadow-md"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
              <p className="text-sm text-gray-500 mb-3">
                Upload a new avatar. Recommended size is 256x256px.
              </p>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm">Upload New</Button>
                <Button type="button" variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Remove</Button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={user.name} 
                  onChange={handleChange} 
                  placeholder="Your full name" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={user.email} 
                  onChange={handleChange} 
                  placeholder="Your email address" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={user.phone} 
                  onChange={handleChange} 
                  placeholder="Your phone number" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={user.location} 
                  onChange={handleChange} 
                  placeholder="City, Country" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={user.bio}
                onChange={handleChange}
                className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                placeholder="Tell us about yourself..."
              />
              <p className="text-xs text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/dashboard/home/profile">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : (
                <>
                   <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
