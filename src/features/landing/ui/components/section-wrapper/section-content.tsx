import React from "react";
import classNames from "classnames";

type SectionWrapperProps = {
    className?: string;
    children?: React.ReactNode;
};

function SectionContent({ className, children }: SectionWrapperProps) {
    return <div className={classNames("min-h-screen 2xl:min-h-[500px] h-full w-full max-w-[1200px] mx-auto px20px py-20 flex items-center", className)}>{children}</div>;
}

export default SectionContent;
