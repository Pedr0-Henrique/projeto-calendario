 // Carregar aniversariantes do armazenamento local ao iniciar a página
 document.addEventListener("DOMContentLoaded", function() {
    loadBirthdays();
  });

  function addBirthday() {
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var name = document.getElementById("name").value;

    var table = document.getElementById("birthdayTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = day;
    cell2.innerHTML = month;
    cell3.innerHTML = name;
    cell4.innerHTML = '<button onclick="removeBirthday(this)">Remover</button>';

    // Armazenar aniversariante no armazenamento local
    saveBirthday({ day: day, month: month, name: name });
  }

  function saveBirthday(birthday) {
    // Obter aniversariantes do armazenamento local
    var birthdays = JSON.parse(localStorage.getItem("birthdays")) || [];

    // Adicionar novo aniversariante
    birthdays.push(birthday);

    // Salvar aniversariantes de volta no armazenamento local
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
  }

  function loadBirthdays() {
    // Obter aniversariantes do armazenamento local
    var birthdays = JSON.parse(localStorage.getItem("birthdays")) || [];

    // Preencher a tabela com os aniversariantes armazenados
    var table = document.getElementById("birthdayTable");
    birthdays.forEach(function(birthday) {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = birthday.day;
      cell2.innerHTML = birthday.month;
      cell3.innerHTML = birthday.name;
      cell4.innerHTML = '<button onclick="removeBirthday(this)">Remover</button>';
    });
  }

  function removeBirthday(button) {
    var row = button.parentNode.parentNode;
    var table = document.getElementById("birthdayTable");
    var rowIndex = row.rowIndex;

    // Remover aniversariante da tabela
    table.deleteRow(rowIndex);

    // Remover aniversariante do armazenamento local
    var birthdays = JSON.parse(localStorage.getItem("birthdays")) || [];
    birthdays.splice(rowIndex - 1, 1); // -1 porque a tabela tem uma linha de cabeçalho
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
  }