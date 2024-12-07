import React from "react";
import classNames from "classnames";

type FooterActionsProps = {
    primaryActions?: React.ReactNode;
    secondaryActions?: React.ReactNode;
};

function FooterActions({ primaryActions, secondaryActions }: FooterActionsProps) {
    return (
        <div
            className={classNames(
                "h-[72px] bg-surface border-t-[1px] border-tertiary fixed bottom-0 left-0 right-0 z-10 rounded-t-lg",
                "px-16 flex flex-row items-center justify-between gap-6",
                "[&>div]:flex [&>div]:flex-row [&>div]:gap-6"
            )}>
            <div>{secondaryActions}</div>
            <div>{primaryActions}</div>
        </div>
    );
}

export default FooterActions;
