import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Entry, Patient } from '../types';
import patients from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import { Female } from '@mui/icons-material';
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, Tab } from '@mui/material';
import PatientDetail from './PatientDetails';
import AddEntryForm from './AddEntryForm';



const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        if (id) {
            const fetchPatient = async () => {
                try {
                    const patientData = await patients.getOnePatient(id);
                    setPatient(patientData);
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                }
            };

            fetchPatient();
        }
    }, [id]);

    const handleAddEntry = (newEntry: Entry) => {
        // Ensure that the new entry is an object of type Entry
        if (patient) {
            const updatedEntries = [...patient.entries, newEntry];
            const updatedPatient = { ...patient, entries: updatedEntries };
            setPatient(updatedPatient);
        }
    };
    return (
        <div>
            {!patient ? (
                <div>There is no patient</div>
            ) : (
                <div>

                    <Table aria-label="demo table">
                        <TableHead>

                            <h2>Patient Details</h2>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Date of Birth:</TableCell>
                                <TableCell>Occupation</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>     <p> {patient.name}</p></TableCell>
                                <TableCell>       <p>{patient.dateOfBirth}</p></TableCell>
                                <TableCell>   <p> {patient.occupation}</p>
                                </TableCell>
                                <TableCell>   <p> {patient.gender === "male" ? <MaleIcon /> : <Female />}</p></TableCell>

                            </TableRow>
                            {patient.entries.map((entry: Entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell colSpan={4}>
                                        <PatientDetail entry={entry} />
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                </div>
            )}
        </div>
    );

};


export default PatientInfo