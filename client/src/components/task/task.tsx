import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import TaskHeader from './_taskHeader';
import TaskDescription from './_taskDecription';
import TaskFooter from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Priority } from '../createTaskForm/enums/Priority';
import { Status } from '../createTaskForm/enums/Status';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

function Task({
  title = 'Test title',
  date = new Date(),
  description = 'Lorem text bla bla',
  priority = Priority.normal,
  status = Status.completed,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
  id,
}: ITask): JSX.Element {
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid ',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
}

export default Task;

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  priority: PropTypes.string,
  status: PropTypes.string,
};
