

let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear();    
    const viewMonth= new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" );

    var yearMonth = document.querySelector('.year-month').textContent = (viewMonth[date.getMonth()]+" "+date.getFullYear());

    const prevLast = new Date(date.getFullYear(), date.getMonth(), 0);
    const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
        }
    }
    
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }


    const dates = prevDates.concat(thisDates, nextDates);

    dates.forEach((date, i) => {
    dates[i] = `<div class="date">${date}</div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');

  }
  
renderCalendar();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}
  
const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}
  
const goToday = () => {
    date = new Date();
    renderCalendar();
}

// Dates 정리
const firstDateIndex = dates.indexOf(1);
const lastDateIndex = dates.lastIndexOf(TLDate);
dates.forEach((date, i) => {
const condition = i >= firstDateIndex && i < lastDateIndex + 1
                    ? 'this'
                    : 'other';

dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
})

const today = new Date();
  if (viewMonth === today.getMonth && viewYear === today.getFullYear) {
    for (let date of document.querySelectorAll('this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
}