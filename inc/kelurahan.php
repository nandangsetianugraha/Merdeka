<?phpinclude("db_connect.php");$id_kec = $_GET['id_kecamatan'];$sql3 = "select * from desa where id_kecamatan='$id_kec'";$query3 = $connect->query($sql3);echo "<option value='0'>Pilih Desa</option>";while($nk=$query3->fetch_assoc()){  echo "<option value='".$nk['id']."'>".$nk['nama']."</option>";}?>