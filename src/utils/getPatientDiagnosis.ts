const getPatientDiagnosis = (detSegment: string) => {
  return { primaryCondition: detSegment.split("|")[4] };
};

export default getPatientDiagnosis;
