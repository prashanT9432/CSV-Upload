const searchFun = () => {
  let filter = document.getElementById("search").value.toUpperCase();

  let tr = document.getElementById("myTable").querySelectorAll("tbody tr");

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td");
    Array.from(td).map((tda) => {
      if (tda.textContent.toUpperCase().indexOf(filter) > -1 && filter != "") {
        tda.classList.add("active");
      } else {
        tda.classList.remove("active");
      }
    });
  }
};
