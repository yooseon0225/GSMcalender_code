<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*  이 파일의 실제 경로 :  /application/controllers/calendar.php    */
class Calendar extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('calendar_model');
	}

	public function index()
	{
		$data = array();
		$this->load->view('calendar', $data);
	}

	public function insertSchedule()
	{
		$calendar_title = $this->input->post("calendar_title");
		$calendar_start_date = $this->input->post("calendar_start_date");
		$calendar_end_date = $this->input->post("calendar_end_date");

		$result = $this->calendar_model->insertSchedule($calendar_title, $calendar_start_date, $calendar_end_date);
		echo "OK";
	}

	public function deleteSchedule()
	{
		$calendar_id = $this->input->post("calendar_id");
		$result = $this->calendar_model->deleteSchedule($calendar_id);
		echo "OK";
	}

	public function updateSchedule()
	{
		$calendar_id = $this->input->post("calendar_id");
		$calendar_start_date = $this->input->post("calendar_start_date");
		$calendar_end_date = $this->input->post("calendar_end_date");
		$result = $this->calendar_model->updateSchedule($calendar_id, $calendar_start_date, $calendar_end_date);
		echo "OK";
	}

	public function getevent()
	{
		$ret_arr = array();
		$result = $this->calendar_model->getevent();
		foreach($result as $row)
		{
			$row_array['id'] = urlencode($row["caID"]);
			$row_array['title'] = urlencode($row["title"]);
			$row_array['start'] = urlencode($row["start"]);
			$row_array['end'] = urlencode($row["end"]);
			array_push($ret_arr, $row_array);
		}

		echo urldecode(json_encode($ret_arr));	
	}
}
