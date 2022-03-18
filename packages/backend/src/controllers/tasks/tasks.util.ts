import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { TaskDocument } from 'src/db/task/task.schema';

@Injectable()
export class TaskUtil {
  selectRandomUser(pool: string[]): string {
    return pool[randomInt(0, pool.length)];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkRecurrence(tasks: TaskDocument[]): any[] {
    const result = [];

    tasks.forEach((task) => {
      // Need to multiply interval by 1000 to convert the interval from seconds to milliseconds
      const currentDueDate = new Date(
        task.dueDate.getTime() + 1000 * task.interval,
      );

      if (Date.now() > currentDueDate.getTime()) {
        if (task.assigned == undefined) {
          const newAssignedUser = this.selectRandomUser(task.pool);
          const updatedTask = {
            id: task._id,
            updatedTask: {
              lastCompleted: null,
              dueDate: new Date(currentDueDate),
              assigned: newAssignedUser,
            },
          };
          result.push(updatedTask);
        } else {
          const update_task = {
            id: task._id,
            updatedTask: {
              lastCompleted: null,
              dueDate: new Date(currentDueDate),
            },
          };
          result.push(update_task);
        }
      }
    });

    return result;
  }
}
