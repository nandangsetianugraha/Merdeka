<?phprequire_once '../../inc/db_connect.php';
$kelas=$_GET['kelas'];$mp=$_GET['mp'];$materi=$_GET['materi'];$ab=substr($kelas,0,1);$sql = "select * from tp where kelas='$ab' and lm='$materi' and mapel='$mp' order by tp asc";$query = $connect->query($sql);echo "<option value='0'>Pilih Tujuan Pembelajaran</option>";while($s=$query->fetch_assoc()) {	echo "<option value='".$s['tp']."'>".$s['nama_tp']."</option>";}
?>