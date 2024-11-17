import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ItameCard from "../components/ItameCard";
import ItemModal from "../components/ItemModal";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({ en: "ALL", ar: "الكل" }); // Default to "All"
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch("/menu.json");
                const data = await response.json();
                setMenu(data);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        };

        fetchMenu();
    }, []);

    // Create a set for unique categories
    const categoriesSet = new Set(menu.map(item => JSON.stringify(item.category)));
    const categories = Array.from(categoriesSet).map(category => JSON.parse(category));

    // Add the "All" category to the list of categories
    const allCategory = { en: "ALL", ar: "الكل" };
    const allCategories = [allCategory, ...categories]; // Include "All" at the beginning

    const groupedItems = menu.reduce((acc, item) => {
        const category = item.category.en || "Others";
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev); // Toggle dropdown state
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // Set both names
        setDropdownOpen(false); // Close dropdown when a category is selected
    };

    return (
        <div className="flex flex-col items-center mb-4 min-h-screen bg-[#0b0b0b] text-[#eaeaea]">
            <Banner />

            {isMobile ? (
                <div className="relative w-full flex justify-center my-4">
                    <button
                        onClick={toggleDropdown}
                        className="py-3 px-6 font-medium text-[#BB8506] bg-[#1f1f1f] flex items-center justify-between w-[90%] rounded-lg shadow-md"
                    >
                        {/* Display default category with Arabic and English names together */}
                        {selectedCategory.ar} <span className="ml-1">({selectedCategory.en})</span>
                        <span className="ml-2">&#x25BC;</span>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute top-full mt-2 bg-[#1f1f1f] w-[90%] flex flex-col items-center shadow-lg rounded-lg z-10">
                            {allCategories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategorySelect(category)} // Select category
                                    className={`w-full text-left px-4 py-2 font-medium text-[#eaeaea] hover:bg-[#BB8506] hover:text-white transition-colors duration-200 rounded-lg ${
                                        selectedCategory.en === category.en ? "bg-[#BB8506] text-white" : ""
                                    }`}
                                >
                                    {/* Display category with Arabic and English together */}
                                    {category.ar} <span className="ml-1">({category.en})</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-1 my-2 w-full">
                    {allCategories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategorySelect(category)} // Select category
                            className={`py-3 px-6 text-lg font-medium transition-colors duration-200 ease-in-out rounded-lg ${
                                selectedCategory.en === category.en
                                    ? "bg-[#BB8506] text-white"
                                    : "bg-[#1f1f1f] text-[#eaeaea]"
                            }`}
                        >
                            {/* Display category with Arabic and English together */}
                            {category.ar} <span className="ml-1">({category.en})</span>
                        </button>
                    ))}
                </div>
            )}

            <div className="w-[80%] mx-auto">
                {selectedCategory.en === "ALL" ? (
                    Object.entries(groupedItems).map(([category, items]) => (
                        <div key={category} className="w-full my-8">
                            <h2 className="text-2xl font-semibold text-[#BB8506] mb-4 text-center underline">
                                {items[0]?.category?.ar} <br />
                                <span className="italic text-[#adacac]">({items[0]?.category?.en})</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {items.map((item) => (
                                    <div key={item.id} onClick={() => handleItemClick(item)}>
                                        <ItameCard item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full my-8">
                        <h2 className="text-2xl font-semibold text-[#BB8506] mb-4 text-center underline">
                            {selectedCategory.ar} <br />
                            <span className="italic text-[#adacac]">({selectedCategory.en})</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {groupedItems[selectedCategory.en] && groupedItems[selectedCategory.en].length > 0 ? (
                                groupedItems[selectedCategory.en].map((item) => (
                                    <div key={item.id} onClick={() => handleItemClick(item)}>
                                        <ItameCard item={item} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-[#eaeaea]">No items found in this category.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <ItemModal
                    item={selectedItem}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Menu;
