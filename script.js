// Updated Dataset
const data = [
  { "Class Name": "Bare Land", "Loss": 7.0236, "Gain": 9.5256, "Unchanged": 3.2643, "Changed": 0.76647367 },
  { "Class Name": "Vegetation", "Loss": 4.0419, "Gain": 8.3232, "Unchanged": 1.8252, "Changed": 2.34566075 },
  { "Class Name": "Agriculture", "Loss": 11.7027, "Gain": 8.2422, "Unchanged": 2.8512, "Changed": -1.213699495 },
  { "Class Name": "HSP", "Loss": 32.4612, "Gain": 13.8078, "Unchanged": 38.6829, "Changed": -0.482213071 },
  { "Class Name": "Settlement", "Loss": 11.2167, "Gain": 25.7202, "Unchanged": 60.867, "Changed": 0.238281828 },
  { "Class Name": "Fellow Land", "Loss": 2.7837, "Gain": 2.3508, "Unchanged": 1.1817, "Changed": -0.366336634 },
  { "Class Name": "Water Body", "Loss": 2.3607, "Gain": 3.6207, "Unchanged": 8.0379, "Changed": 0.156757362 }
];

// Render table headers
const headers = Object.keys(data[0]);
document.getElementById('table-head').innerHTML =
  `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

// Render table body
document.getElementById('data-table').innerHTML =
  data.map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('');

// Render bar chart (Gain vs Loss)
Plotly.newPlot('barChart', [
  {
    x: data.map(d => d["Class Name"]),
    y: data.map(d => d.Gain),
    name: 'Gain',
    type: 'bar',
    marker: { color: '#2ca02c' }
  },
  {
    x: data.map(d => d["Class Name"]),
    y: data.map(d => d.Loss),
    name: 'Loss',
    type: 'bar',
    marker: { color: '#d62728' }
  }
],);

// Draw pie chart (initial = Changed)
function drawPieChart(type) {
  const values = type === 'Changed'
    ? data.map(d => Math.abs(d.Changed))
    : data.map(d => d.Unchanged);

  const labels = data.map(d => d["Class Name"]);

  Plotly.newPlot('pieChart', [{
    values: values,
    labels: labels,
    type: 'pie',
    hole: 0.4,
    textinfo: 'label+percent',
    pull: 0.05,
    marker: {
      colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0']
    }
  }], );
}

// Animate update of pie chart
function updatePieChart(type) {
  const values = type === 'Changed'
    ? data.map(d => Math.abs(d.Changed))
    : data.map(d => d.Unchanged);

  Plotly.animate('pieChart', {
    data: [{ values: values }],
   
  }, {
    transition: { duration: 600, easing: 'cubic-in-out' },
    frame: { duration: 400 }
  });
}

// Initialize pie chart
drawPieChart('Changed');

// Dropdown handler
document.getElementById('valueTypeSelect').addEventListener('change', (e) => {
  updatePieChart(e.target.value);
});

// Dark mode toggle
document.getElementById('toggleDarkMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});






  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  