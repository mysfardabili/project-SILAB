interface ActiveFilters {
    types: string[];
    tags: string[];
    status: "all" | "not-started" | "in-progress" | "complete";
}

interface ActiveFilterChipsProps {
    activeFilters: ActiveFilters;
    toggleTypeFilter: (type: string) => void;
    toggleTagFilter: (tag: string) => void;
    setStatusFilter: (status: "all" | "not-started" | "in-progress" | "complete") => void;
    clearFilters: () => void;
}

interface ActiveFilters {
    types: string[];
    tags: string[];
    status: "all" | "not-started" | "in-progress" | "complete";
}

interface DesktopFilterPanelProps {
    activeFilters: ActiveFilters;
    materialTypes: string[];
    allTags: string[];
    toggleTypeFilter: (type: string) => void;
    toggleTagFilter: (tag: string) => void;
    setStatusFilter: (status: "all" | "not-started" | "in-progress" | "complete") => void;
    clearFilters: () => void;
}

interface FilterButtonProps {
    activeFilterCount: number;
    onClick: () => void;
}

interface ActiveFilters {
    types: string[];
    tags: string[];
    status: "all" | "not-started" | "in-progress" | "complete";
}

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    activeFilters: ActiveFilters;
    materialTypes: string[];
    allTags: string[];
    toggleTypeFilter: (type: string) => void;
    toggleTagFilter: (tag: string) => void;
    setStatusFilter: (status: "all" | "not-started" | "in-progress" | "complete") => void;
    clearFilters: () => void;
}

interface SearchBarProps {
    onSearch: (query: string) => void;
}

interface SortOption {
  value: string;
  label: string;
}