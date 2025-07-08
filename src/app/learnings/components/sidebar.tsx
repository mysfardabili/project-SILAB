"use client";

import { FC, useState } from "react";
import { Search, ChevronDown, CheckCircle, CircleIcon, Menu, X } from "lucide-react";
import Link from "next/link";

// Types consistent with the parent component
interface ContentItem {
    id: string;
    title: string;
    isCompleted?: boolean;
    isCurrent?: boolean;
}

interface ContentSection {
    id: string;
    title: string;
    isExpanded?: boolean;
    isInProgress?: boolean;
    isCompleted?: boolean;
    items: ContentItem[];
}

interface LearningSidebarProps {
    courseId: string;
    sections: ContentSection[];
    onToggleSection: (sectionId: string) => void;
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}

const LearningSidebar: FC<LearningSidebarProps> = ({
    courseId,
    sections,
    onToggleSection,
    activeTab,
    setActiveTab
}) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const tabs = [
        { id: "content", label: "Content" },
        { id: "discussion", label: "Discussion" },
        { id: "file", label: "File" }
    ];

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const sidebarContent = (
        <>
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`flex-1 py-4 text-sm font-medium ${activeTab === tab.id
                                ? "text-gray-800 border-b-2 border-gray-800"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
            </div>

            {/* Course Content */}
            <div className="flex-grow overflow-y-auto">
                {activeTab === "content" && (
                    <div className="px-4 py-2">
                        {/* Sections */}
                        {sections.map((section) => (
                            <div key={section.id} className="mb-4">
                                <button
                                    className="flex items-center w-full text-left py-2"
                                    onClick={() => onToggleSection(section.id)}
                                >
                                    {section.isInProgress ? (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        </div>
                                    ) : section.isCompleted ? (
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    ) : (
                                        <CircleIcon className="h-5 w-5 text-gray-300 mr-3" />
                                    )}

                                    <span className="text-sm font-medium flex-grow">{section.title}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-gray-500 transition-transform ${section.isExpanded ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {section.isExpanded && (
                                    <div className="ml-8 space-y-2 mt-2">
                                        {section.items.map((item) => (
                                            <Link
                                                href={`/learning/course/${courseId}/${section.id}/${item.id}`}
                                                key={item.id}
                                                onClick={() => setIsMobileSidebarOpen(false)}
                                            >
                                                <div
                                                    className={`flex items-center py-2 pl-2 rounded-md ${item.isCurrent ? 'bg-gray-100' : ''
                                                        }`}
                                                >
                                                    {item.isCompleted ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                                    ) : item.isCurrent ? (
                                                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center mr-3">
                                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                        </div>
                                                    ) : (
                                                        <CircleIcon className="h-5 w-5 text-gray-300 mr-3" />
                                                    )}
                                                    <span className={`text-sm ${item.isCurrent ? 'font-medium' : ''}`}>
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="lg:hidden fixed bottom-24 right-6 z-30 bg-gray-800 text-white p-3 rounded-full shadow-lg"
                onClick={toggleMobileSidebar}
            >
                {isMobileSidebarOpen ?
                    <X className="h-6 w-6" /> :
                    <Menu className="h-6 w-6" />
                }
            </button>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex h-full flex-col border-l border-gray-200 w-80 bg-white">
                {sidebarContent}
            </div>

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed inset-y-0 right-0 transform z-20 w-full sm:w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="font-semibold">Course Content</h2>
                        <button onClick={toggleMobileSidebar}>
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                    {sidebarContent}
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobileSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={toggleMobileSidebar}
                ></div>
            )}
        </>
    );
};

export default LearningSidebar;