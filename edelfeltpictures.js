function showpicturesdata() {

console.log('pictures ' + pictures.length);
console.log(pictures[0]);
console.log(pictures[1]);



count = function(ary, classifier) {
    return ary.reduce(function(counter, item) {
        var p = (classifier || String)(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
}

var picturetypes = count(pictures, function(item) { return item.type })
var picdata = []

for(var key in picturetypes){
	var pic = {}
	pic["type"] = key
	pic["frequency"] = picturetypes[key]
	picdata.push(pic)
}

console.log(picdata)



var chart = AmCharts.makeChart("picturescontainer", {
	 "type": "pie",
	 "dataProvider" : picdata,
	 "valueField": "frequency",
	 "titleField": "type",
	 "labelText": "[[type]]",
	 "export": {"enabled": true},
	 radius: "30%"
	 
})

console.log(picturetypes);


}