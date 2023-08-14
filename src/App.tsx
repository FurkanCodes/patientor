import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      console.log(patients)
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          </Routes>
          <Routes>
            <Route path="/patients/:id" element={<PatientInfo />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
