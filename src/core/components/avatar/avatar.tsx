import React from "react";
import Image from "next/image";
import classNames from "classnames";

type AvatarProps = {
    src: string;
    alt?: string;
    className?: string;
    size: number;
};

function Avatar({ src, alt = "Avatar", className, size = 46 }: AvatarProps) {
    return (
        <Image
            className={classNames("rounded-full aspect-square", className)}
            src={src}
            alt={alt}
            width={size}
            height={size}
        />
    );
}

export default Avatar;
