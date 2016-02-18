function showlettersdata(){

  for(var i = 0; i < letters.length; i++){
      if(letters[i].pages.length > 1){
          console.log(letters[i].pages.length);
      }
  }

  var lettersarray = [];
  for(var i = 0; i < letters.length; i++){
      var letter = {};
      letter.id = letters[i].id;
      letter.start = letters[i].date;
      letter.content = letters[i].pages.length.toString();
      switch(letters[i].pages.length){
          case 1: letter.className = 'one'; break;
          case 2: letter.className = 'two'; break;
          case 3: letter.className = 'three'; break;
          case 4: letter.className = 'four'; break;
          case 5: letter.className = 'five'; break;
          case 6: letter.className = 'six'; break;
          case 7: letter.className = 'seven'; break;
          case 8: letter.className = 'eight'; break;
          case 9: letter.className = 'nine'; break;
          case 10: letter.className = 'ten'; break;
          case 11: letter.className = 'eleven'; break;
          case 12: letter.className = 'twelve'; break;
          case 13: letter.className = 'thirteen'; break;
          case 14: letter.className = 'fourteen'; break;
          case 15: letter.className = 'fifteen'; break;
          case 16: letter.className = 'sixteen'; break;
          case 17: letter.className = 'seventeen'; break;
      }
      letter.title = letters[i].title + "\n" + (letters[i].pages.length.toString()) + " sidor" + "\n" + letters[i].date;
      lettersarray.push(letter);
  }

    // DOM element where the Timeline will be attached
    var container = document.getElementById('letterscontainer');

    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet(lettersarray);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);


}
