// procedura per Handlebars: template per messaggio
var source = $("#messaggio-template").html();                         // Clono il template
var template = Handlebars.compile(source);                            // Do in pasto ad handlebars il codice clonato così da farglielo compilare con dei PLACEHOLDERS laddove ho messo delle variabili tra le parentesi graffe

// procedura per Handlebars: template per preview chat
var source2 = $('#preview-template').html();
var template2 = Handlebars.compile(source2);
// creo l'oggetto messaggiArchiviati
var messaggiArchiviati = {
    c0: [
        {
            testoMessaggio: 'Hai più sentito Sofia?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'No, non l\'ho più vista',
            direzione: 'received'
        }
    ],
    c1: [
        {
            testoMessaggio: 'Ciao, come stai?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'bene tu?',
            direzione: 'received'
        }
    ],
    c2: [
        {
            testoMessaggio: 'Ciao come stai??',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'tutto bene!',
            direzione: 'received'
        }
    ],
    c3: [
        {
            testoMessaggio: 'Ciao alla fine sei andato?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'Non poteva essere altrimenti',
            direzione: 'received'
        }
    ],
    c4: [
        {
            testoMessaggio: 'Ciao Luca, passi tu oggi?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'ciao no non riesco chiedi a paolo',
            direzione: 'received'
        }
    ],
    c5: [
        {
            testoMessaggio: 'Ciao Paolo, riesci a passare che luca non può?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'certo non c\'è problema',
            direzione: 'received'
        }
    ],
    c6: [
        {
            testoMessaggio: 'Ciao oggi ci sei?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'ciao No vado da Paolo',
            direzione: 'received'
        }
    ],
    c7: [
        {
            testoMessaggio: 'Ciao vai da mattia?',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'esatto',
            direzione: 'received'
        }
    ],
    c8: [
        {
            testoMessaggio: 'Ciao, spero tu non esca oggi.',
            direzione: 'sent'
        },
        {
            testoMessaggio: 'no oggi no',
            direzione: 'received'
        }
    ]
};

var contatti = {
    c0: {
        nomeContatto: 'Sara',
        ultimoAccesso: '15:56'
    },
    c1: {
        nomeContatto: 'Fabio',
        ultimoAccesso: '16:45'
    },
    c2: {
        nomeContatto: 'Sofia',
        ultimoAccesso: '01:34'
    },
    c3: {
        nomeContatto: 'Marco',
        ultimoAccesso: '13:13'
    },
    c4: {
        nomeContatto: 'Luca',
        ultimoAccesso: '12:12'
    },
    c5: {
        nomeContatto: 'Paolo',
        ultimoAccesso: '11:11'
    },
    c6: {
        nomeContatto: 'Mattia',
        ultimoAccesso: '22:22'
    },
    c7: {
        nomeContatto: 'Giulio',
        ultimoAccesso: '09:22'
    },
    c8: {
        nomeContatto: 'Andrea',
        ultimoAccesso: '10:04'
    }
};

// raggiungo tramite ciclo for-in ogni chiave dell'oggetto messaggiArchiviati
for (var chat in messaggiArchiviati) {
    var numeroChat = chat.substr(1); // ricavo il numero di ogni conversazione eliminando il primo carattere 'c'
    for (var i = 0; i < messaggiArchiviati[chat].length; i++) { // tramite ciclo for raggiungo ogni elemento dell'array all'interno dell'oggetto
        // console.log(messaggiArchiviati[chat][i]);
        var oggettoMessaggio = messaggiArchiviati[chat][i];
        var testoMessaggio = oggettoMessaggio.testoMessaggio;
        var direzione = oggettoMessaggio.direzione;

        var selettoreChat = $('.chat-room-container[data-codice-contatto="' + numeroChat + '"]').children('.main-room');
        // console.log(selettoreChat, 'selettoreChat');
        appendMsg(testoMessaggio, direzione, selettoreChat); // alla funzione appendMsg do come variabili in ingresso le variabili create sopra
    }
};

// utilizzo handlebars per riempire i miei contatti
for (var contatto in contatti) {
    var numeroPreview = contatto.substr(1); // ricavo il numero di ogni conversazione eliminando il primo carattere 'c'
    // console.log(contatti[contatto]);
    var nomeContatto = contatti[contatto].nomeContatto;
    // console.log(nomeContatto);
    var ultimoAccesso = contatti[contatto].ultimoAccesso;
    // console.log(ultimoAccesso);

    var selettorePreview = $('.chat-preview[data-codice-contatto ="' + numeroPreview + '"]').find('.chat-text');
    // console.log(selettorePreview, 'selettore preview');
    appendContatto(nomeContatto, ultimoAccesso, selettorePreview);
};


// cambio icona in base a click/focus
$('#messaggio-input').focus(function() {
    removeMicrophone();
    $('.input-msg').addClass('box-shadow');
}).blur(function() {
    $('.input-msg').removeClass('box-shadow');
    removePaperPlane();
});

// invio messaggio inserito da utente e risposta (dopo click icona invio)
$('.tasto-invio').click(function() {
    invioMsg();
});

// invio messaggio inserito da utente con pressione tastiera 'enter'
$('.input-msg').keydown(function(event) {
    switch (event.which) {
        case 13:
        invioMsg();
        break;
    };
});

// ricerca contatto tramite barra ricerca (milestone 2.2)
$('#find-contact').keyup(function(event) {
    var carattereFiltro = $(this).val().toLowerCase(); // assegno alla variabile il valore del carattere inserito dall'utente e lo rendo minuscolo
    $('.chat-preview h4').each(function() { // confronto il valore inserito dall'utente con OGNUNO degli elementi h4 (dove ci sono i nomi dei contatti)
        if ($(this).text().toLowerCase().includes(carattereFiltro)) { // se il valore digitato dall'utente compare in uno dei miei contatti, allora lo mostro
            $(this).parents('.chat-preview').show();
        } else { // altrimenti lo scarto e quindi non lo visualizzo
            $(this).parents('.chat-preview').hide();
        };
    });
});

// click su chat-preview - overlay rimane evidenziato - hover gestito su CSS
$('.chat-preview').click(function() {
    if ($('.chat-preview').find('.active').is(':visible')) {
        $('.chat-preview').children('.overlay').removeClass('active');
        $(this).children('.overlay').addClass('active');
    } else {
        $(this).children('.overlay').addClass('active');
    }
});

// utilizzo del data per mostrare una chat selezionata con click
$('.left .chat-list .chat-preview').click(function() { // al click della corrispondente chat-preview
    $('.footer-room').show();
    var contatto = $(this).data('codiceContatto'); // associo alla variabile contatto il data-codice-contatto
    // console.log(contatto);
    $('.right .chat-room-container').each(function() { // successivamente confronto i data-codice-contatto LEFT con quelli RIGHT
        if (contatto == $(this).data('codiceContatto')) { // se corrispondono, mostro il data-codice-contatto selezionato al click iniziale
            $('.right .chat-room-container').removeClass('active');
            $(this).addClass('active');
        }
    });
});

// al click icona profilo, viene visualizzata la pagina delle impostazioni account
$('.left .header-list .img-round img').click(function() {
    $('.footer-room').hide();
    var contatto = $(this).data('codiceContatto'); // associo alla variabile contatto il data-codice-contatto
    // console.log(contatto);
    $('.right .chat-room-container').each(function() { // successivamente confronto i data-codice-contatto LEFT con quelli RIGHT
        if (contatto == $(this).data('codiceContatto')) { // se corrispondono, mostro il data-codice-contatto selezionato al click iniziale
            $('.right .chat-room-container').removeClass('active');
            $(this).addClass('active');
        }
    });
})

// al passaggio su chat icona appare box di selezione
$(document).on('mouseenter', 'i.fas.fa-angle-down', function() {
    if($('.edit-message').is(':visible')){
        $('.edit-message').removeClass('active');
        $(this).siblings('.edit-message').addClass('active');
    } else {
        $(this).siblings('.edit-message').addClass('active');
    };
});
// quando il mouse lascia il messaggio il box edit messagge scompare
$(document).on('mouseleave', '.chat-message', function() {
    $('.edit-message').removeClass('active');
});
// al click il messaggio selezionato viene rimosso
$(document).on('click', '.edit-message.active .delete-msg', function() {
    $(this).parents('.chat-message').remove();
});
// al passaggio sull'icona viene mostrata la schermata .left con le chat-preview
$('.fas.fa-bars').mouseenter(function() {
    $('.left').show();
});
// click sulla icona x per chiudere la schermata .left con le chat-preview
$('.fas.fa-times-circle').click(function() {
    $('.left').hide();
});



// // funzione crea messaggio e aggiungi a chat
// function appendMsg(testoInput, sentReceived) {
//     var messaggio = $('.template .chat-message').clone().addClass(sentReceived);
//     messaggio.find('.testo-messaggio').text(testoInput);
//     messaggio.children('.message-time span').html(getTime());
//     $('.active .main-room').append(messaggio);
// };
// funzione crea messaggio e aggiungi a chat attiva ma con uso di handlebars
function appendMsg(testoInput, sentReceived, selettoreChat) {
    var datiMessaggio = {                                             // assemblo in un oggetto il contenuto del messaggio
        testoMessaggio: testoInput,
        direzione: sentReceived,
        orario: getTime()
    };
    var templateMessaggio = template(datiMessaggio);                  // popolo il template di handlebars con il contenuto del messaggio
    // $('.active .main-room').append(templateMessaggio);                // faccio l'append del template così popolato
    $(selettoreChat).append(templateMessaggio);                // faccio l'append del template così popolato
};
function appendContatto(nomeContatto, orario, selettorePreview) {
    var datiContatto = {                                             // assemblo in un oggetto il contenuto del messaggio
        nomeContatto: nomeContatto,
        ultimoAccesso: ultimoAccesso
    };
    var templateContatto = template2(datiContatto);                  // popolo il template di handlebars con il contenuto del messaggio
    // $('.active .main-room').append(templateMessaggio);                // faccio l'append del template così popolato
    $(selettorePreview).append(templateContatto);                // faccio l'append del template così popolato
};
// funzione di invio messaggio
function invioMsg() {
    var messaggioInput = $('#messaggio-input').val();
    if(messaggioInput.trim().length > 0) { // aggiunta controllo per evitare invio spazi vuoti
        $('#messaggio-input').val('');
        appendMsg(messaggioInput, 'sent', '.active .main-room'); // milestone 1.2
        scroll();
        setTimeout(function() {
            appendMsg('ok','received', '.active .main-room');
            scroll();
        }, 1000); // milestone 2.
    };
};
// rimuove icona microfono e aggiunge icona PaperPlane
function removeMicrophone() {
    $('.tasto-invio').find('i').removeClass('fa-microphone');
    $('.tasto-invio').find('i').addClass('fa-paper-plane');
};
// rimuove icona PaperPlane e aggiunge icona Microfono
function removePaperPlane() {
    $('.tasto-invio').find('i').removeClass('fa-paper-plane');
    $('.tasto-invio').find('i').addClass('fa-microphone');
};
// funzione ottenimento orario
function getTime() {
    var dt = new Date();
    if (dt.getMinutes() < 10) {
        time = dt.getHours() + ":" + 0 + dt.getMinutes();
    } else {
        var time = dt.getHours() + ":" + dt.getMinutes();
    };
    return time;
};
// funzione per scroll-down automatico
function scroll() {
    var pixelScroll = $('.active .main-room').prop('scrollHeight'); // .prop('scrollHeight permette scroll infinito - a differenza di .height() -')
    // console.log('pixelHeight' + pixelScroll);
    $('.active .main-room').scrollTop(pixelScroll); // aggiunto '.active' per aumentare specificità classe richiamata
};
