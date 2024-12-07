import React from "react";
import classNames from "classnames";
import { Button } from "@components/form";
import { CrossIcon, TickIcon } from "@icons";

type TierCardProps = {
    name: string;
    price: number;
    buttonText?: string;
    options: Array<{
        label: string;
        available: boolean;
    }>;
    recommended?: boolean;
};

function TierCard(props: TierCardProps) {
    return (
        <div
            className={classNames({
                "p-[3px] pb-[3.5px] pt-3 bg-orient-600 rounded-[11px]": props.recommended,
            })}>
            {props.recommended && (
                <p className="ms-[16px] mb-2.5 text-sm leading-[16px] text-white font-normal">RECOMMENDED</p>
            )}
            <div className="text-black border-[1px] border-border-primary rounded-lg px-4 py-[30px] bg-white">
                <p className="text-2xl font-medium mb-5">{props.name}</p>
                <p className="text-2xl font-semibold mb-5">
                    {props.price} EGP<span className="text-sm font-normal">/mo</span>
                </p>
                <Button className="w-full mb-5" type="primary" size="middle">
                    {props.buttonText ?? "Buy Now"}
                </Button>
                <ul className="flex flex-col gap-[18px]">
                    {props.options.map((option) => (
                        <li key={option.label} className="flex flex-row items-center gap-2">
                            {option.available ? <TickIcon /> : <CrossIcon />}
                            <span className="text-sm">{option.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TierCard;
