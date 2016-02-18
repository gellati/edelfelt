function showeventsdata(){

/* 50 first look like they are from same day */
console.log('events ' + events.length);
console.log(events[0]);
console.log(events[1]);

for(var i = 0; i < events.length; i++){
    if(events[i].artworks.length > 0){
        console.log(events[i].id + " " + events[i].artworks.length)
    }
        console.log(events[i].year + " " + events[i].month + " " + events[i].day)

}
}