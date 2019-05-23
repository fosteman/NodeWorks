/*Create by Timofei Shchepkin for May 25 Presentation of Vue.js
* Grand thanks to professor James Mwangi@Seneca College
* */

import Vue from './node_modules/vue/dist/vue.js';
import axios from 'axios';
import m from 'moment';

console.log(`We're in`);

let vm = new Vue({
    el: '#appRoot',
    data: {
        preLoadedList: [],
        bookmarkedQuotes: []
    },
    methods: {
        refreshList: function () {
            let self = this;
            axios.get('http://localhost:3006/arrayOfObjectifiedStrings')
                .then(res => self.preLoadedList = res.data)
                .catch(err => console.error(err) );
        },
        addBookmark(event) {
            this.bookmarkedQuotes.push(
                {
                    quote: event.target.innerHTML,
                    moment: m().format('LTS')
                }
            );
        }
    },
    template: `
<div>
    <div class="ui container floated left quotes">
        <button v-on:click="refreshList">Load more quotes!</button>
        <h2>Quotes</h2>
        <ul>
            <li v-for="q in preLoadedList" v-on:click="addBookmark($event)">
                    {{ q.quote }}
            </li>
        </ul>
    </div>
    <div class="ui container floated right itemList">
        <h3>Saved Items</h3>
        <div>
            <ul>
                <li v-for="q in bookmarkedQuotes">
                    <em> {{ q }} </em><br>
                    <small> {{ q.moment }} </small>
                </li>
            </ul>
        </div>
    </div>
</div>`
});



