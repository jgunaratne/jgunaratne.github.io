var dataTable = document.getElementById('dataTable');

function renderRowHead(name) {
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var h4 = document.createElement('h4');
  td.colSpan = 10;
  td.className = "section";
  h4.innerHTML = name;
  td.appendChild(h4);
  tr.appendChild(td);
  dataTable.children[0].appendChild(tr);
}

function renderRow(row) {
  var tr = document.createElement('tr');
  for ( var i = 0; i < row.length; i++) {
    var td = document.createElement('td');
    if (i == 0) {
      var name = row[i];
      var a = document.createElement('a');
      a.href = 'item.html';
      a.innerHTML = row[i];
      td.appendChild(a);
      tr.appendChild(td);
    } else if (i == 7) {
      var div = document.createElement('div');
      div.className = 'health ' + row[i];
      td.appendChild(div);
      tr.appendChild(td);
    } else if (i == 8) {
      td.className = 'activity';
      for ( var j = 0; j < 5; j++) {
        var bar = document.createElement('div');
        bar.className = 'bar';
        var none = document.createElement('div');
        var red = document.createElement('div');
        var green = document.createElement('div');
        none.className = 'none';
        red.className = 'red';
        green.className = 'green';
        bar.appendChild(none);
        bar.appendChild(red);
        bar.appendChild(green);
        none.style.height = (100 - row[i][j][0] - row[i][j][1]) + '%';
        red.style.height = row[i][j][0] + '%';
        green.style.height = row[i][j][1] + '%';
        td.appendChild(bar);
      }
      tr.appendChild(td);
    } else if (i == 9) {
      td.className = 'align-right';
      td.innerHTML = row[i] + '%';
      tr.appendChild(td);
    } else {
      td.innerHTML = row[i];
      tr.appendChild(td);
    }
  }
  dataTable.children[0].appendChild(tr);
}

function renderRows(data) {
  for ( var i = 0; i < data.length; i++) {
    renderRow(data[i]);
  }
}

var data1 = [
    [ 'Validator 1', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 90 ], [ 20, 80 ], [ 10, 60 ], [ 0, 20 ], [ 0, 10 ] ], 53 ],
    [ 'Validator 2', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 20 ], [ 10, 80 ], [ 0, 70 ], [ 0, 10 ], [ 0, 5 ] ], 10 ],
    [ 'Validator 3', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 90 ], [ 0, 80 ], [ 0, 60 ], [ 0, 20 ], [ 0, 10 ] ], 53 ],
    [ 'Validator 4', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 90 ], [ 0, 80 ], [ 0, 60 ], [ 0, 20 ], [ 0, 10 ] ], 53 ],
    [ 'Validator 5', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 90 ], [ 0, 80 ], [ 0, 60 ], [ 0, 20 ], [ 0, 10 ] ], 53 ] ];

renderRowHead('Application');
renderRows(data1);

var data2 = [
    [ 'Validator 1', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 90 ], [ 20, 80 ], [ 10, 60 ], [ 0, 20 ], [ 0, 10 ] ], 53 ],
    [ 'Validator 2', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 20 ], [ 10, 80 ], [ 0, 70 ], [ 0, 10 ], [ 0, 5 ] ], 10 ],
    [ 'Validator 3', 7, 10, 100, 27, 13, 7, 'good',
        [ [ 0, 90 ], [ 0, 80 ], [ 0, 60 ], [ 0, 20 ], [ 0, 10 ] ], 53 ] ];

renderRowHead('Application 2');
renderRows(data2);
