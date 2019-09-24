import {ModelTask} from '../models/model-task';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

// проверяем ответ от сервера
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

// переводит ответ сервера в формат json
const toJSON = (response) => {
  return response.json();
};


export const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  // получаем список задач
  getTasks() {
    return this._load({url: `tasks`})
    .then(toJSON)
    .then(ModelTask.parseTasks);
  }

  // отправляем на сервер информацию о созданной задаче
  createTask({task}) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then(toJSON)
    .then(ModelTask.parseTask);
  }

  // отправляем на сервер информацию об изменениях в задаче
  updateTask({id, data}) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then(toJSON)
    .then(ModelTask.parseTask);
  }

  // удаление задачи
  deleteTask({id}) {
    return this._load({url: `tasks/${id}`, method: Method.DELETE});
  }

  // отправляем запрос на сервер
  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
    .then(checkStatus)
    .catch((err) => {
      throw err;
    });
  }
};
