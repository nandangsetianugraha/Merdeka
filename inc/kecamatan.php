<?phpinclude("db_connect.php");$id_kab = $_GET['id_kabupaten'];echo "<option value='0'>Pilih Kecamatan</option>";$sql3 = "select * from kecamatan where id_kabupaten='$id_kab'";$query3 = $connect->query($sql3);while($nk=$query3->fetch_assoc()){  echo "<option value='".$nk['id']."'>".$nk['nama']."</option>";}?>