import React from "react";
import Image from "next/image";

function EmptyPane() {
    return (
        <div className="h-full flex flex-col justify-center px-6 pb-10">
            <Image
                className="max-w-[344px] w-full mb-[72px] mx-auto"
                src="/images/no-result-placeholder.svg"
                alt="No results yet placeholder"
                width="344"
                height="313"
            />
            <p className="text-orient-700 text-3xl font-semibold w-full text-center">No results yet</p>
        </div>
    );
}

export default EmptyPane;
