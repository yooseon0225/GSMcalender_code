
$(document).ready(function() {
    $('#calendar').fullCalendar({
        editable: true,
        navLinks: true,
        eventLimit: true,
        locale : "ko",
        events: {
        url: '/calendar/getevent',
        error: function() {
            $('#script-warning').show();
        }
        },
        eventDrop: function(event, delta, revertFunc) {
        $.ajax({
            type: 'POST',  
            url: "/calendar/updateSchedule",
            data: { calendar_id: event.id, calendar_start_date: event.start.format(), calendar_end_date : event.end.format()},
            cache: false,
            async: false
        })
        .done(function( result ) {
            if(result == "OK")
            {
                $('#calendar').fullCalendar("refetchEvents");
            }
        });
        },
        eventClick: function(calEvent, jsEvent, view) {
        if(!confirm("일정 '"+calEvent.title+"'을 삭제하시겠습니까?"))
        {
            return false;
        }


        $.ajax({
            type: 'POST',  
            url: "/calendar/deleteSchedule",
            data: { calendar_id: calEvent.id},
            cache: false,
            async: false
        })
        .done(function( result ) {
            if(result == "OK")
            {
                alert("정상 삭제되었습니다.");
                $('#calendar').fullCalendar("refetchEvents");
                //새로 고침
            }
        });
        }
    });
});

function addSchedule()
{
    var htmlsContents = "";
    htmlsContents += "<div style='width:100%; height:30px'><div style='width:30%;float:left; padding-top:10px; padding-left:50px'>일정 명칭</div><div style='width:60%;  padding-top:10px; float:right'><input type='text' id='calendar_title' value=''></div></div>";
    htmlsContents += "<div style='width:100%; height:30px'><div style='width:30%;float:left; padding-top : 6px; padding-left:50px'>시작 날짜</div><div style='width:60%; padding-top : 6px; float:right'><input type='text' id='calendar_start_date' value='' style='width:80px'></div></div>";
    htmlsContents += "<div style='width:100%; height:30px'><div style='width:30%;float:left; padding-top:3px; padding-left:50px'>마침 날짜</div><div style='width:60%; padding-top:3px; float:right'><input type='text' id='calendar_end_date' value='' style='width:80px'></div></div>";
    htmlsContents += "<div style='width:100%; text-align:center; height:30px; margin-bottom:15px; margin-top:10px'><button style='background-color:white; width:100px; height: 30px; font-size: 15px; font-weight:bold; border:2px solid #2e3250; border-radius:5px; outline:none; color:#2e3250'  onclick=\"javascript:saveSchedule();\"> 저장하기</button></div>";
    openPopup("일정 등록",htmlsContents, 400);
}

// 일정 입력시 h3으로 감
function openPopup(subject,contents, widths)
{
    $("#alert_subject").html(subject);
    $("#alert_contents").html(contents);
    openMessage('winAlert',widths)
}

function saveSchedule()
{
    //일정 이름
    var calendar_title = $("#calendar_title").val();
    //일정 시작 날짜
    var calendar_start_date = $("#calendar_start_date").val();
    //일정 마침 날짜
    var calendar_end_date = $("#calendar_end_date").val();

    if(!calendar_title)
    {
        alert("일정 명칭을 입력해 주세요.");
        return false;
    }
    if(!calendar_start_date)
    {
        alert("시작 날짜를 입력해 주세요.");
        return false;
    }
    if(!calendar_end_date)
    {
        alert("마침 날짜를 입력해 주세요.");
        return false;
    }

    //서버와 통신

    $.ajax({
        type: 'POST',  
        url: "/calender/insertSchedule",
        data: { calendar_title: calendar_title, calendar_start_date: calendar_start_date, calendar_end_date : calendar_end_date},
        cache: false,
        async: false
    })
    .done(function( result ) {
        if(result == "OK")
        //result ok의 경우 팝업창 닫기
        {
            closeMessage('winAlert');
            alert("정상 저장되었습니다.");
            $('#calendar').fullCalendar("refetchEvents");

            //새로 고침
        }
    });
}

//팝업 띄우기

function openMessage(IDS,widths)
{
    $('#'+IDS).css("width",widths+"px");
    $('#'+IDS).bPopup();
}

function closeMessage(IDS)
{
    $('#'+IDS).bPopup().close();
}
