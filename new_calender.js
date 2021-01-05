

let date = new Date();

const renderCalendar = () => {

    const viewYear = date.getFullYear();  
    //원하는 값 넣기  
    const viewMonth = date.getMonth();
    const MonthWord = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" );

    // 배열[달] = 원하는 값
    var yearMonth = document.querySelector('.year-month').textContent = (MonthWord[date.getMonth()]+" "+date.getFullYear());

    // 지난 달의 마지막 날을 구함 (다음 달 처음을 만들기 위함) 
    const prevLast = new Date(date.getFullYear(), date.getMonth(), 0);
    // 이번 달의 마지막 날을 구함
    const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // Dates 기본 배열들

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

    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                        ? 'this'
                        : 'other';

        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    })

    
    // 데이터 그리기
    document.querySelector('.dates').innerHTML = dates.join('');
    
    //오늘 날짜 설정
    const today = new Date();
    if (viewYear == today.getFullYear && viewMonth == today.getMonth) {
      for (let date of document.querySelectorAll('this')) {
        if (+date.innerText == today.getDate()) {
          date.classList.add('today');
          break;
        }
      }
    }

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