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
  onSubmit: (values: PatientFormValues) => void;
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
  const [entryDetails, setEntryDetails] = useState<Entry[]>([]);

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

  const addEntry = () => {
    const newEntry: Entry = {
      date,
      description,
      diagnosisCodes: [diagnosisCode], // Assuming you have only one diagnosis code for simplicity
      specialist: "",
      type: "HealthCheck",
      healthCheckRating: HealthCheckRating.LowRisk, // Provide a default rating
      id: uuidv4(), // Generate a unique ID for the entry
    };
    setEntryDetails([...entryDetails, newEntry]);
    setDate("");
    setDescription("");
    setDiagnosisCode("");
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
          value={date}
          onChange={({ target }) => setDate(target.value)}
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
