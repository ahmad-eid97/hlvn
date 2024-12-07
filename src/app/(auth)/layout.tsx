import Carouesel from "@/features/auth/signup/ui/components/Carouesel";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen w-full">
            {children}
            <Carouesel />
        </div>
    );
}
