"use client";
const Carouseldots = ({ currentSlide, goToSlide }: { currentSlide: number; goToSlide: (index: number) => void }) => {

    return (
        <div className="flex items-center absolute bottom-[240px] gap-[12px] ml-[36px]">
            <div
            onClick={() => goToSlide(0)}
                className={`bg-[#FFFFFF1A] w-[78px] h-[6px] cursor-pointer ${currentSlide === 0 ? "!bg-white" : ""}`}></div>
            <div
            onClick={() => goToSlide(1)}
                className={`bg-[#FFFFFF1A] w-[78px] h-[6px] cursor-pointer ${currentSlide === 1 ? "!bg-white" : ""}`}></div>
        </div>
    );
};

export default Carouseldots;
