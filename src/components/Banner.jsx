import banner from '../assets/banner2.jpg';

const Banner = () => {
    return (
        <div className="relative">
            <img src={banner} alt="Banner" className="w-full h-auto" />
            <div className="bg-[#15151599] absolute inset-0 flex items-center justify-center text-center p-5">
                <div className="max-w-3xl p-4">
                    <h2 className="text-white text-3xl sm:text-5xl font-bold mb-4">
                        Our Menu
                    </h2>
                    <p className='text-center text-white italic'>Welcome To Indian Valley Restaurant 🙏, Where Authentic Indian Flavors Meet Warm Hospitality. Indulge In Traditional Delicacies Crafted With Love, Bringing The Taste Of India To You!</p>
                    <p className="text-white text-lg sm:text-xl font-semibold">
                        Would You Like Yo Try A Dish?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
