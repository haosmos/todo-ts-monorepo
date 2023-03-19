// import PropTypes from 'prop-types';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { IDateField } from './interfaces/IDateField';

function TaskDateField({
  value = new Date(), disabled = false,
  onChange = () => console.log()
}: IDateField): JSX.Element {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
    >
      <DesktopDatePicker
        label="Task Date"
        inputFormat="dd/MM/yyyy"
        onChange={onChange}
        disabled={disabled}
        value={value}
        renderInput={(params: any) => (
          <TextField {...params} />
        )}
      />
    </LocalizationProvider>
  );
}

export default TaskDateField;

// TaskDateField.propTypes = {
//   disabled: PropTypes.bool,
//   onChange: PropTypes.func,
//   value: PropTypes.instanceOf(Date)
// };
