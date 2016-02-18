
function showartworksdata() {


// do picture titles have different hierarchies? difference in titleX

console.log('artworks ' + artworks.length);
console.log(artworks[0]);
console.log(artworks[1]);
for(var i = 0; i < artworks.length; i++){
//    if( ($.type(artworks[i].title) !== "null") && ($.type(locations[i].long) !== "null")){
    if( ($.type(artworks[i].title !== null))) {
        console.log(artworks[i].title);
     }
    
    if( ($.type(artworks[i].title2 !== null))){
        console.log(artworks[i].title2);
     }

    if( ($.type(artworks[i].title3 !== null))){
        console.log(artworks[i].title3);
     }

    if( ($.type(artworks[i].title4 !== null))){
        console.log(artworks[i].title4);
     }

}
}