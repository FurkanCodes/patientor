import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Entry, HealthCheckRating } from "../types";

interface AddEntryFormProps {
    onAddEntry: (newEntry: Entry) => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAddEntry }) => {
    const [newEntry, setNewEntry] = useState<Entry>({
        date: "",
        description: "",
        diagnosisCodes: [],
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.LowRisk,
        id: "",
    });

    const handleAddEntry = () => {
        const date = prompt("Enter date:");
        if (date === null) {
            return; // User cancelled the input
        }

        const description = prompt("Enter description:");
        if (description === null) {
            return; // User cancelled the input
        }

        const specialist = prompt("Enter specialist:");
        if (specialist === null) {
            return; // User cancelled the input
        }

        const healthCheckRatingStr = prompt("Enter health check rating (0-3):");
        if (healthCheckRatingStr === null) {
            return; // User cancelled the input
        }
        const healthCheckRating = parseInt(healthCheckRatingStr);

        if (!isNaN(healthCheckRating)) {
            const newEntryData: Entry = {
                date,
                description,
                diagnosisCodes: [],
                specialist,
                type: "HealthCheck",
                healthCheckRating,
                id: "", // You can generate a unique ID here
            };

            onAddEntry(newEntryData);
            setNewEntry({
                date: "",
                description: "",
                diagnosisCodes: [],
                specialist: "",
                type: "HealthCheck",
                healthCheckRating: HealthCheckRating.LowRisk,
                id: "",
            });
        }
    };

    return (
        <div>
            {/* Your form components */}
            <Button onClick={handleAddEntry} variant="contained" color="primary">
                Add Entry
            </Button>
        </div>
    );
};

export default AddEntryForm;
