import { useState, SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { PatientFormValues, Gender, Entry, HealthCheckRating } from "../../types";
import { v4 as uuidv4 } from 'uuid'; // Import v4 as uuidv4

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => any;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);
  const [date, setDate] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [entryDetails, setEntryDetails] = useState<Entry[]>([]);
  const [healthRate, setHealthRate] = useState<HealthCheckRating>(0)
  const [error, setError] = useState<string | null>(null); // State for error message
  const [success, setSuccess] = useState(false); // State for success message
  const [dateError, setDateError] = useState<string | null>(null);


  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find((g) => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };
  const validateDate = (inputDate: string) => {
    const currentDate = new Date();
    const enteredDate = new Date(inputDate);
    if (enteredDate > currentDate) {
      setDateError("Date cannot be in the future");
      return false;
    }

    setDateError(null);
    return true;
  };



  const addEntry = () => {

    if (healthRate > 3) {

      setError("Health Rate must be 3 or less.");

    }
    const newEntry: Entry = {
      date,
      description,
      diagnosisCodes: [diagnosisCode],
      specialist: specialist,
      type: "HealthCheck",
      healthCheckRating: healthRate, // Provide a default rating
      id: uuidv4(), // Generate a unique ID for the entry
    };


    setEntryDetails([...entryDetails, newEntry]);
    setDate("");
    setDescription("");
    setDiagnosisCode("");
    setHealthRate(0); // Reset healthRate to default value
    setError(null); // Clear any previous errors

  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    const newPatient: PatientFormValues = {
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
      entries: entryDetails,
    };
    onSubmit(newPatient);

  };

  return (
    <div>
      <form onSubmit={addPatient}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Patient data submitted successfully!</p>}
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          label="Social security number"
          fullWidth
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
        />
        <TextField
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
        />
        <TextField
          label="Occupation"
          fullWidth
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Entry Date"
          fullWidth
          type="date"
          value={date}
          onChange={({ target }) => {
            setDate(target.value);
            setDateError(null); // Clear error when input changes
          }}
          error={dateError !== null}
          helperText={dateError}
        />
        <TextField
          label="Entry Diagnosis Code"
          fullWidth
          value={diagnosisCode}
          onChange={({ target }) => setDiagnosisCode(target.value)}
        />
        <TextField
          label="Entry Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Enter Specialist Name"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          label="Health Rate"
          fullWidth
          value={healthRate}
          onChange={({ target }) => setHealthRate(parseInt(target.value))}
          type="number"
        />


        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={addEntry}
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;
