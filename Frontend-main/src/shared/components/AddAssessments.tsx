import { TextField } from '@mui/material';
import React, { memo } from 'react';
import { IUser } from '../interfaces/interfaces';
import StudentItem from './StudentItem';

interface Props {
  handleInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    email: string,
    lecture_Id: string
  ) => void;
  numberInput: any;
  user: IUser;
  key: number;
  lecture_Id: string;
}

const AddAssessments: React.FC<Props> = memo(
  ({ handleInput, numberInput, user, key, lecture_Id }: Props) => {
    return (
      <div style={{ display: 'flex' }} key={key}>
        <>
          <StudentItem
            key={Math.random().toString()}
            id={user.email}
            name={user.name}
            icontoggle={false}
            deleteShow={false}
          />
          <TextField
            id="outlined-number"
            label="Assessment"
            type="number"
            name={user.email}
            value={numberInput[lecture_Id]?.[user.email] ?? 0}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: { min: 0, max: 20 } }}
            onChange={(e) => handleInput(e, user.email, lecture_Id)}
          />
        </>
      </div>
    );
  }
);

AddAssessments.displayName = 'AddAssessments';

export default AddAssessments;
