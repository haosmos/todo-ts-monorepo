import PropTypes from 'prop-types';

import { Avatar, Box, Button, Typography } from '@mui/material';
import { ITaskCounter } from './interfaces/ITaskCounter';
import { Status } from '../createTaskForm/enums/Status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';

function TaskCounter({
  status = Status.completed,
  count = 0
}: ITaskCounter): JSX.Element {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        color="#ffffff"
        fontWeight="bold"
        fontSize="20px"
        variant="h5"
        mb={2}
      >
        {emitCorrectLabel(status)}
      </Typography>
      <Avatar
        sx={{
          backgroundColor: 'transparent',
          border: '5px solid',
          width: '96px',
          height: '96px',
          marginBottom: '16px',
          borderColor: `${emitCorrectBorderColor(status)}`
        }}
      >
        <Typography color="#ffffff" variant="h4">
          {count}
        </Typography>
      </Avatar>
      
      {/* <Button */}
      {/*   variant="contained" */}
      {/*   color="success" */}
      {/*   size="small" */}
      {/*   name="name of the task" */}
      {/*   sx={{ */}
      {/*     color: '#ffffff', */}
      {/*     margin: '10px' */}
      {/*   }} */}
      {/*   onClick={(e) => console.log(status)} */}
      {/* > */}
      {/*   show all{' '} */}
      {/*   <br /> */}
      {/*   {emitCorrectLabel(status)} */}
      {/* </Button> */}
    
    </Box>
  );
}

export default TaskCounter;

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed])
};
