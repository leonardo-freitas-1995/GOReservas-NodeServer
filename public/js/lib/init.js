// Creating 'String.contains'
(function(){
    if(!('contains' in String.prototype)) {
        String.prototype.contains = function(str, startIndex) {
            return -1 !== String.prototype.indexOf.call(this, str, startIndex);
        };
    }
})();

// Creating 'Array.contains'
(function(){
    if(!('contains' in Array.prototype)) {
        Array.prototype.contains = function(str, startIndex) {
            return -1 !== Array.prototype.indexOf.call(this, str, startIndex);
        };
    }
})();