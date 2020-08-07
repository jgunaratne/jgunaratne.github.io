var dataTable = document.getElementById('dataTable');

var data1 = [
    [ '120802 19:39:49.060:I', 262, 123102, 'checkSpell()',
        'Last run was successful', 'good', 505, 'View' ],
    [ '120802 19:39:49.060:I', 262, 123102, 'checkSpell()',
        'Last run was successful', 'bad', 504, 'View' ],
    [ '120802 19:39:49.060:I', 262, 123102, 'checkSpell()',
        'Last run was successful', 'good', 505, 'View' ],
    [ '120802 19:39:49.060:I', 262, 123102, 'checkSpell()',
        'Last run was successful', 'bad', 504, 'View' ] ];

function renderRow(row) {
  var tr = document.createElement('tr');
  for ( var i = 0; i < row.length; i++) {
    var td = document.createElement('td');
    if (i == 5) {
      var div = document.createElement('div');
      div.className = 'health ' + row[i];
      td.appendChild(div);
      tr.appendChild(td);
    } else if (i == 6) {
      td.innerHTML = row[i];
      td.className = 'align-right';
      tr.appendChild(td);
    } else if (i == 7) {
      td.className = 'align-right';
      var a = document.createElement('a');
      a.href = '#';
      a.innerHTML = row[i];
      td.appendChild(a);
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

renderRows(data1);