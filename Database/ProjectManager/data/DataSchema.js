import Realm from "realm";
export const TASK_SCHEMA = "Task";
export const TASKLIST_SCHEMA = "TaskList";

export const TaskSchema = {
  name: TASK_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
    done: {type: 'bool', default: false},
  }
}

export const TaskListSchema = {
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

export const updateTaskList = (taskList) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let updatingTaskList = realm.objectForPrimaryKey(TASKLIST_SCHEMA, taskList.id);
      updatingTaskList.name = taskList.name;
      resolve();
    });
  }).catch((error) => reject(error)); 
});

export const deleteTaskList = (taskListId) => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let deletingTaskList = realm.objectForPrimaryKey(TASKLIST_SCHEMA, taskListId);
      realm.delete(deletingTaskList);
      resolve();
    });
  }).catch((error) => reject(error)); 
});

export const deleteAllTaskList = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let allTaskList = realm.objects(TASKLIST_SCHEMA);
      realm.delete(allTaskList);
      resolve();
    });
  }).catch((error) => reject(error)); 
});

export const queryAllTaskList = () => new Promise((resolve, reject) => {
  Realm.open(databaseOptions).then(realm => {
    realm.write(() => {
      let allTaskList = realm.objects(TASKLIST_SCHEMA);
      resolve(allTaskList);
    });
  }).catch((error) => reject(error)); 
});

export default new Realm(databaseOptions);