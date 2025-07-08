"use client"

import { useState } from "react"
import { BookText, ChevronDown } from "lucide-react"
import clsx from "clsx"

type SiLabAccordionItem = {
    title: string
    content: string
    chapter: number
}

export default function SiLabAccordion({
    items,
}: {
    items: SiLabAccordionItem[]
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="border rounded-md">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border-b border-gray-200"
                >
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between p-4 text-left text-lg font-medium hover:bg-gray-50 transition"
                    >

                        <span className="text-sm">{item.title}</span>


                        <div className="flex gap-2 items-center">
                            <span className="text-sm border-r pe-2">{item.chapter} Chapter</span>
                            <ChevronDown
                                className={clsx(
                                    "h-5 w-5 transition-transform duration-300",
                                    openIndex === index && "rotate-180"
                                )}
                            />
                        </div>
                    </button>
                    <div
                        className={clsx(
                            "px-4 overflow-hidden transition-all duration-300 ease-in-out flex items-center gap-1",
                            openIndex === index ? "max-h-96 py-2" : "max-h-0"
                        )}
                    >
                        <BookText className="w-4 h-4 text-gray-600" />
                        <p className="text-gray-600 text-sm">{item.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
