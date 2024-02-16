let app = new Vue({
    el: '#app',

    data: {
        done_blocker: false,
        add_blocker: false,
        tasks:[],

        name: null,
        first: null,
        second: null,
        third: null,
        fourth: null,
        fifth: null,
        time_stamp: null,

        errors: []
    },
    methods: {
        checker_done(){
            count = 0;
            for (i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i]["column"] == 1) {
                    this.toNextColumn(this.tasks[i])
                }

            }
        },
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

                    task.time_stamp= "Время "+ new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()+
                        ' Дата '+new Date(Date.now()).getDate()+":"+(new Date(Date.now()).getMonth()+1)+":"+new Date(Date.now()).getFullYear()

                    if (this.done_blocker === true) {
                        this.done_blocker = false

                        for (i in this.tasks) {

                            if (this.tasks[i].column === 1) {
                                this.toNextColumn(this.tasks[i])
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
                        if (col_checker >= 5) {
                            this.done_blocker = true
                            break
                        }
                    }
                    if (this.done_blocker === false) {

                        task.column = 2
                        this.checker_add()
                    }
                }
            }
        },
        checker_add() {
            count = 0;
            for (i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i]["column"] == 1) {

                    count++
                    console.log(count)
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
            if (this.first && this.second && this.third && this.name) {
                let task = {
                    name: this.name,
                    column: 1,
                    time_stamp: null,
                    task_list: [
                        {title: this.first, done: false},
                        {title: this.second, done: false},
                        {title: this.third, done: false},
                    ]
                }
                if (this.fourth) {
                    task.task_list.push({title: this.fourth, done: false})
                }
                if (this.fifth) {
                    task.task_list.push({title: this.fifth, done: false})
                }
                this.name=null;
                this.first=null
                this.second=null
                this.third=null
                this.fourth=null
                this.fifth=null

                this.tasks.push(task)
                this.checker_add()
            } else {
                if (!this.first) this.errors.push("name required.")
                if (!this.first) this.errors.push("1st required.")
                if (!this.second) this.errors.push("2nd required.")
                if (!this.third) this.errors.push("3thd required.")
            }


        },
        toReady(task, subTask) {
            subTask.done = true;
            this.toNextColumn(task);


        },


    },
    created(){
        const savedTasks=JSON.parse(localStorage.getItem('tasks'))
        if (savedTasks){
            this.tasks=savedTasks;
            this.checker_add()
            this.checker_done()
        }
    },
    updated(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks))

    },
    computed: {
        isButtonEnabled() {
            return true
        },
    }

}
)
