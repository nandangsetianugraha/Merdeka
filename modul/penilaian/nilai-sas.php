<?phprequire_once '../../inc/db_connect.php';
$kelas=$_GET['kelas'];$mp=$_GET['mp'];$tapel=$_GET['tapel'];$smt=$_GET['smt'];
$ab=substr($kelas,0,1);if($tapel_aktif==$tapel and $smt_aktif==$smt){	$edit=true;}else{	$edit=false;};$sql = "select * from penempatan where tapel='$tapel' and smt='$smt' and rombel='$kelas' order by nama asc";$query = $connect->query($sql);$mapel=$connect->query("select * from mata_pelajaran where id_mapel='$mp'")->fetch_assoc();if($mp==0){	echo "<div class='alert alert-info alert-dismissible'><h4><i class='icon fa fa-info'></i> Informasi</h4>Silahkan Pilih Mapel</div>";}else{?>	<input type="hidden" class="form-control" id="tapel" name="tapel" value="<?=$tapel;?>">	<input type="hidden" class="form-control" id="smt" name="smt" value="<?=$smt;?>">	<table class="table table-striped table-borderless table-vcenter" id="tpTable">        <thead>            <tr>                <th></th>				<th>Nama Siswa</th>				<th class="d-none d-sm-table-cell">Nilai</th>            </tr>        </thead>        <tbody>			<?php 			while($s=$query->fetch_assoc()) {				$idp=$s['peserta_didik_id'];				$siswa=$connect->query("select * from siswa where peserta_didik_id='$idp'")->fetch_assoc();				$filegbr = 'https://sdi-aljannah.web.id/apins/images/siswa/'.$siswa['avatar'];				$file_headerss = @get_headers($filegbr);				if($file_headerss[0] == 'HTTP/1.1 404 Not Found') {					//$exists = false;					$avatarm="https://sdi-aljannah.web.id/apins/images/siswa/user-default.png";				}else {					//$exists = true;					$avatarm='https://sdi-aljannah.web.id/apins/images/siswa/'.$siswa['avatar'];				};				$sql1 = "select * from sas where id_pd='$idp' and kelas='$kelas' and smt='$smt' and tapel='$tapel' and mapel='$mp'";				$nh = $connect->query($sql1);				$m=$nh->fetch_assoc();				if(empty($m['nilai'])){					$nHar='';				}else{					$nHar=number_format($m['nilai'],0);				};				if($edit){					$nh='					<span class="input form-control form-control-sm" contenteditable="true" data-old_value="'.$nHar.'"  onBlur="saveAkhirSumatif(this,\'nilai\',\''.$idp.'\',\''.$ab.'\',\''.$smt.'\',\''.$tapel.'\',\''.$mp.'\')" onClick="highlightEdit(this);">'.$nHar.'</span>					';				}else{					$nh=$nHar;				};			?>			<tr>				<td class="text-center" style="width: 65px;"><img class="img-avatar img-avatar32" src="<?=$avatarm;?>" alt=""></td>				<td>					<?=$siswa['nama'];?>				</td>				<td>					<?=$nh;?>				</td>			</tr>			<?php 			}			?>                          </tbody>    </table><?php };
?><script>	$("#tpTable").DataTable({pageLength:30,lengthMenu:[[10,20,30],[10,20,30]],autoWidth:!1});	function highlightEdit(editableObj) {		$(editableObj).css("background","#FFF0000");	} 	function saveAkhirSumatif(editableObj,column,id,kelas,smt,tapel,mpid) {		// no change change made then return false		if($(editableObj).attr('data-old_value') === editableObj.innerHTML)		return false;		// send ajax to update value		$(editableObj).css("background","#FFF url(loader.gif) no-repeat right");		$.ajax({			url: "modul/penilaian/saveAkhirSumatif.php",			cache: false,			data:'column='+column+'&value='+editableObj.innerHTML+'&id='+id+'&kelas='+kelas+'&smt='+smt+'&tapel='+tapel+'&mp='+mpid,			success: function(response)  {				console.log(response);				// set updated value as old value				$(editableObj).attr('data-old_value',editableObj.innerHTML);				$(editableObj).css("background","#FDFDFD");								}          	   });	}</script>