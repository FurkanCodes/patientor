import React from 'react';
import { Entry, HealthCheckEntry, HealthCheckRating } from '../types';
import { Icon, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';

interface EntryDetailsProps {
    entry: Entry;
}

const PatientDetail: React.FC<EntryDetailsProps> = ({ entry }) => {
    const { type, date, description, specialist, diagnosisCodes } = entry;

    switch (type) {
        case 'HealthCheck':
            const healthCheckEntry = entry as HealthCheckEntry;
            return (
                <List>
                    <ListItem>
                        <ListItemText
                            primary={`Type: Health Check`}
                            secondary={`Date: ${date}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={`Specialist: ${specialist}`}
                            secondary={`Description: ${description}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={`Health Check Rating: ${HealthCheckRating[healthCheckEntry.healthCheckRating]}`}
                        />
                    </ListItem>
                    {diagnosisCodes && (
                        <ListItem>
                            <ListItemText
                                primary={`Diagnosis Codes: ${diagnosisCodes}`}
                            />
                        </ListItem>
                    )}
                </List>
            );
        case 'Hospital':
            return (
                <List>
                    <ListItem>
                        <ListItemText
                            primary={`Type: Hospital`}
                            secondary={`Date: ${date}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={`Specialist: ${specialist}`}
                            secondary={`Description: ${description}`}
                        />
                    </ListItem>
                    {diagnosisCodes && (
                        <ListItem>
                            <ListItemText
                                primary={`Diagnosis Codes: ${diagnosisCodes.join(', ')}`}
                            />
                        </ListItem>
                    )}
                </List>
            );
        case 'OccupationalHealthcare':
            return (
                <List>
                    <ListItem>
                        <ListItemText
                            primary={`Type: Occupational Healthcare`}
                            secondary={`Date: ${date}`}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={`Specialist: ${specialist}`}
                            secondary={`Description: ${description}`}
                        />
                    </ListItem>
                    {diagnosisCodes && (
                        <ListItem>
                            <ListItemText
                                primary={`Diagnosis Codes: ${diagnosisCodes.join(', ')}`}
                            />
                        </ListItem>
                    )}
                </List>
            );
        default:
            return (
                <Typography variant="body1">
                    Unknown entry type: {type}
                </Typography>
            );
    }
};

export default PatientDetail;
