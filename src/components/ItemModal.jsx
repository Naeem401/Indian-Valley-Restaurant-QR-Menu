import React from "react";

const ItemModal = ({ item, language, onClose }) => {
    if (!item) return null; // Return null if no item is passed

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-[#f8f8f8] mb-4">
                    {/* Display Arabic first and English second */}
                    <div className="text-center">
                        <h2 >{item.name.ar}</h2>
                        <h2>{item.name.en}</h2>
                    </div>
                </h2>
                <img 
                    src={item.image} 
                    alt={item.name.en} 
                    className="w-full h-48 object-cover mb-4 rounded-lg" 
                />
                
                <p className="text-[#eaeaea] mb-2">
                    {/* Display both descriptions with Arabic first */}
                    <div className="flex flex-col">
                        <span className="text-right">{item.description.ar}</span>
                        <span>{item.description.en}</span>
                    </div>
                </p>
                <p className="text-sm text-[#adacac]">
                    {/* Display calories only in English */}
                    <span>{`${item.calories} Calories`}</span>
                </p>

                <p className="text-lg font-bold text-[#BB8506] mb-2">
                    SR {item.price}
                </p>

                

                <button
                    onClick={onClose}
                    className="mt-4 bg-[#BB8506] text-white py-2 px-4 rounded transition duration-200 hover:bg-[#a47805]"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ItemModal;
