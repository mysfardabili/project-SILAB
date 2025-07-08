import { Search } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if (e.target.value === "") {
            onSearch("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex-grow md:flex-grow-0">
            <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="Search materials"
                className="w-full md:w-auto pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <button type="submit" className="sr-only">Search</button>
        </form>
    );
};

export default SearchBar;