<?

/*  이 파일의 실제 경로 :  /application/models/home_model.php    */

	class calendar_model extends CI_Model {

		public function __construct()
		{
			$this->load->database();
		}

		public function insertSchedule($calendar_title, $calendar_start_date, $calendar_end_date)
		{
			$sql = " insert into calendar_event(title, start, end) values(?, ?, ?) ";
			return $this->db->query($sql, array($calendar_title, $calendar_start_date, $calendar_end_date));
		}

		public function deleteSchedule($calendar_id)
		{
			$sql = " delete from calendar_event where caID=? ";
			return $this->db->query($sql, array($calendar_id));
		}

		public function updateSchedule($calendar_id, $calendar_start_date, $calendar_end_date)
		{
			$sql = " update calendar_event set start=?, end=? where caID=? ";
			return $this->db->query($sql, array($calendar_start_date, $calendar_end_date, $calendar_id));
		}

		public function getevent()
		{
			$SQL = " select caID, title, start, end from calendar_event ";
			$query = $this->db->query($SQL);
			return $query->result_array();
		}
	}
?>