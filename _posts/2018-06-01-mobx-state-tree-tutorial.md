---
title: MobX State Tree Tutorial
date: 2018-06-01 13:00:00 -04:00
categories:
- react
- mobx
- tutorial
excerpt_separator: <!--more-->
layout: post
---

In this tutorial we are going to use the following:

* create-react-app
* mobx
* mobx-react
* mobx-state-tree
* antd

You can find the source on [github](https://github.com/mdxprograms/react-mobx-state-tree-demo) as well!

<!--more-->

### Setup

First let's make sure we have create-react-app installed (assuming you have yarn installed as well)

```bash
yarn global add create-react-app
```

After create-react-app has been installed we can now generate our project with the following:

```bash
create-react-app mobx-state-tree-todos && cd mobx-state-tree-todos
```

Our main command we will use to run the project is `yarn start`
Go ahead and run the command to view your default app now.

We can remove a few files at this point.
Remove all files in your `src` directory _except_ for `App.js`, `App.test.js` (optional), and `index.js`.

Your `index.js` file should now look like the code snippet below

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// mount our main app
ReactDOM.render(<App />, document.getElementById("root"));
```

### Install packages

_Make sure to exit the running application before hand_

```bash
yarn add mobx mobx-react mobx-state-tree antd
```

### Creating your todo store

We need to first create our store directory to hold our stores and then create the `TodoStore.js` within the new directory.

```bash
mkdir stores && touch stores/TodoStore.js
```

### MobX State Tree parts

MobX State Tree makes it extremely easy to wire your `model`, `actions`, and `views`. There are plenty other features to the api, but these will be the main parts we will use in this example.

`model` is the core of your store. It will hold the expected object structure when working with the data in your store.

Our model will need an `id`, `title`, and `done` for a single todo item.

`actions` are the functions used to modify our models values from within our React components. We will need only one action on a single todo: `toggleDone`. We will then add two actions to our `TodoStore` instance: `addTodo` and `deleteTodo`.

`views` are our MobX computed return values. We will use views to get the current `todoCount` and the `completedCount`. These will actually be tied to the `TodoStore` itself.

### Adding your Todo model and action

First we need to import `types` from `mobx-state-tree`.

```javascript
import { types } from "mobx-state-tree";
```

Our Todo

```javascript
const Todo = types
  .model("Todo", {
    id: types.number,
    title: "", // could also be types.string
    done: false
  })
  .actions(self => ({
    toggleDone() {
      self.done = !self.done;
    }
  }));
```

We can now use our Todo on its own or within another model as well.
We however want a centralized `TodoStore` to handle more than one todo at a time.

Our TodoStore

```javascript
const TodoStore = types
  .model("TodoStore", {
    todos: types.array(Todo)
  })
  .views(self => ({
    get todoCount() {
      return self.todos.length;
    },
    get completedCount() {
      return self.todos.filter(todo => todo.done === true).length;
    }
  }))
  .actions(self => ({
    addTodo(todo) {
      self.todos.push(todo);
    },
    deleteTodo(id) {
      self.todos = self.todos.filter(t => t.id !== id);
    }
  }));
```

The full store output

```javascript
// todo model
const Todo = types
  .model("Todo", {
    id: types.number,
    title: "", // could also be types.string
    done: false
  })
  .actions(self => ({
    toggleDone() {
      self.done = !self.done;
    }
  }));

// todo store
const TodoStore = types
  .model("TodoStore", {
    todos: types.array(Todo)
  })
  .views(self => ({
    get todoCount() {
      return self.todos.length;
    },
    get completedCount() {
      return self.todos.filter(todo => todo.done === true).length;
    }
  }))
  .actions(self => ({
    addTodo(todo) {
      self.todos.push(todo);
    },
    deleteTodo(id) {
      self.todos = self.todos.filter(t => t.id !== id);
    }
  }));

export default TodoStore;
```

### Reviewing the TodoStore

`types.model` takes the model name as its first argument and then the object structure for the data we will be working with after creating our store. `todos` will be an array of our `Todo` model. The nice part about mobx-state-tree is that by defining `types.array(Todo)` each todo instance will have its actions and views tied to it. We'll see an example of it in our component coming up.

We also have our views which will give us our current counts as well. By using the getter syntax `get todoCount` and returning the value needed we will always have the most up-to-date value needed.

### Adding our store

In `App.js` we'll import MobX and antd.

```javascript
import { observer } from "mobx-react";
import {
  Checkbox,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  notification
} from "antd";
import TodoStore from "./stores/TodoStore";

import "antd/dist/antd.css";
```

[antd](https://ant.design/) is an excellent React-centric library for common components used in most applications. This will help us make our todos look sexy or better than craigslist at least...

Our constructor will instantiate our stores

```javascript
constructor() {
  super();
  this.todoStore = TodoStore.create({ todos: [] });
}
```

### Adding the handleAddTodo function

We only _really_ need one function in our `App` component other than render, `handleAddTodo`.

```javascript
handleAddTodo = e => {
  if (e.key === "Enter") {
    this.todoStore.addTodo({
      id: Math.floor(Math.random() * 100) + 1,
      title: e.currentTarget.value,
      done: false
    });
    notification.success({
      message: "New Todo Added",
      description: e.currentTarget.value,
      duration: 2
    });
  }
};
```

This function will be tied to the inputs `onKeyDown` event which will also check for the event key `if (e.key === "Enter")`. This way we will only trigger the save once the `Enter` key is actually pressed.
Once the `Enter` key is pressed we will use our new instance of the `TodoStore` to use the `addTodo` action.
We are simulating an `id` on the todo by using a handy random number function, adding the input's value as the title, and defaulting `done` to `false`.

We are also triggering antd's notification component for a nice touch to let the user know we have saved their todo successfully.

### Rendering our App

```jsx
render() {
  return (
    <Layout>
      <Layout.Content style={{ padding: "0 50px", margin: "1rem 0" }}>
        <Input
          placeholder="New Todo"
          size="large"
          type="text"
          onKeyDown={this.handleAddTodo}
          style={{ margin: "1rem 0" }}
        />

        <div className="todos-stats">
          <h4>Total: {this.todoStore.todoCount}</h4>
          <h4>Completed: {this.todoStore.completedCount}</h4>
        </div>
        <Divider />

        <List
          header={<h3>Todo List</h3>}
          bordered
          dataSource={this.todoStore.todos}
          size="large"
          renderItem={todo => (
            <List.Item key={todo.id}>
              <Checkbox onClick={todo.toggleDone} checked={todo.done} />
              <span>{todo.title}</span>
              <button onClick={() => this.todoStore.deleteTodo(todo.id)}>
                <Icon type="delete" />
              </button>
            </List.Item>
          )}
        />
      </Layout.Content>
    </Layout>
  );
}

export default observer(App);
```

antd has a nice list component that helps cut down on what would ultimately be your `map` over `this.todoStore.todos`. We pass in our todos to the `dataSource` prop and use the `renderItem` prop to handle the callback on each todo iteration. The checkbox now has access to each todo's `toggleDone` action along with it's associated model properties as well.

One thing that really stands out to me is not having to use a function from the todoStore but from each todo instance which makes it easier to handle each todo's property changes without having to pass an `id` to a todoStore function, which then would have to do a `find` method on the todos array before finally changing the model.

Since we want to keep track of the array itself, the todoStore can handle that easily with the `addTodo` and `deleteTodo` now by passing the full todo object when adding and passing the `todo.id` to filter out the todo with its associated `id` from our original todos array.

### The benefits of using mobx-state-tree

I am more of a MobX approach to state management vs Redux.
I know the masses tend to flock to redux and I can totally see why, but MobX gives some really cool features that

1.  Make the code more readable (could be easily argued)
2.  Keep the code in one place instead of 3 different files
3.  By using observer as a wrapper function that ties the store to our component after initializing, it cuts down on the boilerplate needed to map both reducers/actions and state in two separate functions.

Now, this is more of my personal opinion on why I first and foremost prefer MobX, but there are some other niceties, ie: `mobx-state-tree` that help manage your structure even more so by defining a `model` and then chaining `actions` and `views` to the model itself.
This also helps with nesting other models and stores with the DRY principle.

Enjoy -
