import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { TaskDocument } from 'src/db/task/task.schema';

@Injectable()
export class TaskUtil {
  selectRandomUser(pool) {
    return pool[randomInt(0, pool.length)];
  }

  checkRecurrence(tasks: TaskDocument[]) {
    const result = [];

    tasks.forEach((task) => {
      //Need to multiply interval by 1000 to increment the date by seconds.
      const currentDueDate = new Date(
        task.dueDate.getTime() + 1000 * task.interval,
      );

      if (Date.now() > currentDueDate.getTime()) {
        if (task.assigned == undefined) {
          const newAssignedUser = this.selectRandomUser(task.pool);
          const updatedTask = {
            id: task._id,
            updatedTask: {
              last_completed: null,
              due_date: new Date(currentDueDate),
              assigned: newAssignedUser,
            },
          };
          result.push(updatedTask);
        } else {
          const update_task = {
            id: task._id,
            updatedTask: {
              last_completed: null,
              due_date: new Date(currentDueDate),
            },
          };
          result.push(update_task);
        }
      }
    });

    return result;
  }
}
