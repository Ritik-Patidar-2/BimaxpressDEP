import React from "react";

type DetailsProps = {
  summeryData: object;
};

const Details = ({ summeryData }: DetailsProps) => {
  //@ts-ignore
  const { patient_details, caseNumber, hospital_details, status } = summeryData;
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6">
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Name</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Name}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Case ID</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {caseNumber}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Phone</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray`}
        >
          {patient_details?.Phone}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">City</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.city}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Admission Date</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {hospital_details?.Date_of_Admission}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Diagnosis</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Provision_Diagnosis}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Claim number</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Health_Id}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">
          IPD Patient number
        </p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.ipd_patient_number}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">
          Docotor Incharge
        </p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {hospital_details?.Treating_Doctor_Name}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">
          Insurance company
        </p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Insurance_Company}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">TPA company</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {patient_details?.Tpa_Company}
        </p>
      </div>
      <div className="sm:col-span-1 col-span-2 ">
        <p className="pb-4 text-sm text-fontColor font-thin">Status</p>

        <p
          className={`border-b-2 border-fontColor-darkGray py-1 w-full text-base text-fontColor-deepGray `}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default Details;
