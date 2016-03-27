angular.module('trelloApp').service('trelloStorage', function ($q) {
    var _this = this;
    this.data = [];
    this.getSettings = function(callback) {
        chrome.storage.sync.get('dateColor', function(items) {
            if (items != null) {
                _this.data = items;
                console.log(_this.data);
                callback(_this.data);
            }
        });
    }
    this.sync = function() {
        chrome.storage.sync.set({dateColor: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }
//    this.add = function (newContent) {
//        var id = this.data.length + 1;
//        var todo = {
//            id: id,
//            content: newContent,
//            completed: false,
//            createdAt: new Date()
//        };
//        this.data.push(todo);
//        this.sync();
//    }
//    this.remove = function(todo) {
//        this.data.splice(this.data.indexOf(todo), 1);
//        this.sync();
//    }
//    this.removeAll = function() {
//        this.data = [];
//        this.sync();
//    }
});