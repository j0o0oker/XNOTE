var j = {};

/*
*打印
*/
j.log = function (content) {
    var result;
    if (typeof content === Object) {
        result = JSON.stringify(content);
        return result;
    }
}
$j = j;
