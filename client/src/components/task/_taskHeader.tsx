import PropTypes from 'prop-types';
import { Box, Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ITaskHeader } from './interfaces/ITaskHeader';

function TaskHeader({
  title = 'Default Title',
  date = new Date()
}: ITaskHeader): JSX.Element {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      mb={3}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip variant="outlined" label={format(date, 'PPP')} />
      </Box>
    </Box>
  );
}

export default TaskHeader;

TaskHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};
