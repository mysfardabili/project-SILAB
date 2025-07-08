import { Button } from "@/components/ui/button"
import SiLabAccordion from "@/components/ui/si-lab-accordion"

const accordionData = [
  {
    title: "What is Next.js?",
    content: "Next.js is a React framework for production with features like routing, SSR, and API routes.",
    chapter: 8,
  },
  {
    title: "What is Tailwind CSS?",
    content: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
    chapter: 4,
  },
  {
    title: "Is this accordion accessible?",
    content: "It's pretty good, but you could improve it with ARIA attributes for full accessibility support.",
    chapter: 3,
  },
]

const CourseContentSection = () => {
  return (
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
  )
}

export default CourseContentSection
