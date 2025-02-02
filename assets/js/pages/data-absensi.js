"use strict";
var manageMemberTable;
	$(document).ready(function() {
		$('#tglabsen').datepicker({
			format: 'yyyy-mm-dd',
			autoclose:true
		});
		var smt=$('#smt').val();
		var tapel=$('#tapel').val();
		var kelas=$('#kelas').val();
		manageMemberTable = $('#manageMemberTable').DataTable( {
			pageLength: 5,
			lengthMenu: [
			 [5, 10, 20],
			 [5, 10, 20],
			],
			autoWidth: !1,
			responsive: !0,
			"destroy":true,
			"searching": false,
			"paging":false,
			"ajax": "modul/rapor/data-absen.php?kelas="+kelas+"&tapel="+tapel+"&smt="+smt,
			"order": []
		} );
		$('#kelas').change(function(){
			//Mengambil value dari option select kd kemudian parameternya dikirim menggunakan ajax
			var smt=$('#smt').val();
			var tapel=$('#tapel').val();
			var kelas=$('#kelas').val();
			manageMemberTable = $('#manageMemberTable').DataTable( {
				pageLength: 5,
				lengthMenu: [
				 [5, 10, 20],
				 [5, 10, 20],
				],
				autoWidth: !1,
				responsive: !0,
				"destroy":true,
				"searching": false,
				"paging":false,
				"ajax": "modul/rapor/data-absen.php?kelas="+kelas+"&tapel="+tapel+"&smt="+smt,
				"order": []
			} );
		});
		$(document).on('click', '#getAbsensi', function(e){
		
			e.preventDefault();
			
			var tabsen=$('#tglabsen').val();
			var smt=$('#smt').val();
			var tapel=$('#tapel').val();
			var kelas=$('#kelas').val();
			PopupCenter('cetak/cetakabsen.php?tanggal=' +tabsen+'&smt='+smt+'&kelas='+kelas+'&tapel='+tapel, 'Cetak Absensi',800,800);
		});
		$('#syncabsen').on('show.bs.modal', function (e) {
            var rowid = $(e.relatedTarget).data('id');
			var rowsmt = $(e.relatedTarget).data('smt');
			var rowtapel = $(e.relatedTarget).data('tapel');
            //menggunakan fungsi ajax untuk pengambilan data
            $.ajax({
                type : 'post',
                url : 'modul/rapor/syncabsen.php',
                data :  'rowid='+ rowid +'&smt='+rowsmt+'&tapel='+rowtapel,
				beforeSend: function()
				{	
					$(".fetched-data").html('<div class="block block-rounded"><div class="block-content">Loading.....<br/><div class="spinner-grow spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-danger" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-light" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div></div>');
				},
                success : function(data){
					$('.fetched-data').html(data);//menampilkan data ke dalam modal
                }
            });
         });
		$('#tambahAbsen').on('show.bs.modal', function (e) {
            var rowid = $(e.relatedTarget).data('pdid');
			var rowtgl = $(e.relatedTarget).data('tgls');
			var rowtapel = $(e.relatedTarget).data('tapel');
			var rowsmt = $(e.relatedTarget).data('smt');
			var rowkelas = $(e.relatedTarget).data('kelas');
            //menggunakan fungsi ajax untuk pengambilan data
            $.ajax({
                type : 'post',
                url : 'modul/rapor/modal_absen.php',
                data :  'rowid='+ rowid +'&kelas='+rowkelas+'&tapel='+rowtapel+'&tgl='+rowtgl+'&smt='+rowsmt,
				beforeSend: function()
				{	
					$(".fetched-data").html('<div class="block block-rounded"><div class="block-content">Loading.....<br/><div class="spinner-grow spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-secondary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-danger" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-light" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow spinner-grow text-dark" role="status"><span class="sr-only">Loading...</span></div></div></div>');
				},
                success : function(data){
					$('.fetched-data').html(data);//menampilkan data ke dalam modal
				}
            });
        });
	});
	function PopupCenter(pageURL, title,w,h) {
		var left = (screen.width/2)-(w/2);
		var top = (screen.height/2)-(h/2);
		var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	};
	