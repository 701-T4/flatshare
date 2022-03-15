// Generate random house code
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Task, TaskDocument } from 'src/db/task/task.schema';

const maxSafe = 2 ** 48 - 1; //Max int that can be safely reached by randomInt

@Injectable()
export class HouseUtil {
  generateString(length) {
    return randomInt(maxSafe).toString(36).substr(1, length).toUpperCase();
  }

  selectRandomUser(pool) {
    if (pool.length == 1) {
      return pool[0];
    }
    console.log(pool);
    return pool[randomInt(0, pool.length - 1)];
  }

  checkRecurrence(tasks: TaskDocument[]) {
    const result = [];
    tasks.forEach((t) => {
      //Need to multiply interval by 1000 to increment the date by seconds.
      const current_due_date = new Date(
        t.due_date.getTime() + 1000 * t.interval,
      );
      if (Date.now() > current_due_date.getTime()) {
        if (t.assigned == undefined) {
          const new_assigned_user = this.selectRandomUser(t.pool);
          const update_task = {
            id: t._id,
            updatedTask: {
              last_completed: undefined,
              due_date: new Date(current_due_date),
              assigned: new_assigned_user,
            },
          };
          result.push(update_task);
        } else {
          const update_task = {
            id: t._id,
            updatedTask: {
              last_completed: undefined,
              due_date: new Date(current_due_date),
            },
          };
          result.push(update_task);
        }
      }
    });

    return result;
  }
}
