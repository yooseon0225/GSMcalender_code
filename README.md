# GSMcalender
### 학교의 일정을 빠르게 알 수 있고, 자격증 시험, 대회 등 자신의 일정을 편리하고 빠르게 효율적으로 정리할 수 있습니다

* * *

```
const Searching = Search.prototype;
function Search(){
    this.keyword = document.querySelector('input[name = "search"]');
    this.button = document.querySelector('.button-img');
    this.form = doucument.querySelector('.search');
}
new Search();
```
##### 검색기능을 활용하여 일정을 쉽게 찾을 수 있습니다.
* * *

```
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

    
    // 오늘 날짜 그리기
    const today = new Date();
    if (viewMonth == today.getMonth && viewYear == today.getFullYear) {
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
```

#### js Date() 함수를 통하여 달력 데이터를 가지고 왔습니다.



