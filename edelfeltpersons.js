
function showpersonsdata(){
  var personsarray = [];
  for(var i = 0; i < persons.length; i++){
          if( ($.type(persons[i].birth_year) !== "null") && ($.type(persons[i].death_year) !== "null")){
  console.log(persons[i]);
      var person = {};
      person.id = persons[i].id;
      person.start = persons[i].birth_year; // Date(persons[i].birth_year, 0, 0);
      person.end = persons[i].death_year; // Date(persons[i].death_year, 0, 0);
      person.content = persons[i].name;
      person.title = persons[i].description + "\n" + person.start + "-" + person.end;
      personsarray.push(person);
          }

          }

    // DOM element where the Timeline will be attached
    var container = document.getElementById('personscontainer');

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet(personsarray);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);

}
