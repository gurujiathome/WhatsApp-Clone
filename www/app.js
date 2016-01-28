phonon.options({

	navigator: {
	    defaultPage: 'principal',
	    hashPrefix: '!', 
	    animatePages: true,
	    enableBrowserBackButton: true,
	    templateRootDirectory: './paginas',
	    useHash: true
	}
	
});


// atalho para acessar a classe
app = phonon.navigator();


app.on({page: 'principal', content: 'principal.html', preventClose: false, readyDelay: 1}, function(activity){

    activity.onReady(function(){
		
		
		// conta todas as mensagens não lidas
		funcoes.totalMsg();
		
		//phonon.tab().setCurrentTab( 'principal', 1 );
	});

    //activity.onTransitionEnd(function(){});

    activity.onTabChanged(function(){
		
		$( document ).on( 'click', '.tab-items a', function(){
			
			elemento = $( this ).attr( 'id' );
			
			// exibe no console o ID da aba clicada
			//console.log( "aba #"+ elemento );
			
			
			// remove a class de todos os itens
			$( '.tab-item' ).removeClass( 'ativo' );
			$( '.tab-item span' ).removeClass( 'ativo' );
			
			// adiciona a classe no item clicado
			$( '#'+ elemento ).addClass( 'ativo' );
			
			// verificando se foi clicado na aba conversas
			if( elemento == 'conversas' ){
				$( '.msg-nao-lido-total' ).addClass( 'ativo' );
			}
		});
		
	});
});




app.on({page: 'privado', content: 'privado.html', preventClose: false, readyDelay: 1}, function(activity){

    //activity.onCreate(function(){});

    activity.onReady(function(){
		
		$( '#mensagem' ).on( 'focus', function(){
			
			str_mensagem = $( this ).val();
			
			if( str_mensagem == 'Digite aqui...' ){
				$( this ).val('');
			}
			
		});
		
		mensagem.init();
	});

    //activity.onTransitionEnd(function(){});

    //activity.onHidden(function(){});

	
    activity.onHashChanged(function( usuario_id, usuario_nome ){
		
		// adicionando o titulo da janela
		$( '.privado .title' ).text( usuario_nome );
	});

    //activity.onTabChanged(function(){});
});


/*
app.on({page: 'grupo', content: 'grupo.html', preventClose: false, readyDelay: 1}, function(activity){

    activity.onCreate(function(){});

    activity.onReady(function(){});

    activity.onTransitionEnd(function(){});

    activity.onHidden(function(){});

    activity.onHashChanged(function(paramentro){});

    activity.onTabChanged(function(){});
});


app.on({page: 'perfilGrupo', content: 'perfilGrupo.html', preventClose: false, readyDelay: 1}, function(activity){

    activity.onCreate(function(){});

    activity.onReady(function(){});

    activity.onTransitionEnd(function(){});

    activity.onHidden(function(){});

    activity.onHashChanged(function(paramentro){});

    activity.onTabChanged(function(){});
});


app.on({page: 'perfilUsuario', content: 'perfilUsuario.html', preventClose: false, readyDelay: 1}, function(activity){

    activity.onCreate(function(){});

    activity.onReady(function(){});

    activity.onTransitionEnd(function(){});

    activity.onHidden(function(){});

    activity.onHashChanged(function(paramentro){});

    activity.onTabChanged(function(){});
});
*/


// iniciando a aplicação
app.start();