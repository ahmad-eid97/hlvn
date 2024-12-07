"use client";

import React, { useEffect, useRef, useState } from "react";
import CostFormHeader from "@features/cost-calculator/ui/components/cost-form-header";
import CostTitleGroup from "@features/cost-calculator/ui/components/cost-title-group";
import CostFormGroup from "@features/cost-calculator/ui/components/cost-form-group";
import { Form, FormHooks, Input, Radio, Select } from "@components/form";
import FooterActions from "@components/footer-actions";
import Button from "../../../../../core/components/form/button";
import useFormErrors from "@core/hooks/use-form-errors";
import CostCalculationHelpData from "@features/cost-calculator/domain/models/cost-calculation-help-data";
import CostInputWithOptions from "@features/cost-calculator/ui/components/cost-input-with-options";
import { Alternative } from "@features/cost-calculator/domain/models/cost-calculation-result";
import { FormInstance, message } from "antd";
import ApiClient from "@/core/api-client";

type CostFormProps = {
    onSave?: (values: any) => void;
    onCalculate?: (values: any) => void;
    onEdit?: (values: any) => void;
    errors?: Record<string, string[]>;
    loading?: boolean;
    helpData?: CostCalculationHelpData;
    initialResult?: Alternative[];
    initialData?: [];
    isEdit?: boolean;
    activeAlternative?: any;
};

const DrugDirectSection = ({
    form,
    baseName,
    helpData,
    isEdit,
    activeAlternative,
}: {
    form: FormInstance;
    baseName: any[];
    helpData?: CostCalculationHelpData;
    isEdit?: boolean;
    activeAlternative?: any;
}) => {

    const pricePer = FormHooks.useWatch([...baseName, "price_type"], form);


    return (
        <div className="form-container-3 -ms-[28px]">
            <div className="ps-[28px]">
                <Select
                    label="Drug administration regimen"
                    name={[...baseName, "drug_administration_regimen"]}
                    required
                    placeholder={"choose regimen"}
                    options={[
                        {
                            value: "Main Course of Treatment",
                            label: "Main Course of Treatment",
                        },
                        {
                            value: "Loading",
                            label: "Loading",
                        },
                        {
                            value: "Maintenance",
                            label: "Maintenance",
                        },
                    ]}
                />
            </div>
            <div className="ps-[28px]">
                <Select
                    className="price_type"
                    label="Price per"
                    name={[...baseName, "price_type"]}
                    required
                    placeholder={"Price per"}
                    options={[
                        {
                            value: "picks",
                            label: "Picks",
                        },
                        {
                            value: "units",
                            label: "Units",
                        },
                    ]}
                />
            </div>
            <div className="ps-[28px]">
                <Input name={[...baseName, "drug_trade_name"]} label="Drug trade name" type="text" required />
            </div>
            <div className="ps-[28px]">
                <Input name={[...baseName, "packs_units_dose"]} label="Pack/Unit dose" type="number" required min={1} />
            </div>
            <div className="ps-[28px]">
                <CostInputWithOptions
                    name={[...baseName, "packs_units"]}
                    label="Number of packs/units"
                    required
                    isTwo={true}
                    pricePer={pricePer}
                    options={[
                        {
                            key: -1,
                            value: JSON.stringify({ id: null, packs_units_dose: null }),
                            label: "Enter value manually",
                        },
                        ...(helpData?.["quantity_calculator"]?.map((item, i) => ({
                            key: i,
                            value: JSON.stringify(item),
                            label: `${item.calculator_name} (${pricePer === "units"
                                ? item.results.required_units_per_regimen_or_year_per_patient_value
                                : item.results.required_packs_per_regimen_or_year_per_patient
                                })`,
                        })) ?? []),
                    ]}
                    link={{
                        label: "Go to Quantity Calculator",
                        href: "/quantity-calculator",
                    }}
                    infoMessage="You can enter the number of packs/units, choose from previous results or calculate new"
                />
            </div>

            <div className="ps-[28px]">
                <Input name={[...baseName, "price"]} label="Price" type="number" required min={1} />
            </div>
        </div>
    );
};

function CostForm({
    initialResult,
    onCalculate,
    errors,
    loading,
    helpData,
    isEdit,
    onEdit,
    initialData,
}: CostFormProps) {
    const finalValues = useRef<any>(null);
    const selectedIndex = useRef<number>(0);
    const [currentAction, setCurrentAction] = useState<"submit" | "save" | "edit" | null>(null);
    const [innerLoading, setInnerLoading] = useState(false);
    const [currentAlternativeIndex, setCurrentAlternativeIndex] = useState(0);
    const currentAlternativeName = ["alternatives", currentAlternativeIndex];
    const [form] = FormHooks.useForm();
    const numberOfAlternatives = FormHooks.useWatch("number_alternatives", form);
    const [savedIndexes, setSavedIndexes] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (!isEdit) {
            form.setFieldsValue({
                number_alternatives: 1,
            });
        }
    }, []);
    const [indexValues, setIndexValues] = useState<any>([]);
    useEffect(() => {
        if (finalValues.current) {
            setIndexValues(finalValues.current.alternatives);
        }
    }, [selectedIndex.current]);

    useEffect(() => {
        if (initialResult) {
            form.setFieldsValue({
                number_alternatives: initialResult.length,
                alternatives: initialResult,
            });
            finalValues.current = initialResult;
        }
    }, [form, initialResult]);

    useFormErrors(errors ?? {}, form);

    const onFinish = async (values) => {
        // Ensure finalValues.current is initialized
        if (!finalValues.current) finalValues.current = {};

        // Ensure alternatives is an array and initialized within finalValues.current
        if (!Array.isArray(finalValues.current.alternatives)) {
            finalValues.current.alternatives = [];
        }

        // Add form inputs to finalValues.current
        const finalData = {
            ...finalValues.current,
            calculator_name: values.calculator_name,
            currency: values.currency,
            type_calculator: values.type_calculator,
            number_alternatives: values.number_alternatives,
        };

        // Update the current alternative index
        if (finalData.alternatives.length <= currentAlternativeIndex) {
            // Extend the alternatives array if needed
            while (finalData.alternatives.length <= currentAlternativeIndex) {
                finalData.alternatives.push({});
            }
        }

        // Set the alternative values in finalData
        finalData.alternatives[currentAlternativeIndex] = values.alternatives[currentAlternativeIndex];

        // Track the saved index
        setSavedIndexes((prev) => ({ ...prev, [currentAlternativeIndex]: true }));

        // Check if any alternative is missing data
        if (selectedIndex.current === -1) {
            let isValid = true;

            for (let i = 0; i < numberOfAlternatives; i++) {
                if (!finalData.alternatives[i]) {
                    setCurrentAlternativeIndex(i);
                    setTimeout(() => {
                        form.submit(); // Retry form submission
                    }, 1500);
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                // Process alternatives and update them
                finalData.alternatives.forEach((alternative, index) => {
                    const converted = JSON.parse(alternative.patient || "{}"); // Ensure safe parsing
                    finalData.alternatives[index] = {
                        ...finalData.alternatives[index],
                        number_patients: converted.num_patient,
                        population_id: converted.id,
                        population_type: converted.type,
                    };

                    // Process drug_directs inside each alternative
                    finalData.alternatives[index].drug_directs?.forEach((drug, drugIndex) => {
                        const parsed = JSON.parse(drug.packs_units || "{}"); // Ensure valid JSON

                        finalData.alternatives[index].drug_directs[drugIndex] = {
                            ...finalData.alternatives[index].drug_directs[drugIndex],
                            quantity_id: parsed.id || drug.quantity_id,
                            number_of_packs_units: parsed.number_of_packs_units || drug.number_of_packs_units,
                        };
                    });
                });

                if (currentAction === "save") {
                    try {
                        const response = await ApiClient.post("/cost-calc/save-draft", finalData);
                        message.success("Saved successfully");
                    } catch (error) {
                        message.error("Error occurred, please fill all inputs and try again");
                    }
                } else if (currentAction === "submit") {
                    onCalculate ? onCalculate(finalData) : null;
                } else {
                    const idInputElement = document.getElementById("idInput") as HTMLInputElement;
                    if (!idInputElement || !idInputElement.value) {
                        console.error("ID input element not found or has no value");
                    }
                    try {
                        const response = await ApiClient.put(
                            `/cost-calc/update-calculate/${idInputElement.value}`,
                            finalData
                        );
                        message.success("Updated successfully");
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } else {
            setCurrentAlternativeIndex(selectedIndex.current); // Update to the previously selected alternative index
        }
    };


    const handleOnChange = (value: number) => {
        selectedIndex.current = value;
        form.submit();
    };


    const handleSubmit = (action) => {
        setInnerLoading(true);

        const submit = new Promise((resolve) => {
            setTimeout(() => {
                selectedIndex.current = -1;
                form.submit();
                resolve(true);
            }, 1000);
        });

        setCurrentAction(action);

        submit.then(() => {
            setInnerLoading(false); // Stop loading after submission
        });
    };


    return (
        <div className="card max-w-[1082px] p-4 mx-auto">
            <Form form={form} onFinish={onFinish} className=" flex flex-col gap-4">
                <CostFormHeader
                    currentAlternativeIndex={currentAlternativeIndex}
                    numberOfAlternatives={numberOfAlternatives}
                    savedIndexes={savedIndexes}
                    onChange={handleOnChange}
                    helpData={initialData ? initialData : []}
                    isEdit={isEdit ? isEdit : false}
                />
                <CostTitleGroup title="Drug direct cost per patient">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "drug_directs"]}
                        isList
                        isEdit={isEdit}
                        indexCount={form.getFieldsValue([...currentAlternativeName, "drug_directs"])?.alternatives?.[currentAlternativeIndex]?.drug_directs?.length || 1}
                        renderItems={({ baseName }) => (
                            <DrugDirectSection
                                form={form}
                                baseName={baseName}
                                helpData={helpData}
                                activeAlternative={selectedIndex.current}
                                isEdit={isEdit ? isEdit : false}
                            />
                        )}
                    />
                </CostTitleGroup>
                <CostTitleGroup title="Create/Apply Patient journey cost on patient group">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "patient"]}
                        renderItems={() => {
                            return (
                                <div className="form-container-2">
                                    <CostInputWithOptions
                                        name={[...currentAlternativeName, "patient"]}
                                        label="Number of patients"
                                        required
                                        options={[
                                            {
                                                key: -1,
                                                value: JSON.stringify({ id: null, num_patient: null, type: null }),
                                                label: "Enter value manually",
                                            },
                                            ...(helpData?.["population_calculator"]?.map((item, i) => ({
                                                key: i,
                                                value: JSON.stringify(item),
                                                label: `${item.name} (${item.num_patient})`,
                                            })) ?? []),
                                        ]}
                                        link={{
                                            label: "Go to Population Calculator",
                                            href: "/population-calculator",
                                        }}
                                        infoMessage="You can enter the number of patients, choose from previous results or calculate new"
                                    />
                                </div>
                            );
                        }}
                    />
                </CostTitleGroup>
                <CostTitleGroup title="Non drug patient journey">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "labs"]}
                        indexCount={form.getFieldsValue([...currentAlternativeName, "labs"])?.alternatives?.[currentAlternativeIndex]?.labs?.length || 1}
                        isList
                        renderItems={({ baseName }) => (
                            <div className="form-container-2">
                                <Input name={[...baseName, "lab"]} label="Lab" />
                                <Input
                                    name={[...baseName, "frequency_per_year"]}
                                    label="Frequency per Year"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "cost_per_item"]}
                                    label="Cost per Item"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "occurance"]}
                                    label="% Occurence"
                                    placeholder="100"
                                    type="number"
                                    min={1}
                                    max={100}
                                />
                            </div>
                        )}
                    />
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "radiologies"]}
                        indexCount={form.getFieldsValue([...currentAlternativeName, "radiologies"])?.alternatives?.[currentAlternativeIndex]?.radiologies?.length || 1}
                        isList
                        renderItems={({ baseName }) => (
                            <div className="form-container-2">
                                <Input name={[...baseName, "radiology"]} label="Radiology" />
                                <Input
                                    name={[...baseName, "frequency_per_year"]}
                                    label="Frequency per Year"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "cost_per_item"]}
                                    label="Cost per Item"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "occurance"]}
                                    label="% Occurence"
                                    placeholder="100"
                                    type="number"
                                    min={1}
                                    max={100}
                                />
                            </div>
                        )}
                    />
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "other_investigations"]}
                        indexCount={form.getFieldsValue([...currentAlternativeName, "other_investigations"])?.alternatives?.[currentAlternativeIndex]?.other_investigations?.length || 1}
                        isList
                        renderItems={({ baseName }) => (
                            <div className="form-container-2">
                                <Input
                                    name={[...baseName, "other_investigation"]}
                                    label="Other investigation/Diagnostic procedures"
                                />
                                <Input
                                    name={[...baseName, "frequency_per_year"]}
                                    label="Frequency per Year"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "cost_per_item"]}
                                    label="Cost per Item"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "occurance"]}
                                    label="% Occurence"
                                    placeholder="100"
                                    type="number"
                                    min={1}
                                    max={100}
                                />
                            </div>
                        )}
                    />
                </CostTitleGroup>
                <CostTitleGroup title="Hospital services">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "hospital_services"]}
                        renderItems={({ baseName }) => (
                            <div className="form-container-2">
                                <Input name={[...baseName, "item_name"]} label="Item name" />
                                <Input
                                    name={[...baseName, "frequency_per_year"]}
                                    label="Frequency"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "cost_per_item"]}
                                    label="Cost per Item"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "occurance"]}
                                    label="% Occurence"
                                    placeholder="100"
                                    type="number"
                                    min={1}
                                    max={100}
                                />
                            </div>
                        )}
                    />
                </CostTitleGroup>
                <CostTitleGroup title="Medical supplies not included in above services cost">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "medical_supplies"]}
                        indexCount={form.getFieldsValue([...currentAlternativeName, "medical_supplies"])?.alternatives?.[currentAlternativeIndex]?.medical_supplies?.length || 1}
                        isList
                        renderItems={({ baseName }) => (
                            <div className="form-container-3">
                                <Input name={[...baseName, "name_of_medical_supply"]} label="Name of medical supply" />
                                <Input
                                    name={[...baseName, "quantity_needed"]}
                                    label="Quantity needed"
                                    type="number"
                                    min={1}
                                />
                                <Input name={[...baseName, "unit_price"]} label="Unit price" type="number" min={1} />
                            </div>
                        )}
                    />
                </CostTitleGroup>
                <CostTitleGroup title="Other medical staff">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "other_medical_staffs"]}
                        indexCount={form.getFieldsValue([...currentAlternativeName, "other_medical_staffs"])?.alternatives?.[currentAlternativeIndex]?.other_medical_staffs?.length || 1}
                        isList
                        renderItems={({ baseName }) => (
                            <div className="form-container-2">
                                <Input name={[...baseName, "item_name"]} label="Item name" />
                                <Input name={[...baseName, "level"]} label="Seniority level" />
                                <Input
                                    name={[...baseName, "number_of_item_needed"]}
                                    label="Number of times needed"
                                    type="number"
                                    min={1}
                                />
                                <Input
                                    name={[...baseName, "fees_per_one_item"]}
                                    label="Fees per one time"
                                    type="number"
                                    min={1}
                                />
                            </div>
                        )}
                    />
                </CostTitleGroup>
                <CostTitleGroup title="Other bulk cost for patient group">
                    <CostFormGroup
                        form={form}
                        initialResult={initialResult}
                        name={[...currentAlternativeName, "other_bulk"]}
                        renderItems={() => (
                            <div className="form-container-2">
                                <Input
                                    name={[...currentAlternativeName, "other_bulk", "item_name"]}
                                    label="Item name"
                                />
                                <Input
                                    name={[...currentAlternativeName, "other_bulk", "description"]}
                                    label="Description"
                                />
                                <Input
                                    name={[...currentAlternativeName, "other_bulk", "cost_per_item"]}
                                    label="Cost per item"
                                    type="number"
                                    min={1}
                                />
                            </div>
                        )}
                    />
                </CostTitleGroup>
                <FooterActions
                    secondaryActions={
                        isEdit ? (
                            <></>
                        ) : (
                            <>
                                <Button
                                    onClick={() => form.resetFields()}
                                    htmlType="reset"
                                    type="default"
                                    size="small"
                                    disabled={loading}>
                                    Reset
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleSubmit("save");
                                    }}
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
                                loading={(innerLoading || loading) && currentAction === "edit"}
                                disabled={(innerLoading || loading) && currentAction !== "edit"}
                                onClick={() => {
                                    handleSubmit("edit");
                                }}>
                                Edit
                            </Button>
                        ) : (
                            <Button
                                loading={(innerLoading || loading) && currentAction === "submit"}
                                disabled={(innerLoading || loading) && currentAction !== "submit"}
                                onClick={() => { handleSubmit('submit') }}>
                                Calculate
                            </Button>
                        )
                    }
                />
            </Form>
        </div>
    );
}

export default CostForm;
