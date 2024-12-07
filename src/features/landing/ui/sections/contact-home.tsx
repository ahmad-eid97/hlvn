"use client";

import ApiClient from "@/core/api-client";
import { message } from "antd";
import { useState } from "react";
type FormErrors = {
    name?: string;
    email?: string;
    organization_name?: string;
    description?: string;
};

function ContactHome() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization_name: "",
        description: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = (): FormErrors => {
        let formErrors: FormErrors = {};
        if (!formData.name) {
            formErrors.name = "Name is required";
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Please enter a valid email address";
        }

        if (!formData.organization_name) {
            formErrors.organization_name = "Organization name is required";
        }
        if (!formData.description) {
            formErrors.description = "Description is required";
        }
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            setIsLoading(true);
            const response = await ApiClient.post("/contact-us/send-request", formData);
            message.success("Message sent successfully");
            setFormData({
              name: "",
              email: "",
              organization_name: "",
              description: "",
          })
        } catch (error) {
            message.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="box contactHome">
            <div className="w50vw textContact">
                <span>Contact</span>
                <h1>Get in touch with us</h1>
                <p>Leave a message and we will contact you back.</p>
                <a href="mailto:info@masteruix.com" target="_blank">
                    <div className="mailInfo">
                        <span>Send us an email</span>
                        <span>info@masteruix.com</span>
                    </div>
                </a>
            </div>
            <div className="w50vw">
                <form className="homeForm" onSubmit={handleSubmit}>
                    <div className="input">
                        <span>Name *</span>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="twoIn">
                        <div className="input">
                            <span>Email *</span>
                            <input type="text" name="email" value={formData.email} onChange={handleChange} />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="input">
                            <span>Organization name</span>
                            <input type="text" name="organization_name" value={formData.organization_name} onChange={handleChange} />
                            {errors.name && <p className="error">{errors.organization_name}</p>}
                        </div>
                    </div>
                    <div className="input">
                        <span>How can we help  *</span>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                        {errors.name && <p className="error">{errors.description}</p>}
                    </div>
                    <div className="checkbox">
                        <label htmlFor="c1">
                            <input type="checkbox" id="c1" />
                            Dolor porttitor accumsan <a href="##">aliquam ornare</a>
                        </label>
                    </div>
                    <button className="submitBtn" type="submit">
                        {isLoading ? <span className="loader"></span> : "Send message"}
                    </button>
                    <div className="linksC">
                        Praesent in mauris eu tortor porttitor accumsan <a href="##">aliquam ornare</a> wisi eu metus.
                        <a href="##">Lorem ipsum dolor</a> tortor porttitor accumsan aliquam.
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactHome;
