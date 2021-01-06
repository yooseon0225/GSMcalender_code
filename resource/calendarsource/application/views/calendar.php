<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>일정 관리</title>

	<style type="text/css">

	::selection{ background-color: #E13300; color: white; }
	::moz-selection{ background-color: #E13300; color: white; }
	::webkit-selection{ background-color: #E13300; color: white; }

	body {
		background-color: #fff;
		margin: 40px;
		font: 13px/20px normal Helvetica, Arial, sans-serif;
		color: #4F5155;
	}

	#body{
		margin: 0 15px 0 15px;
	}


	#script-warning {
	display: none;
	background: #eee;
	border-bottom: 1px solid #ddd;
	padding: 0 10px;
	line-height: 40px;
	text-align: center;
	font-weight: bold;
	font-size: 12px;
	color: red;
	}

	#loading {
	display: none;
	position: absolute;
	top: 10px;
	right: 10px;
	}

	</style>
	<link href='/css/fullcalendar.min.css' rel='stylesheet' />
	<link href='/css/fullcalendar.print.min.css' rel='stylesheet' media='print' />
	<link href="/css/main.css" rel="stylesheet" type="text/css"></link>
	<script src='/js/moment.min.js'></script>
	<script src="/js/jquery-1.10.1.min.js" type="text/javascript"></script>
	<script src="/js/juery.bpopup.min.js" type="text/javascript"></script>
	<script src='/js/fullcalendar.min.js'></script>
	<script src='/js/fullcalendar_ko.js'></script>
<script>
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
					}
				});
			  }
			});
	  });

	function addSchedule()
	{
		var htmlsContents = "";
		htmlsContents += "<div style='width:100%; height:30px'><div style='width:30%;float:left; padding-left:30px'>일정 명칭</div><div style='width:60%;float:right'><input type='text' id='calendar_title' value=''></div></div>";
		htmlsContents += "<div style='width:100%; height:30px'><div style='width:30%;float:left; padding-left:30px'>시작 날짜</div><div style='width:60%;float:right'><input type='text' id='calendar_start_date' value='' style='width:80px'></div></div>";
		htmlsContents += "<div style='width:100%; height:30px'><div style='width:30%;float:left; padding-left:30px'>마침 날짜</div><div style='width:60%;float:right'><input type='text' id='calendar_end_date' value='' style='width:80px'></div></div>";
		htmlsContents += "<div style='width:100%; text-align:center; height:30px; margin-bottom:15px; margin-top:10px'><button onclick=\"javascript:saveSchedule();\">저장하기</button></div>";
		openPopup("일정 등록",htmlsContents, 400);
	}

	function openPopup(subject,contents, widths)
	{
		$("#alert_subject").html(subject);
		$("#alert_contents").html(contents);
		openMessage('winAlert',widths)
	}

	function saveSchedule()
	{
		var calendar_title = $("#calendar_title").val();
		var calendar_start_date = $("#calendar_start_date").val();
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

		$.ajax({
		  type: 'POST',  
		  url: "/calendar/insertSchedule",
		  data: { calendar_title: calendar_title, calendar_start_date: calendar_start_date, calendar_end_date : calendar_end_date},
		  cache: false,
		  async: false
		})
		.done(function( result ) {
			if(result == "OK")
			{
				closeMessage('winAlert');
				alert("정상 저장되었습니다.");
				$('#calendar').fullCalendar("refetchEvents");
			}
		});
	}

	function openMessage(IDS,widths)
	{
		$('#'+IDS).css("width",widths+"px");
		$('#'+IDS).bPopup();
	}

	function closeMessage(IDS)
	{
		$('#'+IDS).bPopup().close();
	}
</script>
</head>
<body>
<div id='script-warning'>
	실행 오류!
</div>
<div style="max-width:900px; margin: 0 auto; height:30px">
	<div style="float:right">
		<button onclick="javascript:addSchedule();">일정 등록</button>
	</div>
</div>
<div id='calendar' style="max-width:900px; margin: 0 auto;">
</div>

  <div class="box box-success" style="width:500px; display:none; background-color:white" id="winAlert">
	<div class="box-header with-border" style="background-color:white; padding-left:15px">
	  <h3 class="box-title" id="alert_subject" style="background-color:white"></h3>
	</div><!-- /.box-header -->
	<div class="box-body" id="alert_contents" style="font-size:15px;background-color:white">

	</div><!-- /.box-body -->
 </div><!-- /.box -->
</body>
</html>