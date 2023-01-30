import Realm from "realm";
export const TASK_SCHEMA = "Task";
export const TASKLIST_SCHEMA = "TaskList";

const TaskSchema = {
  name: TASK_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
    done: {type: 'bool', default: false},
  }
}

const TaskListSchema = {
  name: TASKLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    list: {type: 'list', objectType: TASK_SCHEMA},
  }
}

const databaseOptions = {
  path: 'ProjectManagerApp.realm',
  schema: [TaskListSchema, TaskSchema],
  schemaVersion: 0,
}

export const insertNewTaskList = (newTaskList) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      realm.create(TASKLIST_SCHEMA, newTaskList);
    });
  }).catch((error) => reject(error)); 
});

export const updateNewTaskList = (taskList) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let updatingTaskList = realm.objectForPrimaryKey(TASKLIST_SCHEMA, taskList.id);
      updatingTaskList.name = taskList.name;
      resolve();
    });
  }).catch((error) => reject(error)); 
});

