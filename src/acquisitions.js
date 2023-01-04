import { Chart } from 'chart.js/auto'

let i = 0;

(async function puzzles() {

  const req = new XMLHttpRequest();
  req.addEventListener("load", evt => {
    let data = JSON.parse(req.responseText);
    let thirdElementData = data[2].data;
    for (let i = 0; i < thirdElementData.length; i++) {
    };
    construct(thirdElementData);
  });
  req.open("GET", "http://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json");
  req.send()

  function construct(thirdElementData) {

    let set = new Set(thirdElementData.map(row => row.name), thirdElementData.map(row => row.status));
    let names = Array.from(set);


    function countsolved(name) {
      let solved = 0
      for (let i = 0; i < thirdElementData.length; i++) {
        let solverName = name;
        if (thirdElementData[i].status == 'SAT' && thirdElementData[i].name == solverName || thirdElementData[i].status == 'UNSAT' && thirdElementData[i].name == solverName) { solved++ };
      };
      let total = solved;
      console.log(name, total)
      return total
    }

    let tableausolved = []

    for (let i = 0; i < names.length; i++) {
      let solvednumber = countsolved(names[i])
      tableausolved.push(solvednumber)
    }

    console.log("tableau solved", tableausolved)

    let sorted = tableausolved.slice().sort((a,b) => a-b);
    let sortedNames = [];
    for (let i = 0; i < sorted.length; i++) {
      let index = tableausolved.indexOf(sorted[i]);
      sortedNames.push(names[index]);
    }
    console.log("sorted", sorted)

    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'polarArea',
        data: {
          labels: sortedNames,
          datasets: [
            {
              label: 'Nombres de puzzles résolus',
              data: sorted,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Le plus grand nombre de puzzles résolus'
            }
          }
        },
      }
    );

  }
})();