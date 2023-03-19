import { TextField } from '@mui/material';
// import PropTypes from 'prop-types';
import { ITextField } from './interfaces/ITextField';

// import TaskTitleField from './_taskTitleField';

function TaskDescriptionField({
  onChange = (e) => console.log(e),
  disabled = false,
  value
}: ITextField): JSX.Element {
  return (
    <TextField
      value={value}
      id="description"
      name="description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export default TaskDescriptionField;

// TaskDescriptionField.propTypes = {
//   onChange: PropTypes.func,
//   disabled: PropTypes.bool
// };
