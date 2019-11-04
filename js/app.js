const list = JSON.parse(localStorage.getItem('todos')) || [];
// 创建vue实例
const vm = new Vue({
	el: '.todoapp',
	data: {
		list: list,
		thing: '',
		currentId: '',
		currentThing: ''
	},
	methods: {
		del(id) {
			console.log(this.list);
			// 根据id找到对应的下标
			const idx = this.list.findIndex(item => item.id === id);
			console.log(idx);
			this.list.splice(idx, 1);

			// 过滤，把id为2过滤掉
			// this.list = this.list.filter(item => item.id !== id);
		},
		add() {
			if (!this.thing.trim()) {
				alert('不能为空哦!');
				return;
			}
			const temp = {
				id: Date.now(),
				thing: this.thing,
				done: false
			}
			this.list.unshift(temp);
			this.thing = '';
		},
		showEdit(id, thing) {
			console.log(this.currentId);
			this.currentId = id;
			this.currentThing = thing;
		},
		edit() {
			const todo = this.list.find(item => item.id === this.currentId);
			// console.log(todo);
			if (!todo.thing.trim()) {
				this.list = this.list.filter(item => item.id !== this.currentId);
			}
			this.currentId = '';
		},
		cancel(item) {
			this.currentId = ''; //恢复，隐藏编辑框
			item.thing = this.currentThing;
			// console.log(item.thing);
			// console.log(currentId);
		},
		clear() {
			this.list = this.list.filter(item => !item.done);
		}
	},
	computed: {
		leftCount() {
			return this.list.filter(item => !item.done).length;
		},
		isClear() {
			return this.list.some(item => item.done);
		},
		isCheckAll: {
			get() {
				return this.list.every(item => item.done);
			},
			set(value) {
				// console.log(value);
				this.list.forEach(item => item.done = value);
			}
		}
	},
	watch: {
		list: {
			deep: true,
			handler(value) {
				// console.log(value);
				localStorage.setItem('todos', JSON.stringify(value));
			}
		}
	}
})