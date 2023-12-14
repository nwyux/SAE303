import { Chart } from "chart.js/auto";

let i = 0;

(async function puzzles() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", (evt) => {
    let data = JSON.parse(req.responseText);
    let thirdElementData = data[2].data;
    for (let i = 0; i < thirdElementData.length; i++) {}
    construct(thirdElementData);
  });
  req.open(
    "GET",
    "http://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json"
  );
  req.send();

  function construct(thirdElementData) {
    let set = new Set(
      thirdElementData.map((row) => row.name),
      thirdElementData.map((row) => row.status)
    );
    let names = Array.from(set);

    function countsolved(name) {
      let solved = 0;
      for (let i = 0; i < thirdElementData.length; i++) {
        let solverName = name;
        if (
          (thirdElementData[i].status == "SAT" &&
            thirdElementData[i].name == solverName) ||
          (thirdElementData[i].status == "UNSAT" &&
            thirdElementData[i].name == solverName)
        ) {
          solved++;
        }
      }
      let total = solved;
      //   console.log(name, total)
      return total;
    }

    function countunsolved(name) {
      let unsolved = 0;
      for (let i = 0; i < thirdElementData.length; i++) {
        let solverName = name;
        if (
          thirdElementData[i].status == "UNKNOWN" &&
          thirdElementData[i].name == solverName
        ) {
          unsolved++;
        }
      }
      let total = unsolved;
    //   console.log(name, total);
      return total;
    }

    let tableausolved = [];
    let tableauunsolved = [];

    for (let i = 0; i < names.length; i++) {
      if (
        names[i].toLowerCase() === "ace" ||
        names[i].toLowerCase() === "picat"
      ) {
        let solvednumber = countsolved(names[i]);
        tableausolved.push(solvednumber);
      }
    }

    for (let i = 0; i < names.length; i++) {
      if (
        names[i].toLowerCase() === "ace" ||
        names[i].toLowerCase() === "picat"
      ) {
        let unsolvednumber = countunsolved(names[i]);
        tableauunsolved.push(unsolvednumber);
      }
    }

    let sorted = tableausolved.slice().sort((a, b) => a - b);
    let sortedNames = [];
    sortedNames.push("ACE");
    sortedNames.push("Picat");
    // console.log("sorted", sorted)

    new Chart(document.getElementById("comparaisons"), {
      type: "bar",
      data: {
        labels: sortedNames,
        datasets: [
          {
            label: "Nombres de puzzles résolus",
            data: sorted,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
          },
          {
            label: "Nombres de puzzles non résolus",
            data: tableauunsolved,
            backgroundColor: "rgb(54, 162, 235)",
            borderColor: "rgb(54, 162, 235)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
})();
