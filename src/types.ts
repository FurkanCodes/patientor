export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender
  occupation: string,
  entries: Entry[];
}


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;


export type PatientFormValues = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;