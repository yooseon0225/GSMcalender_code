const now = new Date();

const now = new Date();

const today = {
  year: now.getFullYear(),
  date: now.getDate(),
  month: now.toLocaleString('en-US', {month: 'short'}),
  day: now.toLocaleString('en-US', {weekday: 'short'}),
}

const now = new Date();

const today = {
    year: now.getFullYear(),
    date: now.getDate(),
    month: now.toLocaleString('en-US', {month: 'short'}),
    day: now.toLocaleString('en-US', {weekday: 'short'})
}

document.getElementById('year').textContext = today.year;
document.getElementById('month').textContent = today.month;
document.getElementById('date').textContent = today.date;
document.getElementById('day').textContent = today.day;

const now = new Date();

const today = {
    year: now.getFullYear(),
    date: now.getDate(),
    month: now.toLocaleString('en-US', {month: 'short'}),
    day: now.toLocaleString('en-US', {weekday: 'short'})
}

for (let key in today) {
    document.getElementById(key).textContent = today[key];    
}
