import { TaskCounterStatusType } from '../interfaces/ITaskCounter';
import { Status } from '../../createTaskForm/enums/Status';

export const emitCorrectLabel = (
  status: TaskCounterStatusType
// eslint-disable-next-line consistent-return
): string => {
  // eslint-disable-next-line default-case
  switch (status) {
    case Status.todo:
      return 'Todos';
    case Status.inProgress:
      return 'In progress';
    case Status.completed:
      return 'completed';
    case Status.all:
      return 'all';
  }
};
