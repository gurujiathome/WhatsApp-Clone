/** FUNÇÕES PARA AUXILIO */

// aguarda o carregamento da biblioteca JavaScript
$(function(){
	
	// iniciando a classe funcoes
	funcoes = {
		
		init: function(){},
		
		totalMsg: function(){
			
			// contador para auxiliar no calculo
			total = 0;
			
			$( '.conversas .msg-nao-lido' ).each( function(index, chave){
				
				// somando valores
				total = parseInt( total ) + parseInt( $( this ).text() );
			});
			
			$( '.msg-nao-lido-total' ).text( total );
		}, 
		
		
	}
});