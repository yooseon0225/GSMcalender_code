var num = 1;

function changeGcImg(idx){ //idx를 가진 ChangeGcImg 함수생성
    if (idx) {
        if(num == 6) return; //6번째 그림에서 다음을 클릭하는 경우 강제 종료
        num ++;
    }else {
        if (num == 1) return; //1번째 그림에서 이전을 클릭하는 경우 강제 종료
        num--;
    }
    var imgTag = document.getElementById("GcImg");
    // getElementById : 주어진 문자열의 속성을 가진 요소를 찾고, 이를 나타내는 Element 객체로 반환
    //id 없는 요소에 접근하는 경우 : Document.querySelector();를 사용
    imgTag.setAttribute("src", "images/img0"+num+".jpg");
    // GcImg라는 id를 가진 값의 src 속성을 "images/img0"+num+".jpg"로 변경
    // setAttribute : id 값의 속성을 변경
    // setAttribute ("속성", "변경값");
    
}