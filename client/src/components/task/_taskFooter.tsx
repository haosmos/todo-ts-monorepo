import { Switch, Box, FormControlLabel, Button } from '@mui/material';
// import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';
import { ITaskFooter } from './interfaces/ITaskFooter';

function TaskFooter({
  id,
  status,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e)
}: ITaskFooter): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <FormControlLabel
        control={(
          <Switch
            defaultChecked={status === Status.inProgress}
            color="warning"
            onChange={(e) => onStatusChange(e, id)}
          />
        )}
        label="In Progress"
      />
      
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{
          color: '#ffffff'
        }}
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
    
    </Box>
  );
}

export default TaskFooter;

// TaskFooter.propTypes = {
//   id: PropTypes.isRequired,
//   status: PropTypes.string,
//   onStatusChange: PropTypes.func,
//   onClick: PropTypes.func
// };
