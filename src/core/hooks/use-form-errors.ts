import { useEffect } from "react";

export default function useFormErrors(errors: Record<string, string[]>, form: any) {
    return useEffect(() => {
        const errorsEntries = Object.entries(errors ?? {});
        if (errorsEntries.length > 0) {
            form.setFields(
                errorsEntries.map(([name, val]) => ({
                    name: name.split(".").map((n) => (isNaN(Number(n)) ? n : Number(n))),
                    errors: val,
                }))
            );
        }
    }, [errors, form]);
}
