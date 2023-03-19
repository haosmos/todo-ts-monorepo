import { useCallback, useState, useEffect, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
  Box,
  Typography,
  Stack,
  Button,
  Alert,
  LinearProgress,
  AlertTitle
} from '@mui/material';
import TaskTitleField from './_taskTitleField';
import TaskDescriptionField from './_taskDescriptionField';
import TaskDateField from './_taskDateField';
import TaskSelectField from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/Interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

function CreateTaskForm(): JSX.Element {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const tasksUpdatedContext = useContext(TaskStatusChangedContext);
  
  const createTaskMutation = useMutation((data: ICreateTask) => sendApiRequest(
    'http:localhost:3001/tasks',
    'POST',
    data,
  ));
  
  const createTaskHandler = useCallback(() => {
    if (!title || !date || !description) {
      return;
    }
    
    const task: ICreateTask = {
      title,
      description,
      date: date.toISOString(),
      status,
      priority
    };
    
    createTaskMutation.mutate(task);
  }, [createTaskMutation, date, description, priority, status, title]);
  
  function cleanUpForm() {
    console.log('clean up function!!!');
    setTitle((prev) => '');
    setDescription('');
  }
  
  useEffect(
    () => {
      if (createTaskMutation.isSuccess) {
        setShowSuccess(true);
        cleanUpForm();
        tasksUpdatedContext.toggle();
      }
      
      const successTimeout = setTimeout(
        () => {
          setShowSuccess(false);
        },
        1500
      );
      
      return () => {
        clearTimeout(successTimeout);
      };
    },
    [createTaskMutation.isSuccess]
  );
  
  // useEffect(() => {
  //   cleanUpForm();
  // });
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert
          sx={{
            width: '100%',
            marginBottom: '16px'
          }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}
      
      <Typography mb={2} component="h2" variant="h6">
        Create a task
      </Typography>
      
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          disabled={createTaskMutation.isLoading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField
          disabled={createTaskMutation.isLoading}
          value={date}
          onChange={(date) => setDate(date)}
        />
        
        <Stack
          sx={{ width: '100%' }}
          direction="row"
          spacing={2}
        >
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Status"
            name="status"
            value={status}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              }
            ]}
            onChange={(e) => setStatus(e.target.value as string)}
          />
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              {
                value: Priority.low,
                label: Priority.low
              },
              {
                value: Priority.normal,
                label: Priority.normal
              },
              {
                value: Priority.high,
                label: Priority.high
              }
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          disabled={
            !title
            || !description
            || !date
            || !status
            || !priority
          }
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Create a task
        </Button>
      </Stack>
    </Box>
  );
}

export default CreateTaskForm;
