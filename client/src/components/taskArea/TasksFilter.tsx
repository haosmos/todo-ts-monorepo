import { blue, green, red, yellow } from '@mui/material/colors';
import { Button, Grid, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Status } from '../createTaskForm/enums/Status';
// import { emitCorrectLabel } from './helpers/emitCorrectLabel';
import { TaskCounterStatusType } from '../taskCounter/interfaces/ITaskCounter';

type TTaskFilter = {
  currentFilter: TaskCounterStatusType,
  // changeFilterHandler?: (task: TaskCounterStatusType) => void,
  filterTasksHandler: (task: TaskCounterStatusType) => void,
};

export function TasksFilter(props: TTaskFilter) {
  // const { currentTaskType, changeFilterHandler, filterTasksHandler } = props;
  const { currentFilter, filterTasksHandler } = props;
  
  function changeFilterHandler(task: TaskCounterStatusType) {
    console.log(task);
    filterTasksHandler(task);
  }
  
  // function
  
  const taskType = Object.values(Status);
  
  return (
    <Box
      display="flex"
      // flexDirection="row"
      justifyContent="space-between"
      // alignItems="flex-between"
      // width="100%"
      // px={2}
      // my={6}
    >
      <Typography variant="h6" my={2}>
        Show:{' '}
        {taskType.map((task) => (
          <Button
            key={task}
            variant="contained"
            size="small"
            // color="info"
            // color="info"
            name="name of the task"
            sx={{
              color: `${currentFilter === task ? 'ffffff' : 'lightgreen'}`,
              backgroundColor: `${currentFilter === task ? 'ffffff' : '#0a0a0a'}`,
              // padding: '2px',
              margin: '2px'
            }}
            onClick={(e) => changeFilterHandler(task)}
          >
            {task}
          </Button>
        ))}
      </Typography>
    
    </Box>
  );
}

// export default TasksFilter;
