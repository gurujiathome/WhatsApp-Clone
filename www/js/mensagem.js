$(function(){
	
	mensagem = {
		
		user_id: localStorage.getItem( 'user_id' ),
		
		init: function(){
			
			$( '#mensagem' ).on( 'focus', function(){
				mensagem.enviar();
			});
			
			$( '#mensagem' ).on( 'keydown', function( event ){
				
				if( event.which == 13 ){
					mensagem.enviar();
				}
			});
			
			
			mensagem.listar();
			
		}, 
		
		listar: function(){
		
			$.ajax({
				url: "http://appserverbr.local/wp-json/whatsapp/v1/privado/556484148804", 
				type: "GET"
			}).done(function( resposta ){
				
				console.log( resposta );
				html = "";
				$.each( resposta, function( index, valor ){
					
					// quando for uma mensagem minha, posicionar a direita
					if( valor.user_id == mensagem.user_id ){
						define_lado = 'right';
					}else{
						define_lado = 'left';
					}
					
					
					html += '<div class="padded-full text-right">';
					html += '	<p class="padded-left">';
					html += '		<span class="texto">'+ valor.mensagem +'</span> ';
					html += '		<span class="hora">'+ valor.data +'</span>';
					html += '		<a name="mensagem-'+ valor.id +'"></a>';
					html += '	</p>';
					html += '</div>';
					
				});
				
				$( '.conversa' ).append( html );
				
				$(".conversa").animate({scrollTop: $('.conversa').prop("scrollHeight")}, 500);
				
			}).fail(function( x, t, m ){
				
				// sempre que a conexão estiver lenta
				if( t==="timeout" ){
					phonon.alert( 'O servidor não está respondendo neste momento, tente novamente mais tarde.', "Problemas com a internet", false );
				}
				
			});
		},
		
		enviar: function(){
			
			elemento = $( "#mensagem" );
			texto = elemento.val();
			elemento.val('');
		
			if( texto != '' ){
				
				$.ajax({
					url: "http://appserverbr.local/wp-json/whatsapp/v1/enviar", 
					type: "POST"
				}).done(function( resposta ){
					
					console.log( resposta );
					html = "";
					$.each( resposta, function( index, valor ){
						
						// quando for uma mensagem minha, posicionar a direita
						if( valor.user_id == mensagem.user_id ){
							define_lado = 'right';
						}else{
							define_lado = 'left';
						}
						
						
						html += '<div class="padded-full text-right">';
						html += '	<p class="padded-left">';
						html += '		<span class="texto">'+ valor.mensagem +'</span> ';
						html += '		<span class="hora">'+ valor.data +'</span>';
						html += '		<a name="mensagem-'+ valor.id +'"></a>';
						html += '	</p>';
						html += '</div>';
						
					});
					
					$( '.conversa' ).append( html );
					$( '.conversa div:last' ).slideDown( 'slow', 'easeOutBounce' );
					$(".conversa").animate({scrollTop: $('.conversa').prop("scrollHeight")}, 500);
					
				}).fail(function( x, t, m ){
					
					// sempre que a conexão estiver lenta
					if( t==="timeout" ){
						phonon.alert( 'O servidor não está respondendo neste momento, tente novamente mais tarde.', "Problemas com a internet", false );
					}
					
				});
			}
		},
		
		apagar: function(){
			
		}
	}
});