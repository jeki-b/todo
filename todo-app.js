(function() {
  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = "Добавить дело";
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };

  }

  //создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement('li');
    //кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    //устанавливаем стили для элемента списка, а также для размещения кнопок
    //в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = "Готово";
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //вкладываем кнопки в отдельный элемент, чтобы они объеденились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title = 'Список дел', catalog = [{ name: 'Название дела', done: false }, { name: 'Название дела', done: true }] ) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    // let todoItems = [createTodoItem('Сходить за хлебом'), createTodoItem('Купить молоко')];
    console.log(localStorage.getItem("123"))
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    // todoList.append(todoItems[0].item);
    // todoList.append(todoItems[1].item);

    //2.Добавьте к функции createTodoApp третий опциональный аргумент с массивом дел, которые должны быть в списке сразу после загрузки приложения. Каждое дело должно быть объектом вида { name: 'Название дела', done: false/true }. Измените код функции таким образом, чтобы список дел сразу добавлялся в DOM.
    for (let i = 0; catalog.length > i; i++) {
      let todoCatalog = createTodoItem(catalog[i].name);
      todoList.append(todoCatalog.item);
      let toDoJson = catalog[i];
      todoCatalog.doneButton.addEventListener('click', function() {
        todoCatalog.item.classList.toggle('list-group-item-success');
        toDoJson.done = !toDoJson.done;
        localStorage.setItem("123", JSON.stringify(catalog));
      });
      todoCatalog.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoCatalog.item.remove();
          catalog.splice(catalog.findIndex(el => el === toDoJson), 1)
          localStorage.setItem("123", JSON.stringify(catalog));
        }
      });

      if (catalog[i].done == true) {
        todoCatalog.item.classList.toggle('list-group-item-success');
      }
    }

    //1.Сделайте так, чтобы у кнопки в форме устанавливался атрибут disabled, когда поле ввода пустое. Не забудьте, что disabled должен устанавливаться и при загрузке приложения, так как изначально поле тоже пустое.
    todoItemForm.form.addEventListener('keyup', function() {
      if (!todoItemForm.input.value) {
        todoItemForm.button.disabled = true;
      } else {
          todoItemForm.button.disabled = false;
      }
    })


    //браузер создает событие submit на форму по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
      //эта строка необходима, чтобы предотвратить стандартное действия браузера
      //в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);
      let toDoJson = {name: todoItemForm.input.value, done: false};

      catalog.push(toDoJson);
      //добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');

        toDoJson.done = !toDoJson.done;
        localStorage.setItem("123", JSON.stringify(catalog));
      });
      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          catalog.splice(catalog.findIndex(el => el === toDoJson), 1)
          localStorage.setItem("123", JSON.stringify(catalog));
        }
      });
      //создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);
      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
      localStorage.setItem("123", JSON.stringify(catalog))
    });
  }
  window.createTodoApp = createTodoApp;
})();


