class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = 0;
    }
    pushTask(task) {
        this.queue.push(task);
        this.next();
    }
    next() {
        //pattern on limited concurrency
        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task(() => {
                this.running--;
                this.next();
            });
            this.running++;
        }
    }
}
