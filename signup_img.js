var num = 1;

function changeGcImg(idx){
    // idx라는 매개변수를 활용하여 changeGcImg 함수를 생성
    if(dix){
        if(num == 6) return;
        num++;
    }
    else{
        if(num == 1) return;
        num--;
    }

    var imgTag = document.getElementById("GcImg");
    imgTag.setAttribute("src","images/gc_img"+num+".png");
    
}