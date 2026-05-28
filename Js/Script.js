/* 
=========================================
COMPORTAMENTOS INTERATIVOS (JAVASCRIPT)
Cliente: Veloso Flor Neto
Nicho: Direito de Família (Luxo Refinado)
=========================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    /* -----------------------------------------
       1. CONTROLE DO SCROLL DO HEADER FIXO
       ----------------------------------------- */
    const header = document.getElementById('header');
    
    // Função que verifica o scroll e adiciona/remove a classe de redução de tamanho
    const gerenciarScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    };

    // Ouvinte de evento de rolagem na janela
    window.addEventListener('scroll', gerenciarScrollHeader);
    gerenciarScrollHeader(); // Execução inicial para caso a página inicie scrollada

    /* -----------------------------------------
       2. MENU MOBILE HAMBÚRGUER E DROPDOWN
       ----------------------------------------- */
    const menuBtn = document.getElementById('menu-btn');
    const menuDropdown = document.getElementById('menu-mobile');
    const linksMobile = document.querySelectorAll('.mobile-link');

    // Abre e fecha o menu mobile ao clicar no botão hambúrguer
    const alternarMenuMobile = () => {
        const estaAberto = menuBtn.classList.contains('aberto');
        
        menuBtn.classList.toggle('aberto');
        menuDropdown.classList.toggle('aberto');
        
        // Atualiza atributo de acessibilidade aria-expanded
        menuBtn.setAttribute('aria-expanded', !estaAberto);
        
        // Impede ou permite a rolagem do fundo do site quando o menu está ativo
        document.body.style.overflow = !estaAberto ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', alternarMenuMobile);

    // Fecha o menu mobile quando qualquer link do menu é clicado
    linksMobile.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('aberto');
            menuDropdown.classList.remove('aberto');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    /* -----------------------------------------
       3. ANIMAÇÃO DE ELEMENTOS NO SCROLL (INTERSECTION OBSERVER)
       ----------------------------------------- */
    const elementosAnimar = document.querySelectorAll('.animar-scroll, .animar-entrada');
    
    // Opções do observador (dispara quando 15% do elemento estiver visível)
    const opcoesObserver = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Cria o observador que adiciona a classe ativo para ativar transições de CSS
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                // Deixa de observar após a primeira animação para melhorar a performance
                observer.unobserve(entry.target);
            }
        });
    }, opcoesObserver);

    // Registra cada elemento no observador
    elementosAnimar.forEach(elemento => {
        observer.observe(elemento);
    });

    /* -----------------------------------------
       4. ACORDEON DE PERGUNTAS FREQUENTES (FAQ)
       ----------------------------------------- */
    const perguntasFAQ = document.querySelectorAll('.faq-pergunta');

    perguntasFAQ.forEach(botao => {
        botao.addEventListener('click', () => {
            const faqItem = botao.parentElement;
            const resposta = botao.nextElementSibling;
            const estaExpandido = botao.getAttribute('aria-expanded') === 'true';

            // Fecha outros itens de FAQ abertos se houver (efeito sanfona/accordion clássico)
            perguntasFAQ.forEach(outraPergunta => {
                if (outraPergunta !== botao) {
                    outraPergunta.setAttribute('aria-expanded', 'false');
                    outraPergunta.nextElementSibling.style.height = '0';
                    outraPergunta.parentElement.classList.remove('ativo');
                }
            });

            // Alterna o estado do item clicado
            if (estaExpandido) {
                botao.setAttribute('aria-expanded', 'false');
                resposta.style.height = '0';
                faqItem.classList.remove('ativo');
            } else {
                botao.setAttribute('aria-expanded', 'true');
                // Define a altura exata do conteúdo para que a transição do CSS funcione
                resposta.style.height = `${resposta.scrollHeight}px`;
                faqItem.classList.add('ativo');
            }
        });
    });

    // Ajusta a altura da resposta se a tela for redimensionada enquanto estiver aberta
    window.addEventListener('resize', () => {
        perguntasFAQ.forEach(botao => {
            const resposta = botao.nextElementSibling;
            if (botao.getAttribute('aria-expanded') === 'true') {
                resposta.style.height = `${resposta.scrollHeight}px`;
            }
        });
    });

    /* -----------------------------------------
       5. COMPORTAMENTO E HORÁRIO DO CHAT DO WHATSAPP
       ----------------------------------------- */
    const relogioPopup = document.getElementById('popup-relogio');
    const popupChat = document.getElementById('whats-popup');

    // Atualiza a hora exibida no balão do WhatsApp com a hora real do usuário
    const atualizarHorarioMensagem = () => {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        if (relogioPopup) {
            relogioPopup.textContent = `${horas}:${minutos}`;
        }
    };
    atualizarHorarioMensagem();

    // Em dispositivos móveis (sem hover de mouse), abre o mini-chat automaticamente após 4 segundos para chamar a atenção
    setTimeout(() => {
        // Apenas abre de forma visível se o usuário ainda estiver na tela principal e não interagiu com o widget
        if (window.innerWidth <= 991) {
            popupChat.classList.add('ativo');
        }
    }, 4500);

    // Fecha o mini-chat se o usuário clicar fora dele em dispositivos móveis
    document.addEventListener('click', (evento) => {
        const whatsWrapper = document.getElementById('whats-flutuante');
        if (whatsWrapper && !whatsWrapper.contains(evento.target)) {
            popupChat.classList.remove('ativo');
        }
    });
});
