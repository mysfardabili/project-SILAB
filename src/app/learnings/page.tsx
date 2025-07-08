"use client";

import { useState, useEffect } from "react";
import LearningNavbar from "./components/navbar";
import LearningSidebar from "./components/sidebar";
import BottomNavbar from "./components/bottom-navbar";
import Editor from "@/components/editor/yoopta-editor";

// Define proper TypeScript interfaces
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

interface LearningContent {
    id: string;
    title: string;
    sections: ContentSection[];
    currentSection: string;
    currentChapter: string;
    currentTitle: string;
    currentSectionId: string;
    currentChapterId: string;
}

export default function LearningContentPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [learningContent, setLearningContent] = useState<LearningContent | null>(null);
    const [activeTab, setActiveTab] = useState<string>("content");
    const [prevChapter, setPrevChapter] = useState<{ sectionId: string; chapterId: string; title: string } | null>(null);
    const [nextChapter, setNextChapter] = useState<{ sectionId: string; chapterId: string; title: string } | null>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

    // Simulating API data fetch
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            await new Promise(resolve => setTimeout(resolve, 500));

            // Dummy data with currentSectionId and currentChapterId added
            const dummyData: LearningContent = {
                id: "usability-principles",
                title: "Heuristics: 10 Usability Principles To Improve UI Design",
                currentSectionId: "sec-1",
                currentChapterId: "ch-2",
                sections: [
                    {
                        id: "sec-1",
                        title: "Sec 1: Step by step usability principles",
                        isExpanded: true,
                        isInProgress: true,
                        items: [
                            { id: "ch-1", title: "Ch 1: Visibility of system status", isCompleted: true, isCurrent: false },
                            { id: "ch-2", title: "Ch 2: Match between system and the real world", isCurrent: true },
                            { id: "ch-3", title: "Ch 3: User control and freedom" },
                            { id: "ch-4", title: "Ch 4: Consistency and standards" }
                        ]
                    },
                    {
                        id: "sec-2",
                        title: "Sec 2: Conducting a heuristic evaluation",
                        isExpanded: false,
                        items: [
                            { id: "ch-5", title: "Ch 5: Error prevention" },
                            { id: "ch-6", title: "Ch 6: Recognition rather than recall" },
                            { id: "ch-7", title: "Ch 7: Flexibility and efficiency of use" }
                        ]
                    },
                    {
                        id: "sec-3",
                        title: "Sec 3: Final Thoughts on UI Heuristic",
                        isExpanded: false,
                        items: [
                            { id: "ch-8", title: "Ch 8: Aesthetic and minimalist design" },
                            { id: "ch-9", title: "Ch 9: Help users recognize, diagnose, and recover from errors" },
                            { id: "ch-10", title: "Ch 10: Help and documentation" }
                        ]
                    }
                ],
                currentSection: "Section 1",
                currentChapter: "Chapter 2 of 4",
                currentTitle: "Match between system and the real world"
            };

            setLearningContent(dummyData);
            setIsLoading(false);

            // Find previous and next chapters for navigation
            findAdjacentChapters(dummyData);
        };

        fetchData();
    }, []);

    // Function to find previous and next chapters for navigation
    const findAdjacentChapters = (content: LearningContent): void => {
        if (!content) return;

        let foundCurrent = false;
        let prevChapterData = null;
        let nextChapterData = null;

        // Flatten all chapters across sections for easier navigation
        const allChapters: { sectionId: string; sectionIndex: number; chapterId: string; chapterIndex: number; title: string }[] = [];

        content.sections.forEach((section, sectionIndex) => {
            section.items.forEach((chapter, chapterIndex) => {
                allChapters.push({
                    sectionId: section.id,
                    sectionIndex,
                    chapterId: chapter.id,
                    chapterIndex,
                    title: chapter.title
                });
            });
        });

        // Find current chapter index in flattened array
        const currentIndex = allChapters.findIndex(
            chapter => chapter.sectionId === content.currentSectionId && chapter.chapterId === content.currentChapterId
        );

        if (currentIndex > 0) {
            const prev = allChapters[currentIndex - 1];
            setPrevChapter({
                sectionId: prev.sectionId,
                chapterId: prev.chapterId,
                title: prev.title
            });
        } else {
            setPrevChapter(null);
        }

        if (currentIndex < allChapters.length - 1) {
            const next = allChapters[currentIndex + 1];
            setNextChapter({
                sectionId: next.sectionId,
                chapterId: next.chapterId,
                title: next.title
            });
        } else {
            setNextChapter(null);
        }
    };

    // Function to toggle section expansion
    const toggleSection = (sectionId: string): void => {
        if (!learningContent) return;

        setLearningContent(prevContent => {
            if (!prevContent) return null;

            return {
                ...prevContent,
                sections: prevContent.sections.map((section: ContentSection) =>
                    section.id === sectionId
                        ? { ...section, isExpanded: !section.isExpanded }
                        : section
                )
            };
        });
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading course content...</p>
            </div>
        );
    }

    // Safety check
    if (!learningContent) {
        return (
            <div className="flex flex-col h-screen items-center justify-center">
                <p className="text-red-600">Failed to load course content.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Top Navigation */}
            <LearningNavbar
                title={learningContent.title}
                type="page"
                onClose={() => {/* handle close action */ }}
            />

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Content Scrollable Area */}
                <div className="flex-1 overflow-y-auto pb-20">
                    <div className="p-4 sm:p-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Section and Chapter info */}
                            <div className="text-sm text-gray-500 mb-2">
                                {learningContent.currentSection} • {learningContent.currentChapter}
                            </div>
                            {/*Editor - Render the content  */}
                            <div>
                                <Editor />
                            </div>
                        </div>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 z-10">
                        <BottomNavbar
                            courseId={learningContent.id}
                            prevChapter={prevChapter}
                            nextChapter={nextChapter}
                        />
                    </div>
                </div>


                <LearningSidebar
                    courseId={learningContent.id}
                    sections={learningContent.sections}
                    onToggleSection={toggleSection}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
}