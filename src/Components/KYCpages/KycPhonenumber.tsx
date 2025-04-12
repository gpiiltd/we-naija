import React, { useEffect } from "react";
import { Button, Typography } from "@gpiiltd/gpi-ui-library";
import { TypographyVariant } from "../../Components/types";
import SkipButton from "./SkipButton";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../Components/Input/InputField";
import Icon from "../../Assets/SvgImagesAndIcons";
import { useNavigate } from "react-router-dom";
import KycHeader from "./KycHeader";
import { useDispatch, useSelector } from "react-redux";
import { triggerPhoneNumberVerification } from "../../redux/Services/user/UserServices";  
import { toast } from "react-toastify";
import { RootState } from "../../redux/Store/store";
import { setKycPhoneNumber, resetState } from "../../redux/Slices/user/userSlice";

const KycPhonenumber = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, message, email, loading } = useSelector(
    (state: RootState) => state.user
  );


  const handleProceed = (values: any) => {
    const phoneNumberWithCountryCode = `+234${values.phoneNumber}`;
    const payload = {
      mobile_number: phoneNumberWithCountryCode,
    };
    console.log("Proceed with phone number:", payload);
    dispatch(setKycPhoneNumber(phoneNumberWithCountryCode));
    dispatch(triggerPhoneNumberVerification(payload) as any);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!error && message) {
      // toast.success(message);
      toast.success("Otp has been sent to the provided phone number");
      setTimeout(() => {
        navigate("/kyc/enter-otp");
      }, 1000);
    }
    dispatch(resetState());
  }, [error, message, navigate, dispatch]);

  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .required("Phone number is required")
      .min(10, "Phone number must be 10 characters long")
      // .max(11, "Phone number must be at most 11 characters long")
      .typeError("Phone number must be a number"),
  });

  return (
    <>
      <KycHeader />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
        <div className="bg-white p-8 rounded-lg shadow-lg  lg:px-48 lg:py-36">
          <div className="flex items-center justify-center gap-4">
            <Icon type="mobile" className="w-10 h-10 mb-4" />

            <h1 className="text-center mb-4 text-xl  md:text-3xl">
              Validate Phone Number
            </h1>
          </div>
          <Typography
            variant={TypographyVariant.NORMAL}
            className="text-center mb-6 text-gray-500"
          >
            A 6-digit code will be sent via SMS to verify this number.
          </Typography>

          <Formik
            initialValues={initialValues}
            validateOnChange={true}
            validateOnBlur={true}
            // onSubmit={(values) => {
            //   console.log("Form values:", values);
            // }}
            onSubmit={handleProceed}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty, setFieldValue, setFieldTouched  }) => (
              <Form>
                <div className="flex items-start mb-8">
                  <div className=" flex items-center justify-center w-[40%] h-[58px]  -mr-1  border border-primary_color rounded-l-xl border-r-0">
                    <Icon type="nigerianflag" className="w-6 h-6 mr-4" />

                    <Typography
                      variant={TypographyVariant.NORMAL}
                      className="text-gray-500  "
                    >
                      +234
                    </Typography>
                  </div>
                  <InputField
                    placeHolder="Enter your phone number"
                    type="text"
                    focusStyle="green"
                    label="Phone number"
                    name="phoneNumber"
                    setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  />
                     
                </div>

                <Button
                  text="Proceed"
                  active={isValid && dirty}
                  bg_color="#007A61"
                  text_color="white"
                  loading={loading}
                  // onClick={handleProceed}
                />
              </Form>
            )}
          </Formik>
          <div className="flex pt-4 items-center justify-center">
            <SkipButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default KycPhonenumber;
