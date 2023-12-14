import { Chart } from 'chart.js/auto'

let i = 0;



(async function dimensions () {

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

    let sett = new Set(thirdElementData.map(row => row.fullname));
    let fullnames = Array.from(sett);
    

    function timesolved(name) {
      let time = 0;
      for (let i = 0; i < thirdElementData.length; i++) {
        let solverName = name;
        if (thirdElementData[i].name == solverName) { time = time+Number(thirdElementData[i].time)};
      };
      let total = time/fullnames.length;
      // console.log(name,"time", total)
      return total
    }

    let tableausolved = []

    for (let i = 0; i < names.length; i++) {
      let solvednumber = timesolved(names[i])
      tableausolved.push(solvednumber)
    }

    let sorted = tableausolved.slice().sort((a,b) => a-b);
    let sortedNames = [];
    for (let i = 0; i < sorted.length; i++) {
      let index = tableausolved.indexOf(sorted[i]);
      sortedNames.push(names[index]);
    }
    // console.log("sorted", sorted)

    new Chart(
      document.getElementById('dimensions'),
      {
        type: 'bar',
        data: {
          labels: sortedNames,
          datasets: [
            {
              label: 'Temps de résolution moyen de tous les puzzles en seconde',
              data: sorted,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
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
              text: 'Temps de résolution moyen de tous les puzzles'
            }
          }
        },
      }
    );

  }
})();

