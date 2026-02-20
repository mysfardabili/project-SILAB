import React from 'react'
import { BookOpen, BookText, ClipboardList, Slash, ArrowRight, Users, ChevronRight, Clock, Star, Languages, BadgeCheck, Calendar, Award, BookmarkPlus, Share2 } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button, buttonVariants } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import Image from 'next/image'
import SiLabAccordion from '@/components/ui/si-lab-accordion'

interface MaterialOverviewProps {
    params: Promise<{
        materialId: string
    }>
}

const accordionData = [
    {
        title: "What is Next.js?",
        content: "Next.js is a React framework for production with features like routing, SSR, and API routes.",
        chapter: 8
    },
    {
        title: "What is Tailwind CSS?",
        content: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
        chapter: 4
    },
    {
        title: "Is this accordion accessible?",
        content: "It's pretty good, but you could improve it with ARIA attributes for full accessibility support.",
        chapter: 3
    }
]

const instructors = [
    {
        name: "Alex Morgan",
        role: "Senior Developer",
        avatar: "/avatars/instructor-1.png"
    },
    {
        name: "Sarah Chen",
        role: "System Architect",
        avatar: "/avatars/instructor-2.png"
    }
]

const MaterialOverviewPage: React.FC<MaterialOverviewProps> = async ({ params }) => {
    const { materialId } = await params

    return (
        <div className='py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-32 space-y-8 bg-gray-50'>
            <Breadcrumb className="text-sm text-gray-600">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/learnings" className="hover:text-indigo-600 transition-colors">My Learning</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem className="font-medium text-gray-900">
                        How to become good backend developer
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Hero Section with Gradient Background */}
            <div className='rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 p-8 shadow-lg'>
                <div className='flex flex-col lg:flex-row justify-between gap-8 items-center'>
                    <div className="lg:w-1/2 flex flex-col text-white">
                        <span className='flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 w-fit'>
                            <BookOpen className='w-4 h-4' />
                            <span className='text-sm font-medium'>Course</span>
                        </span>

                        <h1 className='font-bold text-3xl md:text-4xl mt-4 leading-tight'>How to become a good backend developer</h1>

                        <p className='mt-4 text-white/90 leading-relaxed'>
                            Master server-side architecture, databases, and API design with industry-standard tools and best practices.
                        </p>

                        {/* Course Stats */}
                        <div className='mt-6 flex flex-wrap gap-4'>
                            {/* Stats commented out */}
                        </div>

                        {/* Tags */}
                        <div className='mt-6 flex flex-wrap gap-2'>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Node.js</Badge>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Database Design</Badge>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">API Development</Badge>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">System Architecture</Badge>
                        </div>

                        <div className='flex gap-3 mt-8'>
                            <Button className='bg-white text-indigo-700 hover:bg-white/90 transition-colors font-medium flex items-center gap-2'>
                                Get Started <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="lg:w-2/5">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <Image
                                className="rounded-lg w-full"
                                src="/vignettes/code-placeholder.svg"
                                alt="Backend development illustration"
                                width={500}
                                height={300}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <h3 className="font-medium text-gray-900">Your Progress</h3>
                        <p className="text-sm text-gray-600">You've completed 2 of 8 modules</p>
                    </div>
                    <div className="w-full md:w-2/3">
                        <Progress value={25} className="h-2 bg-gray-200"/>
                        <div className="flex justify-between mt-1">
                            <span className="text-xs font-medium text-indigo-600">25% complete</span>
                            <span className="text-xs text-gray-500">Last accessed: 2 days ago</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                <div className="lg:col-span-2 space-y-8">
                    {/* Course Description */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Overview</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Backend development is the backbone of modern web applications. This comprehensive course will guide you through the essential concepts, technologies, and best practices needed to excel as a backend developer. From designing robust database schemas to building scalable APIs and implementing efficient server-side logic, you'll gain hands-on experience with the tools used by professional developers in the industry.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            By the end of this course, you'll have built a complete backend system for a real-world application, giving you the confidence and skills to tackle backend challenges in any professional environment.
                        </p>
                    </div>

                    {/* What You'll Learn */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-indigo-100 rounded-full p-1">
                                    <CheckIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Design scalable database architectures</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-indigo-100 rounded-full p-1">
                                    <CheckIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Build RESTful and GraphQL APIs</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-indigo-100 rounded-full p-1">
                                    <CheckIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Implement authentication and authorization</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-indigo-100 rounded-full p-1">
                                    <CheckIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Deploy and scale backend services</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-indigo-100 rounded-full p-1">
                                    <CheckIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Optimize application performance</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-indigo-100 rounded-full p-1">
                                    <CheckIcon className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="text-gray-700">Implement message queues and caching</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Content */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                            <span className="text-sm text-gray-500">8 modules • 24 lessons</span>
                        </div>
                        <SiLabAccordion items={accordionData} />
                        <div className="mt-4 text-center">
                            <Button variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">
                                View All Modules
                            </Button>
                        </div>
                    </div>

                    {/* Instructors */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {instructors.map((instructor, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={instructor.avatar} alt={instructor.name} />
                                        <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{instructor.name}</h3>
                                        <p className="text-sm text-gray-600">{instructor.role}</p>
                                        <p className="text-sm text-gray-700 mt-2">
                                            Industry expert with over 10 years of experience in backend development and system architecture.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Course Summary Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-5 border border-gray-200 sticky top-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Course Summary</h3>

                        <div className="flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-indigo-600" />
                                <span>Estimation</span>
                            </div>
                            <span className="font-medium text-gray-900">2h 30m</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>Points</span>
                            </div>
                            <span className="font-medium text-gray-900">120 XP</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Languages className="w-4 h-4 text-blue-600" />
                                <span>Language</span>
                            </div>
                            <span className="font-medium text-gray-900">English</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 text-green-600" />
                                <span>Certificate</span>
                            </div>
                            <span className="font-medium text-green-600">Available</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-500" />
                                <span>Due Date</span>
                            </div>
                            <span className="font-medium text-red-500">May 5, 2025</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-2">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Continue Learning
                            </Button>
                            <Button variant="outline" className="w-full mt-3 border-gray-200 text-gray-700 hover:bg-gray-50 flex justify-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Share Course
                            </Button>
                        </div>
                    </div>

                    {/* Related Courses */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Courses</h3>
                        <div className="space-y-4">
                            <RelatedCourseCard
                                title="Advanced API Design Patterns"
                                level="Intermediate"
                                duration="1h 45m"
                                image="/vignettes/api-design.svg"
                            />
                            <RelatedCourseCard
                                title="Database Optimization Techniques"
                                level="Advanced"
                                duration="3h 15m"
                                image="/vignettes/database.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper Components
interface CheckIconProps {
    className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
)

interface RelatedCourseCardProps {
    title: string;
    level: string;
    duration: string;
    image: string;
}

const RelatedCourseCard: React.FC<RelatedCourseCardProps> = ({ title, level, duration, image }) => (
    <div className="flex items-start gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <Image src={image} alt={title} width={40} height={40} />
        </div>
        <div>
            <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-600">{level}</span>
                <span className="text-gray-400">•</span>
                <span className="text-xs text-gray-600">{duration}</span>
            </div>
            <Button variant="link" className="text-indigo-600 hover:text-indigo-700 p-0 h-auto text-sm mt-1">
                View Course
            </Button>
        </div>
    </div>
)

export default MaterialOverviewPage
