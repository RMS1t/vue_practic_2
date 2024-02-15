let app = new Vue({
    el: '#app',

    data: {
        done_blocker: false,
        add_blocker: false,
        tasks: [
            {
                column: 1,
                time_stamp: null,
                task_list: [
                    {
                        title: 1,
                        done: false
                    },
                    {
                        title: 2,
                        done: false
                    },
                    {
                        title: 3,
                        done: false
                    },
                    {
                        title: 4,
                        done: false
                    },
                ]
            },
            {
                column: 1,
                time_stamp: null,
                task_list: [
                    {
                        title: 1,
                        done: false
                    },
                    {
                        t: 1,
                        a: 1
                    }
                ]
            }

        ],


        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null,
        time_stamp: null,

        errors: []
    },
    methods: {
        toNextColumn(task) {
            task_checker = 0
            done_checker = 0
            if (task.column === 2) {
                for (i in task.task_list) {
                    task_checker++

                    if (task.task_list[i].done=== true) {
                        done_checker++

                    }
                }
                if (task_checker === done_checker) {

                    task.column = 3

                    task.time_stamp= "Время"+ new Date(Date.now()).getHours()+new Date(Date.now()).getMinutes()+ 'Дата'+new Date(Date.now()).getFullYear()
                    if (this.done_blocker === true) {
                        this.done_blocker = false
                        for (askTask in this.tasks) {
                            if (askTask.column === 1) {
                                this.toNextColumn(askTask)
                            }
                        }

                    }

                }
            }

            if (task.column === 1) {


                for (i in task.task_list) {

                    task_checker++
                    if (task.task_list[i].done === true) {
                        done_checker++
                    }
                }

                if ((done_checker / task_checker) > 0.5) {
                    col_checker = 0
                    for (i in this.tasks) {
                        if (this.tasks[i].column === 2) {
                            col_checker++
                        }
                        if (col_checker === 5) {
                            this.done_blocker = true
                            break
                        }
                    }
                    if (this.done_blocker === false) {
                        task.column = 2
                    }
                }
            }
        },
        checker_add() {
            count = 0;
            for (i = 0; i < this.tasks.length; i++) {
                if (this.tasks[0]["column"] == 1) {
                    count++
                }
                if (count == 3) {
                    this.add_blocker = true
                    break
                }
            }
            if (count < 3) {
                this.add_blocker = false
            }
        },
        add_task() {
            if (this.first && this.second && this.third) {

                let task = {
                    column: 1,
                    time_stamp: null,
                    task_list: [
                        {title: toString(this.first), done: false},
                        {title: toString(this.second), done: false},
                        {title: toString(this.third), done: false},
                    ]
                }
                if (this.fourth) {
                    task.task_list.push({title: toString(this.fourth), done: false})
                }
                if (this.fifth) {
                    task.task_list.push({title: toString(this.fifth), done: false})
                }

                this.tasks.push(task)
                this.checker_add()
            } else {
                if (!this.first) this.errors.push("1st required.")
                if (!this.second) this.errors.push("2nd required.")
                if (!this.third) this.errors.push("3thd required.")
            }


        },
        toReady(task, subTask) {
            subTask.done = true;
            this.toNextColumn(task);


        },


    }


}
)
