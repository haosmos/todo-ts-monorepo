import { Status } from '../../createTaskForm/enums/Status';

export type TaskCounterStatusType =
  Status.todo | Status.inProgress | Status.completed | Status.all;

export interface ITaskCounter {
  count?: number;
  status?: TaskCounterStatusType;
}
