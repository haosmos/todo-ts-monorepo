import { TextField } from '@mui/material';
// import PropTypes from 'prop-types';

import { ITextField } from './interfaces/ITextField';

function TaskTitleField({
  onChange = (e) => console.log(e.target.value),
  disabled = false,
  value,
}: ITextField): JSX.Element {
  
  return (
    <TextField
      value={value}
      id="title"
      label="Task Title"
      placeholder="Task Title"
      variant="outlined"
      size="small"
      name="title"
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default TaskTitleField;

// TaskTitleField.propTypes = {
//   onChange: PropTypes.func,
//   disabled: PropTypes.bool
// };
