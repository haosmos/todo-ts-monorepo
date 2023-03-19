import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import Task from '../task/task';
import TaskCounter from '../taskCounter/taskCounter';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './Interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';
import { TaskCounterStatusType } from '../taskCounter/interfaces/ITaskCounter';
import { TasksFilter } from './TasksFilter';

function TaskArea(): JSX.Element {
  const tasksUpdatedContext = useContext(TaskStatusChangedContext);
  
  const [currentFilter, setCurrentFilter] = useState<TaskCounterStatusType>(Status.all);
  
  const [allTasks, setAllTasks] = useState(false);
  const [todoTasks, setTodoTasks] = useState(false);
  const [inProgressTasks, setInProgressTasks] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(false);
  
  const filterTasksHandler = useCallback((task: TaskCounterStatusType) => {
    setCurrentFilter(task);
  }, []);
  
  // const changeFilterHandler = useCallback((
  //   newFilter: TaskCounterStatusType
  // ) => {
  //   setCurrentTaskType(newFilter);
  // }, []);
  
  // const filterTasksHandler = useCallback((
  //   task: TaskCounterStatusType
  // ) => {
  //   switch (task) {
  //     case 'todo':
  //       setTodoTasks(true);
  //       setInProgresssTasks(false);
  //       setaskstAllTasks(false);
  //       console.log('it is all todo tasks!');
  //       break;
  //     case 'inProgress':
  //       setInProgressTasks(true);
  //       setTodoTasks(false);
  //       setAllTasks(false);
  //       console.log('it is all in progress tasks!');
  //       break;
  //     case 'completed':
  //       setCompletedTasks(true);
  //       setInProgressTasks(false);
  //       setTodoTasks(false);
  //       console.log('it is all completed tasks!');
  //       break;
  //     case 'all':
  //       setAllTasks(true);
  //       setInProgressTasks(true);
  //       setCompletedTasks(false);
  //       console.log('it is all tasks!');
  //       break;
  //     default:
  //       console.log('it is not all tasks!');
  //   }
  //
  //   // changeFilterHandler(currentTaskType);
  // }, []);
  
  const { error, isLoading, data, refetch } = useQuery(
    ['tasks'],
    () => {
      return sendApiRequest<ITaskApi[]>(
        'http://localhost:3001/tasks',
        'GET'
      );
    }
  );
  
  const updateTaskMutation = useMutation(
    (data: IUpdateTask) => sendApiRequest(
      'http://localhost:3001/tasks',
      'PUT',
      data
    )
  );
  
  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);
  
  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);
  
  const onStatusChangeHandler = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }, [updateTaskMutation]);
  
  const markCompleteHandler = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  };
  
  const tasks = data ? data.filter((task) => {
    switch (currentFilter) {
      case 'all':
        return true;
      case 'todo':
      case 'inProgress':
      case 'completed':
        console.log(task.status);
        return task.status === currentFilter;
      default:
        return true;
    }
  }) : null;
  
  return (
    <Grid
      item
      md={8}
      px={4}
    >
      <Box
        mb={8}
        px={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <h2>
          Status of Your Tasks As On
          {' '}
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      
      <Grid
        container
        display="flex"
        justifyContent="center"
      >
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          md={8}
          xs={12}
          mb={4}
        >
          <TaskCounter
            status={Status.todo}
            count={
              data ? countTasks(data, Status.todo) : undefined
            }
          />
          <TaskCounter
            count={
              data ? countTasks(data, Status.inProgress) : undefined
            }
            status={Status.inProgress}
          />
          <TaskCounter
            count={
              data ? countTasks(data, Status.completed) : undefined
            }
            status={Status.completed}
          />
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="column"
          md={8}
          xs={10}
        >
          <>
            {error && (
              <Alert
                severity="error"
                sx={{
                  width: '100%',
                  marginBottom: '16px'
                }}
              >
                There was an error fetching your tasks
              </Alert>
            )}
            
            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert
                severity="warning"
                sx={{
                  width: '100%',
                  marginBottom: '16px'
                }}
              >
                You do not have any tasks created yet. Start by creating a task
              </Alert>
            )}
            
            <TasksFilter
              currentFilter={currentFilter}
              // changeFilterHandler={changeFilterHandler}
              filterTasksHandler={filterTasksHandler}
            />
            
            {isLoading ? <LinearProgress /> : (
              Array.isArray(tasks)
              && tasks.length > 0
              && tasks.map((task, index) => {
                return (
                  <Task
                    key={index + task.priority}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    date={new Date(task.date)}
                    status={task.status}
                    priority={task.priority}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                );
              
              // if (inProgressTasks) {
              //   return task.status === Status.inProgress ? (
              //     <Task
              //       key={index + task.priority}
              //       id={task.id}
              //       title={task.title}
              //       description={task.description}
              //       date={new Date(task.date)}
              //       status={task.status}
              //       priority={task.priority}
              //       onStatusChange={onStatusChangeHandler}
              //       onClick={markCompleteHandler}
              //     />
              //   ) : false;
              // }
              //
              // if (allTasks) {
              //   return task.status !== Status.completed ? (
              //     <Task
              //       key={index + task.priority}
              //       id={task.id}
              //       title={task.title}
              //       description={task.description}
              //       date={new Date(task.date)}
              //       status={task.status}
              //       priority={task.priority}
              //       onStatusChange={onStatusChangeHandler}
              //       onClick={markCompleteHandler}
              //     />
              //   ) : false;
              // }
              
              // return task.status === Status.todo || task.status ===
              // Status.inProgress ? ( <Task key={index + task.priority} id={task.id}
              // title={task.title} description={task.description} date={new
              // Date(task.date)} status={task.status} priority={task.priority}
              // onStatusChange={onStatusChangeHandler} onClick={markCompleteHandler}
              // /> ) : false;
            })
             )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TaskArea;
