const date = new Date();
const viewYear = date.getFullYear();    
const viewMonth=new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" );
document.querySelector('.year-month').textContent = (viewMonth[date.getMonth()]+" "+date.getFullYear());

  // 지난 달 마지막 Date, 이번 달 마지막 Date
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

// Dates 기본 배열들
const prevDates = [];
const thisDates = [...Array(TLDate + 1).keys()].slice(1);
const nextDates = [];

// prevDates 계산
if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
    prevDates.unshift(PLDate - i);
    }
}

// nextDates 계산
for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i)
}

// Dates 합치기
const dates = prevDates.concat(thisDates, nextDates);

// Dates 정리
dates.forEach((date, i) => {
  dates[i] = `<div class="date">${date}</div>`;
})

// Dates 그리기
document.querySelector('.dates').innerHTML = dates.join('');

viewMonth();
viewYear();