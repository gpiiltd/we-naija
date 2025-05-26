import Typography from "../../Components/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypographyVariant } from "../../Components/types";
import LandingBg from "../../Assets/svgImages/landing-bg.svg";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { socialsFooter } from "../../utils/selectOptions";
import * as z from "zod";
import emailjs from "emailjs-com";
import Icon from "../../Assets/SvgImagesAndIcons";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

// 1. Schema Definition
const contactSchema = z.object({
  fName: z.string().min(1, "First Name is required"),
  lName: z.string().min(1, "Last Name is required"),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactView = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. useForm Hook
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange", // Better for live validation
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  // const onSubmit = (data: ContactFormData) => {
  //   console.log("Form submitted", data); // 👈 Add this
  //   if (data.honeypot) {
  //     console.warn("Spam detected!");
  //     return;
  //   }

  //   // ... send email
  // };

  const onSubmit = (data: ContactFormData) => {
    if (data.honeypot) {
      console.warn("Spam detected!");
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: data.fName + " " + data.lName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    emailjs
      .send(
        "service_9h7ew35",
        "template_cptumgi",
        templateParams,
        "lBDWzU4BYMAvOcsls",
      )
      .then(
        (response) => {
          console.log("Success:", response);
          toast.success("Message sent successfully!");
          methods.reset();
          setIsSubmitting(false);
        },
        (error) => {
          console.error("Error:", error);
          toast.error("There's been an error. Please, try again.");
          setIsSubmitting(false);
        },
      );
  };

  const onInvalid = (errors: FieldErrors<ContactFormData>) => {
    console.warn("Form validation errors:", errors);
    toast.error("Please fix the errors before submitting.");
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-center items-center bg-white p-10 mt-16 md:mt-0 lg:mt-0">
        <Typography
          variant={TypographyVariant.TITLE}
          className="text-4xl font-bold text-gray-800 mb-2 font-raleway"
        >
          CONTACT US
        </Typography>
        <Typography
          variant={TypographyVariant.SMALL}
          className="max-w-md text-[#5C5C5C] font-raleway mb-8 mt-4 font-light text-center text"
        >
          Have any question or feedback, feel free to reach out to us. We are
          always available to help.
        </Typography>

        {/* contact view section */}
        <div className="bg-white w-full flex flex-col md:flex-row max-w-5xl">
          {/* Left Section */}
          <div className="bg-green-800 text-white p-6 md:p-8 relative w-full basis-1/3">
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${LandingBg})`,
                zIndex: 0,
              }}
            ></div>
            <div className="flex flex-col justify-between h-full py-2 ">
              <div className="relative z-10">
                <Typography
                  variant={TypographyVariant.SUBTITLE}
                  className="font-bold mb-2 font-raleway"
                >
                  Contact Information
                </Typography>
                <Typography
                  variant={TypographyVariant.NORMAL}
                  className="font-light mb-6 text-sm text-[#E5E7EB] font-raleway"
                >
                  Fill up the form and we’ll get back to you in few hours.
                </Typography>
                <div className="space-y-4 mb-6 md:mt-10">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      <IoCall />
                    </span>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="font-light text-[#E5E7EB] font-raleway"
                    >
                      +234 ---- --- ----
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      <MdEmail />
                    </span>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="font-light text-[#E5E7EB] font-raleway"
                    >
                      info@nssf.ng
                    </Typography>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      <IoLocation />
                    </span>
                    <Typography
                      variant={TypographyVariant.SMALL}
                      className="font-light text-[#E5E7EB] font-raleway"
                    >
                      Lake Point Towers, Banana Island, Lagos, 106104, Nigeria.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-6 relative z-10">
                <ul className="flex gap-5 flex-wrap">
                  {socialsFooter.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                      >
                        <Icon type={item.iconUrl} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right section (Form) */}
          <div className="mt-8 md:p-8 w-full basis-2/3 font-raleway">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    required
                    label="First Name"
                    type="text"
                    {...register("fName")}
                    error={errors?.fName?.message}
                  />
                  <InputField
                    required
                    label="Last Name"
                    type="text"
                    {...register("lName")}
                    error={errors?.lName?.message}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    required
                    label="Email Address"
                    type="email"
                    {...register("email")}
                    error={errors?.email?.message}
                  />
                  <InputField
                    required
                    label="Phone Number"
                    type="tel"
                    {...register("phone")}
                    error={errors?.phone?.message}
                  />
                </div>

                <TextAreaField
                  label="Message"
                  rows={4}
                  {...register("message")}
                  error={errors?.message?.message}
                />

                <input
                  type="text"
                  {...register("honeypot")}
                  className="hidden"
                />

                <div className="w-[15rem] mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[45px] p-2 rounded-lg transition bg-[#007A61] text-white disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactView;

// Input Component

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <input
          ref={ref} // 👈 forward the ref
          {...props} // 👈 spread all register props here
          className="block w-full rounded-md bg-blue-50 px-3 py-2 text-sm shadow-sm"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  },
);

type Propss = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, Propss>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        <textarea
          ref={ref} // ✅ necessary for react-hook-form
          {...props} // ✅ includes `register` props like name, onChange, etc.
          className="block w-full rounded-md bg-blue-50 px-3 py-2 text-sm shadow-sm"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  },
);

//  <Formik
//             initialValues={initialValues}
//             validateOnChange={true}
//             validateOnBlur={true}
//             onSubmit={(values) => {
//               console.log("Form values:", values);
//             }}
//             validationSchema={validationSchema}
//           >
//             {({ isValid, dirty, setFieldValue, setFieldTouched }) => (
//               <Form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <InputField
//                     placeHolder="First Name"
//                     type="text"
//                     focusStyle="green"
//                     label="First Name"
//                     name="fName"
//                      {...register("fName")}
//                     setFieldValue={setFieldValue}
//                     setFieldTouched={setFieldTouched}
//                   />
//                   <InputField
//                     placeHolder="Last Name"
//                     type="text"
//                     focusStyle="green"
//                     label="Last Name"
//                     name="lName"
//                     {...register("lName")}
//                     setFieldValue={setFieldValue}
//                     setFieldTouched={setFieldTouched}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <InputField
//                     placeHolder="Email address"
//                     type="text"
//                     focusStyle="green"
//                     label="Email address"
//                     helperText={errors?.email?.message}
//                     name="email"
//                      {...register("email")}
//                     setFieldValue={setFieldValue}
//                     setFieldTouched={setFieldTouched}
//                   />
//                   <InputField
//                     placeHolder="Phone Number"
//                     type="text"
//                     focusStyle="green"
//                     label="Phone Number"
//                      {...register("phone")}
//                     name="phone"
//                     setFieldValue={setFieldValue}
//                     setFieldTouched={setFieldTouched}
//                   />
//                 </div>
//                 {/* <TextArea
//                   placeHolder="Message"
//                   type="text"
//                   focusStyle="green"
//                   label="Message"
//                   name="message"
//                 /> */}

//                 <TextAreaField
//                   label={""}
//                   name="message"
//                   {...register("message")}
//                   placeHolder="Write message here..."
//                 />

//                 <input type="text" {...register("honeypot")} className="hidden" />

// <div className="w-[15rem] mt-8">
//   <Button
//     text="Send message"
//     active={isValid && dirty}
//     //active={true}
//     bg_color="#007A61"
//     text_color="white"
//     loading={false}
//     onClick={() => {}}
//   />
// </div>
//               </Form>
//             )}
//           </Formik>
