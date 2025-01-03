import React, { useEffect, useState } from "react";
import CalculationResultPane from "../calculation-result-pane";
import classNames from "classnames";
import FooterActions from "@/core/components/footer-actions";
import Button from "@/core/components/form/button";
import Form from "@/core/components/form/form";
import { FormInstance, message } from "antd";
import ApiClient from "@/core/api-client";

type CalculationPageContainerProps = {
    form?: FormInstance;
    title?: string;
    result?: any[];
    onCalculate?: (values: any) => void;
    onSave?: (values: any) => void;
    onReset?: () => void;
    onEdit?: (values: any) => void;
    loading?: boolean;
    renderResult?: ({ results }: { results: any[] }) => React.ReactNode;
    children: React.ReactNode;
    isEdit?: boolean;
};
type ErrorResponse = {
  response: {
    data: {
      message: string;
    };
  };
};




function CalculationPageContainer({
    form,
    title,
    result,
    children,
    onCalculate,
    onSave,
    onReset,
    onEdit,
    isEdit,
    renderResult,
    loading,
}: CalculationPageContainerProps) {
    const [currentAction, setCurrentAction] = useState<"submit" | "save" | null>(null);
    const [resultData, setResultData] = useState<any[]>(result || []); // Initialize with result or empty array
    const [isSubmit, setisSubmit] = useState(false); // Initialize with result or empty array

    useEffect(() => {
        if (!loading) setCurrentAction(null);
    }, [loading]);

    // Handle edit operation and update resultData state
const handleEdit = async (values) => {
  try {
      const idInputElement = document.getElementById("idInput") as HTMLInputElement;
      if (!idInputElement || !idInputElement.value) {
          console.error("ID input element not found or has no value");
          return;
      }

      const res = await ApiClient.put(`/quantity-calc/update-calculate/${idInputElement.value}`, values);
      message.success("Updated successfully!");

      const updatedData = Array.isArray(res.data.data)
          ? res.data.data
          : Object.entries(res.data.data || {}).map(([key, value]) => ({
                label: key,
                value,
            }));
      setisSubmit(true);
      setResultData(updatedData); // Ensure it's always an array
  } catch (error: unknown) {
      if ((error as ErrorResponse).response) {
          message.error((error as ErrorResponse).response.data.message || "Update failed");
      } else {
          message.error("Update failed due to an unknown error");
      }
  }
};

    return (
        <Form
            form={form}
            onFinish={(values) => {
                if (isEdit) {
                    handleEdit(values); // Handle edit and update result
                } else {
                    onCalculate?.(values); // Handle calculation if not in edit mode
                }
            }}
            className="flex flex-col md:flex-row gap-4 !pb-[30px]">
            <div
                className={classNames(
                    "flex-[2] flex flex-col gap-4 md:gap-6",
                    "[&>section]:card [&>section]:p-4 [&>section>h1]:text-lg [&>section>h1]:font-semibold [&>section>h1]:mb-5"
                )}>
                {children}
            </div>
            <CalculationResultPane
                className="flex-1 card px-3 pt-4 pb-2"
                title={title}
                results={isSubmit ? resultData : result} // Show updated results in edit mode
                renderResult={renderResult}
            />
            <FooterActions
                secondaryActions={
                    isEdit ? (
                        <></>
                    ) : (
                        <>
                            <Button onClick={onReset} htmlType="reset" type="default" size="small" disabled={loading}>
                                Reset
                            </Button>
                            <Button
                                onClick={
                                    onSave
                                        ? () => {
                                              setCurrentAction("save");
                                              onSave(form?.getFieldsValue());
                                          }
                                        : undefined
                                }
                                success
                                size="small"
                                loading={loading && currentAction === "save"}
                                disabled={loading && currentAction !== "save"}>
                                Save as a Draft
                            </Button>
                        </>
                    )
                }
                primaryActions={
                    isEdit ? (
                        <Button
                            htmlType="submit"
                            loading={loading && currentAction === "submit"}
                            disabled={loading && currentAction !== "submit"}>
                            Edit
                        </Button>
                    ) : (
                        <Button
                            htmlType="submit"
                            loading={loading && currentAction === "submit"}
                            disabled={loading && currentAction !== "submit"}>
                            Calculate
                        </Button>
                    )
                }
            />
        </Form>
    );
}

export default CalculationPageContainer;
