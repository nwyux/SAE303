let pzls = document.querySelector('.pzls');
let puzzles = document.querySelector('.puzzles');
pzls.addEventListener('mouseover', function() {
  puzzles.classList.toggle('hidden');
});

export default function time() {
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

}

export default function nbpuzzles() {
    let set = new Set(thirdElementData.map(row => row.name), thirdElementData.map(row => row.status));
    let names = Array.from(set);


    function countsolved(name) {
      let solved = 0
      for (let i = 0; i < thirdElementData.length; i++) {
        let solverName = name;
        if (thirdElementData[i].status == 'SAT' && thirdElementData[i].name == solverName || thirdElementData[i].status == 'UNSAT' && thirdElementData[i].name == solverName) { solved++ };
      };
      let total = solved;
      // console.log(name, total)
      return total
    }
}