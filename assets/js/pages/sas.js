"use strict";
var tpTable;
	$(document).ready(function() {
		
		$('#kelas').change(function(){
			//Mengambil value dari option select kd kemudian parameternya dikirim menggunakan ajax
			var kelas=$('#kelas').val();
			$.ajax({
				type : 'GET',
				url : 'modul/materi/mp.php',
				data :  'kelas='+kelas,
				beforeSend: function()
				{	
					$("#nilaiHarian").html('<p class="text-center"><img src="loading.gif"></p>');
				},
				success: function (data) {

					//jika data berhasil didapatkan, tampilkan ke dalam option select mp
					$("#mp").html(data);
					$("#nilaiHarian").html('<div class="alert alert-info alert-dismissible"><h4><i class="icon fa fa-info"></i> Informasi</h4>Silahkan Pilih Mapel</div>');
				}
			});
		});
		$('#mp').change(function(){
			//Mengambil value dari option select kd kemudian parameternya dikirim menggunakan ajax
			var kelas=$('#kelas').val();
			var mp=$('#mp').val();
			var smt=$('#smt').val();
			var tapel=$('#tapel').val();
			$.ajax({
				type : 'GET',
				url : 'modul/penilaian/nilai-sas.php',
				data :  'kelas='+kelas+'&mp='+mp+'&smt='+smt+'&tapel='+tapel,
				beforeSend: function()
				{	
					$("#nilaiHarian").html('<p class="text-center"><img src="loading.gif"></p>');
				},
				success: function (data) {

					//jika data berhasil didapatkan, tampilkan ke dalam option select mp
					$("#nilaiHarian").html(data);
				}
			});
		});
	});