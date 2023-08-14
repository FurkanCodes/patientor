export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
}


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}
export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;