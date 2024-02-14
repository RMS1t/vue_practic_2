let app = new Vue({
    el: '#app',

    data: {
        done_blocker: false,
        add_blocker: false,
        tasks: [
            {
                column: 1,
                time_stamp:null,
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
            },
            {
                column: 2,
                time_stamp:null,
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


        first:null,
        second:null,
        third:null,
        fourth:null,
        fifth:null,
        time_stamp:null,

        errors:[]
    },
    methods: {
        checker_add() {
            count=0;
            for (i=0;i< this.tasks.length;i++){
                if (this.tasks[0]["column"] ==1){
                  count++
                }
               if (count==3 ){
                   this.add_blocker=true
                   break
               }
            }

        },
        checker_done(id){
            counter_task=3
            counter_done=0
               if (this.tasks[id]['first'][1]== true){
                    counter_done++
               }
               if (this.tasks[id]['second'][1]== true){
                   counter_done++
               }
               if (this.tasks[id]['third'][1]== true){
                   counter_done++
               }
               if (this.tasks[id]['fourth']) {
                   counter_task++
                   if ((this.tasks[id]['fourth'][1]== true)){
                       counter_done++
                   }
               }
               if (this.tasks[id]['fifth']) {
                   counter_task++
                   if ((this.tasks[id]['fifth'][1]== true)){
                       counter_done++
                   }



           }

        },
        add_task(){
            if (this.first &&this.second &&this.third){

                let task={
                    column: 1,
                    time_stamp: null,
                    task_list: [
                        { title: toString(this.first), done:false},
                        {title:toString(this.second) , done:false},
                        {title:toString(this.third),done: false},
                       ]
                }
                if (this.fourth){
                    task.task_list.push( { title: toString(this.fourth), done:false})
                }
                if(this.fifth) {
                    task.task_list.push( { title: toString(this.fifth), done:false})
                }

                this.tasks.push(task)
                this.checker_add()
            }
            else {
                if(!this.first ) this.errors.push("1st required.")
                if(!this.second) this.errors.push("2nd required.")
                if(!this.third) this.errors.push("3thd required.")
            }


        },
        task_done(){

        },



    }


})
