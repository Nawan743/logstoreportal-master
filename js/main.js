const endpoint = "http://localhost:8080/logstore-0.0.1-SNAPSHOT"

$(document).ready(function () {
  $.get(endpoint + "/log", function (data) {
    data.forEach((log) => {
      var content;
      if (log.content.length > 150) {
        content = log.content.slice(0, 150) + '...'
      } else {
        content = log.content;
      }
      var table = document.getElementById("logTable");
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.textContent = content;
      cell2.innerHTML = log.occurrences
    })
  });

  $("#add").click(function () {
    var data = $('#newLogForm').serializeArray();

    $.post(endpoint + "/log/save", {
      content: data[0].value,
      occurrences: data[1].value
    }, function (result) {
      if (result == 1000)
        alert(`O log foi salvo com sucesso!`);
      else
        alert('Ocorreu um erro durante a criação do log!');
    });
  });

  $("#delete").click(function (id) {
    $.ajax({
      url: endpoint + "/log/delete/" + id,
      type: 'DELETE',
      success: function (result) {
        if (result == 1000)
          alert('O log foi excluído com sucesso!');
        else
          alert('Ocorreu um erro durante a exclusão do log!')
      }
    });
  });

  $("#update").click(function () {
    var data = $('#updateLogForm').serializeArray();

    $.ajax({
      url: endpoint + "/log/update/",
      type: 'PUT',
      data: {
        id: data[0].value,
        content: data[1].value,
        occurrences: ldata[2].value
      },
      success: function (result) {
        if (result == 1000)
          alert('O log foi atualizado com sucesso!');
        else
          alert('Ocorreu um erro durante a atualização do log!')
      }
    });
  });
});

