import Route from "@ember/routing/route";

export default Route.extend({
  newTodo: "",
  actions: {
    toggleCheckBox(id) {
      this.store.findRecord("todo", id).then(function(todo) {
        todo.get("done");

        todo.set("done", !todo.get("done"));

        todo.save();
      });
    },
    deleteTodo(id) {
      this.store
        .findRecord("todo", id, { backgroundReload: false })
        .then(function(todo) {
          todo.deleteRecord();
          todo.get("isDeleted");
          todo.save();
        });
    },
    grabTodo() {
      let todo = this.get("controller").get("newTodo");
      this.get("controller").set("newTodo", "");
      const model = this.store.createRecord("todo", {
        title: todo,
        done: false,
        todotime: ""
      });

      model.save().then(() => this.transitionTo("todo"));
    }
  },

  model() {
    return this.store.findAll("todo");
  }
});
