import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  console.log(data)
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  console.log(object)

  return data;
};

const getOnePatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`,
  )
  const patientData = data;

  return patientData;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, getOnePatient
};

