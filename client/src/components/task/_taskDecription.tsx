import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { ITaskDescription } from './interfaces/ITaskDescription';

function TaskDescription({
  description = 'Lorem ipsum text bla bla'
}: ITaskDescription): JSX.Element {
  return (
    <Box mb={4}>
      <Typography>
        {description}
      </Typography>
    </Box>
  );
}

export default TaskDescription;

TaskDescription.propTypes = {
  description: PropTypes.string,
};
