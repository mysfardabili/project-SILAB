"use client";

import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Camera, Award, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function HomeProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@students.uad.ac.id",
    phone: "+62 812-3456-7890",
    location: "Yogyakarta, Indonesia",
    joinDate: "September 2023",
    studentId: "20230001",
    program: "Informatika",
    semester: "5",
    gpa: "3.75",
    avatar: "",
    bio: "Passionate about web development and data structures. Always eager to learn new technologies and collaborate on interesting projects.",
    skills: ["JavaScript", "React", "Python", "SQL", "Git"],
    achievements: [
      { title: "Top Performer", description: "Web Technology Course", date: "Oct 2024" },
      { title: "Perfect Attendance", description: "Database Systems", date: "Sep 2024" },
      { title: "Project Excellence", description: "Final Project Grade A", date: "Aug 2024" }
    ],
    stats: {
      coursesCompleted: 12,
      totalStudyHours: 156,
      discussionPosts: 23,
      helpfulAnswers: 15
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/home"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/home/settings">
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button 
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditMode ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-800">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditMode && (
                    <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
                      <Camera className="h-3 w-3" />
                    </button>
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.program} • Semester {user.semester}</p>
                  <p className="text-xs text-gray-400">Student ID: {user.studentId}</p>
                </div>

                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    GPA: {user.gpa}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Joined {user.joinDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {isEditMode && (
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    + Add Skill
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-4">
                <BookOpen className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.coursesCompleted}</div>
                <div className="text-xs text-gray-500">Courses Completed</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <Clock className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.totalStudyHours}h</div>
                <div className="text-xs text-gray-500">Study Hours</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <User className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.discussionPosts}</div>
                <div className="text-xs text-gray-500">Discussion Posts</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <Award className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{user.stats.helpfulAnswers}</div>
                <div className="text-xs text-gray-500">Helpful Answers</div>
              </CardContent>
            </Card>
          </div>

          {/* Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditMode ? (
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={4}
                  defaultValue={user.bio}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="bg-yellow-500 text-white rounded-full p-2">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity - Coming Soon */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Activity tracking coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}