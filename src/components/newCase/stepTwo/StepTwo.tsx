import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Input from "../../theme/input/Input";
// import InputContained from "../../theme/inputContained/InputContained";
import InputRadio from "../../theme/inputRadio/InputRadio";
import NextButton from "../../theme/nextButton/NextButton";
// import NewCaseSelect from "../../theme/select/newCaseSelect/NewCaseSelect";
import axiosConfig from "../../../config/axiosConfig";
import notification from "../../theme/utility/notification";
import { setLoading } from "../../../redux/slices/utilitySlice";
import InputDate from "../../theme/inputDate/InputDate";
import { useNavigate } from "react-router-dom";

type StepTwoProps = {
  newCaseData: any;
  setNewCaseData: any;
  updateNewCaseData: (name: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  yearList: { label: string; value: string }[];
  months: { label: string; value: string }[];
  days: { label: string; value: string }[];
  param: string | undefined;
  toggleModal?: () => void;
  reteList?: string;
  toggleDocumentsModal?: () => void;
  toggleViewDocumentsModal?: () => void;
};

const StepTwo = ({
  newCaseData,
  setNewCaseData,
  nextStep,
  prevStep,
  updateNewCaseData,
  days,
  months,
  yearList,
  param,
  toggleModal,
  reteList,
  toggleDocumentsModal,
  toggleViewDocumentsModal,
}: StepTwoProps) => {
  const { patientDetails } = newCaseData;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  const { newCaseNum } = useAppSelector((state) => state?.case);
  const navigate = useNavigate();

  const saveDataToDb = async () => {
    const POST_URL = `/preauthdata?email=${user}&casenumber=${newCaseNum}`;
    // const array = [

    //   "postalCode",
    //   "state",

    //   "contractNumber",
    //   "doctorsName",
    //   "expectedDeliveryDate",

    //   "ICU_charge",
    //   "OT_charge",
    //   "cost_for_investigation_and_diagnosis",
    //   "dateOfAdmission",
    //   "daysInHospital",
    //   "daysInICU",
    //   "emergencyOrPlanedHospitalizedEvent",
    //   "expenses",
    //   "othersExpenses",
    //   "professional_fees",
    //   "timeOfAdmission",
    // ]

    const formData = new FormData();
    patientDetails?.PhysicianYesPhysicianContactNum &&
      formData?.append(
        "PhysicianYesPhysicianContactNum",
        patientDetails?.PhysicianYesPhysicianContactNum
      );
    patientDetails?.PhysicianYesPhysicianName &&
      formData?.append(
        "PhysicianYesPhysicianName",
        patientDetails?.PhysicianYesPhysicianName
      );
    patientDetails?.PhysicianYesPhysicianName &&
      formData?.append(
        "PhysicianYesPhysicianName",
        patientDetails?.PhysicianYesPhysicianName
      );
    patientDetails?.city && formData?.append("city", patientDetails?.city);
    patientDetails?.PhysicianYesPhysicianCurrentAddress &&
      formData?.append(
        "patient_details_currentAddress",
        patientDetails?.PhysicianYesPhysicianCurrentAddress
      );
    patientDetails?.Give_Company_details &&
      formData?.append(
        "patient_details_Give_details",
        patientDetails?.Give_Company_details
      );
    patientDetails?.previousHealthInsurance &&
      formData?.append(
        "patient_details_HealthInsurance",
        patientDetails?.previousHealthInsurance
      );
    patientDetails?.patientName &&
      formData?.append("patient_details_name", patientDetails?.patientName);
    patientDetails?.gender &&
      formData?.append("patient_details_gender", patientDetails?.gender);
    // formData?.append("patient_details_ageYear", patientDetails?.TPA);
    // formData?.append("patient_details_ageMonth", patientDetails?.TPA);
    patientDetails?.DOB &&
      formData?.append("patient_details_date", patientDetails?.DOB);
    patientDetails?.contractNumber &&
      formData?.append(
        "patient_details_contact_number",
        patientDetails?.contractNumber
      );
    patientDetails?.relativeContractNumber &&
      formData?.append(
        "patient_details_numberOfAttendingRelative",
        patientDetails?.relativeContractNumber
      );
    patientDetails?.insuredCardNumber &&
      formData?.append(
        "patient_details_insuredMemberIdCardNo",
        patientDetails?.insuredCardNumber
      );
    patientDetails?.policyNumber &&
      formData?.append(
        "patient_details_policyNumberorCorporateName",
        patientDetails?.policyNumber
      );
    patientDetails?.employeeId &&
      formData?.append(
        "patient_details_EmployeeId",
        patientDetails?.employeeId
      );
    patientDetails?.occupation &&
      formData?.append(
        "patient_details_occupation",
        patientDetails?.occupation
      );
    patientDetails?.familyPhysician &&
      formData?.append(
        "patient_details_familyPhysician",
        patientDetails?.familyPhysician
      );

    dispatch(setLoading(true));
    try {
      await axiosConfig.post(POST_URL, formData);

      dispatch(setLoading(false));
      notification("info", "Save successfully");
      nextStep();
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification("error", error?.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value } = e.target;

    setNewCaseData((pre: any) => ({
      ...pre,
      patientDetails: { ...pre?.patientDetails, [name]: value },
    }));
  };

  // const handleDateOfBirth = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any> | any,
  //   key: string
  // ) => {
  //   const { name, value } = e.target;
  //   let day = patientDetails?.[name]?.slice(0, 2);
  //   let month = patientDetails?.[name]?.slice(3, 5);
  //   let year = patientDetails?.[name]?.slice(6);
  //   if (key === "day") {
  //     day = value;
  //   } else if (key === "month") {
  //     month = value;
  //   } else {
  //     year = value;
  //   }

  //   setNewCaseData((pre: any) => ({
  //     ...pre,
  //     patientDetails: {
  //       ...pre?.patientDetails,
  //       [name]: `${day || "00"}/${month || "00"}/${year}`,
  //     },
  //   }));
  // };

  useEffect(() => {
    console.log(newCaseData);
  }, [newCaseData]);

  return (
    <div className="h-full relative">
      <div className="flex justify-between border-b border-fontColor-darkGray flex-col sm:flex-row">
        <div className="sm:w-1/2 p-6 pb-12">
          <div>
            <Input
              handleChange={handleChange}
              name="patientName"
              value={patientDetails?.patientName || ""}
              label="Patient name"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-6">
            <p className="pb-4 text-sm text-fontColor-light">Gender</p>
            <div className="flex flex-col lg:flex-row">
              <div className="mr-8 ">
                <InputRadio
                  handleChange={handleChange}
                  name="gender"
                  value="male"
                  radioLabel="Male"
                  fieldName={patientDetails?.gender || ""}
                />
              </div>
              <div className="mr-8 my-3 lg:my-0">
                <InputRadio
                  handleChange={handleChange}
                  name="gender"
                  value="female"
                  radioLabel="Female"
                  fieldName={patientDetails?.gender || ""}
                />
              </div>
              <div className="mr-8 ">
                <InputRadio
                  handleChange={handleChange}
                  name="gender"
                  value="transgender"
                  radioLabel="Transgender"
                  fieldName={patientDetails?.gender || ""}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 ">
            <InputDate
              handleChange={handleChange}
              name="DOB"
              value={patientDetails?.DOB || ""}
              label="Date of birth"
              style={{ maxWidth: "220px" }}
            />

            {/* <p className="pb-4 text-sm text-fontColor-light">Date of birth</p>
            <div className="flex items-center">
              <div className="pr-4">
                <NewCaseSelect
                  options={days}
                  name="DOB"
                  handleChange={(e) => handleDateOfBirth(e, "day")}
                  defaultOption="Day"
                  value={patientDetails?.DOB?.slice(0, 2) || ""}
                  style={{ minWidth: "60px" }}
                />
              </div>
              <div className="pr-4">
                <NewCaseSelect
                  options={months}
                  name="DOB"
                  handleChange={(e) => handleDateOfBirth(e, "month")}
                  defaultOption="Month"
                  value={patientDetails?.DOB?.slice(3, 5) || ""}
                  style={{ minWidth: "120px" }}
                />
              </div>
              <div className="pr-8">
                <NewCaseSelect
                  options={yearList}
                  name="DOB"
                  handleChange={(e) => handleDateOfBirth(e, "year")}
                  defaultOption="Year"
                  value={patientDetails?.DOB?.slice(6) || ""}
                  style={{ minWidth: "80px" }}
                />
              </div>
            </div> */}
          </div>

          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="occupation"
              value={patientDetails?.occupation || ""}
              label="Occupation"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>
          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="contractNumber"
              value={patientDetails?.contractNumber || ""}
              label="Contract number"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>
          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="relativeContractNumber"
              value={patientDetails?.relativeContractNumber || ""}
              label="Relative contract number"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="insuredCardNumber"
              value={patientDetails?.insuredCardNumber || ""}
              label="Insured Member ID Card No"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>
        </div>

        <div className="border-r border-fontColor-darkGray"></div>

        <div className=" sm:w-1/2 p-6 pb-0">
          <div>
            <Input
              handleChange={handleChange}
              name="policyNumber"
              value={patientDetails?.policyNumber || ""}
              label="Policy Number / Corporate Name"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-6">
            <Input
              handleChange={handleChange}
              name="employeeId"
              value={patientDetails?.employeeId || ""}
              label="Employee ID"
              labelStyle={{ paddingBottom: "12px" }}
              style={{ height: "40px" }}
            />
          </div>

          <div className="mt-8">
            <p className="pb-4 text-sm text-fontColor-light">
              Do you have previous health insurance ?
            </p>
            <div className="flex items-center">
              <div className="mr-8">
                <InputRadio
                  handleChange={handleChange}
                  name="previousHealthInsurance"
                  value="yes"
                  radioLabel="Yes"
                  fieldName={patientDetails?.previousHealthInsurance || ""}
                />
              </div>
              <div className="mr-8">
                <InputRadio
                  handleChange={handleChange}
                  name="previousHealthInsurance"
                  value="no"
                  radioLabel="No"
                  fieldName={patientDetails?.previousHealthInsurance || ""}
                />
              </div>
            </div>
          </div>

          {patientDetails?.previousHealthInsurance === "yes" ? (
            <>
              <div className="mt-6">
                <Input
                  handleChange={handleChange}
                  name="HealthInsuranceYesCompanyName"
                  value={patientDetails?.HealthInsuranceYesCompanyName || ""}
                  label="Company name"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
              <div className="mt-6">
                <Input
                  handleChange={handleChange}
                  name="Give_Company_details"
                  value={patientDetails?.Give_Company_details || ""}
                  label="Give Details"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
            </>
          ) : null}

          <div className="mt-8">
            <p className="pb-4 text-sm text-fontColor-light">
              Do you have family physician ?
            </p>
            <div className="flex items-center">
              <div className="mr-8">
                <InputRadio
                  handleChange={handleChange}
                  name="familyPhysician"
                  value="yes"
                  radioLabel="Yes"
                  fieldName={patientDetails?.familyPhysician || ""}
                />
              </div>
              <div className="mr-8">
                <InputRadio
                  handleChange={handleChange}
                  name="familyPhysician"
                  value="no"
                  radioLabel="No"
                  fieldName={patientDetails?.familyPhysician || ""}
                />
              </div>
            </div>
          </div>

          {patientDetails?.familyPhysician === "yes" ? (
            <>
              <div className="mt-6">
                <Input
                  handleChange={handleChange}
                  name="PhysicianYesPhysicianName"
                  value={patientDetails?.PhysicianYesPhysicianName || ""}
                  label="Physician name"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
              <div className="mt-6">
                <Input
                  handleChange={handleChange}
                  name="PhysicianYesPhysicianContactNum"
                  value={patientDetails?.PhysicianYesPhysicianContactNum || ""}
                  label="Physician Contract Number"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
              <div className="mt-6">
                <Input
                  handleChange={handleChange}
                  name="PhysicianYesPhysicianCurrentAddress"
                  value={
                    patientDetails?.PhysicianYesPhysicianCurrentAddress || ""
                  }
                  label="Physician Current Address"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
            </>
          ) : null}

          {/* <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <NewCaseSelect
                  options={[{ label: "Delli", value: "Delli" }]}
                  name="city"
                  handleChange={handleChange}
                  defaultOption="Select city"
                  label="City"
                  value={patientDetails?.city || ""}
                />
              </div>
              <div className="col-span-1">
                <NewCaseSelect
                  options={[{ label: "Kolkata", value: "Kolkata" }]}
                  name="state"
                  handleChange={handleChange}
                  defaultOption="Select state"
                  label="State"
                  value={patientDetails?.state || ""}
                />
              </div>
            </div>
          </div> */}

          <div className="my-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Input
                  handleChange={handleChange}
                  name="City"
                  value={patientDetails?.City || ""}
                  label="City"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
            </div>
          </div>
          {/* <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Input
                  handleChange={handleChange}
                  name="postalCode"
                  value={patientDetails?.postalCode || ""}
                  label="Postal code"
                  labelStyle={{ paddingBottom: "12px" }}
                  style={{ height: "40px" }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-18 flex items-center justify-between p-6">
        <NextButton iconLeft={true} text="Back" handleClick={prevStep} />
        <div className="hidden lg:flex">
          <NextButton
            text="View ReteList"
            style={{ marginRight: "16px", marginBottom: "16px" }}
            handleClick={toggleDocumentsModal}
          />
          <NextButton
            text="View Documents"
            style={{ marginRight: "16px", marginBottom: "16px" }}
            handleClick={toggleViewDocumentsModal}
          />

          <NextButton
            text="Generate Pre Auth Form"
            style={{ marginRight: "16px", marginBottom: "16px" }}
            handleClick={() => navigate("/preauthform")}
          />

          <NextButton
            text="Send Mail"
            style={{ marginRight: "16px" }}
            handleClick={toggleModal}
          />
        </div>
        <NextButton iconRight={true} handleClick={saveDataToDb} />
      </div>
      <div className="mt-18 flex items-center justify-between w-full p-6 lg:hidden">
        <div className="flex ml-auto mr-auto w-72 sm:w-full justify-between flex-col sm:flex-row">
          <NextButton
            text="View ReteList"
            style={{ marginRight: "16px", marginBottom: "16px" }}
            handleClick={toggleDocumentsModal}
          />
          <NextButton
            text="View Documents"
            style={{ marginRight: "16px", marginBottom: "16px" }}
            handleClick={toggleViewDocumentsModal}
          />

          <NextButton
            text="Generate Pre Auth Form"
            style={{ marginRight: "16px", marginBottom: "16px" }}
            handleClick={() => navigate("/preauthform")}
          />

          <NextButton
            text="Send Mail"
            style={{ marginTop: "16px" }}
            handleClick={toggleModal}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
