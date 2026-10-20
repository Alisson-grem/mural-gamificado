const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ==========================================
// A MAGIA DO POLIGLOTA (TRADUÇÃO)
// ==========================================
let idioma = localStorage.getItem('guildaIdioma') || 'pt';

const dicionario = {
    pt: {
        tituloTaverna: "Taverna da Produtividade",
        subTaverna: "Saque sua espada! Transforme tarefas chatas em missões épicas, ganhe XP e colete troféus!",
        recurso1Titulo: "O Relógio", recurso1Desc: "Feitiços de tempo para missões curtas e longas.",
        recurso2Titulo: "A Jornada", recurso2Desc: "Destrua grandes projetos pedaço por pedaço.",
        recurso3Titulo: "A Glória", recurso3Desc: "Colete títulos brilhantes para sua armadura.",
        btnAbrirPortoes: "🗡️ Abrir os Portões",
        btnInstalar: "📱 Forjar App no Cristal (Instalar)",
        bardoTocando: "Bardo: Tocando", bardoPausado: "Bardo: Pausado",
        lvlUpDesc: "Seu poder mágico aumentou! Você agora é Nível",
        btnContinuarCacada: "Continuar a Caçada",
        novoTitulo: "🏅 NOVO TÍTULO! 🏅", btnEquiparTitulo: "Equipar Título",
        tituloBau: "Baú do Ferreiro",
        descPix: "Jogue uma moeda de ouro usando o feitiço do banco:",
        ouCopie: "Ou copie as runas antigas:", btnCopiarPix: "Copiar Runas", copiadoSucesso: "Runas Copiadas! ✔",
        descInternacional: "Throw a gold coin using the merchant's portals:", /* Sempre em inglês */
        textoNivel: "Nível",
        placeholderMissao: "Qual será sua próxima caçada?...", btnForjarMissao: "FORJAR MISSÃO",
        tituloAbertos: "🗡️ Pergaminhos Abertos", tituloConcluidas: "📜 Túmulo das Missões (Concluídas)",
        textoDoacaoRodape: "Os feitiços desta taverna lhe foram úteis?",
        btnDoacaoRodape: "💰 Jogar Moedas no Baú do Desenvolvedor",
        alertaEsgotado: 'O feitiço esgotou! Missão "{0}" falhou!',
        txtForjado: "Forjado", txtConcluir: "✔ Concluir", txtMartelar: "+10% Martelar", txtAbandonar: "✖ Abandonar", txtLimpar: "✖ Limpar", txtPergaminhoFechado: "PERGAMINHO FECHADO",
        ranks: { 'd': 'Rank D (Ferro)', 'c': 'Rank C (Bronze)', 'b': 'Rank B (Prata)', 'a': 'Rank A (Ouro)', 's': 'Rank S (Mítico)' },
        tipos: { curto: '⏱️ Emboscada (15m)', longo: '⏳ Cerco (45m)', epica: '👑 Aventura Épica (100%)' },
        titulos: {
            't_ini': { icone: '🥉', nome: 'Batedor Iniciante', desc: 'Completou suas 3 primeiras missões!' },
            't_vet': { icone: '🏆', nome: 'Veterano Implacável', desc: 'Completou 10 missões com sucesso!' },
            't_speed': { icone: '⚡', nome: 'O Relâmpago', desc: 'Terminou correndo, com mais da metade do tempo sobrando!' },
            't_clutch': { icone: '🗡️', nome: 'No Fio da Espada', desc: 'Emoção pura! Concluiu faltando 10s ou menos.' },
            't_epic': { icone: '👑', nome: 'Mestre Forjador', desc: 'Completou 100% de uma Missão Épica.' }
        }
    },
    en: {
        tituloTaverna: "Productivity Tavern",
        subTaverna: "Draw your sword! Turn boring tasks into epic quests, earn XP and collect trophies!",
        recurso1Titulo: "The Clock", recurso1Desc: "Time spells for short and long quests.",
        recurso2Titulo: "The Journey", recurso2Desc: "Destroy massive projects piece by piece.",
        recurso3Titulo: "The Glory", recurso3Desc: "Collect shiny titles for your armor.",
        btnAbrirPortoes: "🗡️ Open the Gates",
        btnInstalar: "📱 Forge App in Crystal (Install)",
        bardoTocando: "Bard: Playing", bardoPausado: "Bard: Paused",
        lvlUpDesc: "Your magic power increased! You are now Level",
        btnContinuarCacada: "Continue the Hunt",
        novoTitulo: "🏅 NEW TITLE! 🏅", btnEquiparTitulo: "Equip Title",
        tituloBau: "Blacksmith's Chest",
        descPix: "...", 
        ouCopie: "Or copy the ancient runes:", btnCopiarPix: "Copy Runes", copiadoSucesso: "Runes Copied! ✔",
        descInternacional: "Throw a gold coin using the merchant's portals:",
        textoNivel: "Level",
        placeholderMissao: "What is your next hunt?...", btnForjarMissao: "FORGE QUEST",
        tituloAbertos: "🗡️ Open Scrolls", tituloConcluidas: "📜 Quest Tomb (Completed)",
        textoDoacaoRodape: "Were the spells of this tavern useful?",
        btnDoacaoRodape: "💰 Throw Coins in the Developer's Chest",
        alertaEsgotado: 'The spell faded! Quest "{0}" failed!',
        txtForjado: "Forged", txtConcluir: "✔ Complete", txtMartelar: "+10% Strike", txtAbandonar: "✖ Abandon", txtLimpar: "✖ Clear", txtPergaminhoFechado: "SCROLL CLOSED",
        ranks: { 'd': 'Rank D (Iron)', 'c': 'Rank C (Bronze)', 'b': 'Rank B (Silver)', 'a': 'Rank A (Gold)', 's': 'Rank S (Mythic)' },
        tipos: { curto: '⏱️ Ambush (15m)', longo: '⏳ Siege (45m)', epica: '👑 Epic Quest (100%)' },
        titulos: {
            't_ini': { icone: '🥉', nome: 'Novice Scout', desc: 'Completed your first 3 quests!' },
            't_vet': { icone: '🏆', nome: 'Relentless Veteran', desc: 'Successfully completed 10 quests!' },
            't_speed': { icone: '⚡', nome: 'The Lightning', desc: 'Finished fast, with more than half the time left!' },
            't_clutch': { icone: '🗡️', nome: 'Edge of the Sword', desc: 'Pure thrill! Finished with 10s or less remaining.' },
            't_epic': { icone: '👑', nome: 'Master Blacksmith', desc: 'Completed 100% of an Epic Quest.' }
        }
    }
};

function aplicarTraducoes() {
    const t = dicionario[idioma];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const chave = el.getAttribute('data-i18n');
        if (t[chave]) el.innerHTML = t[chave];
    });

    document.getElementById('inputMissao').placeholder = t.placeholderMissao;
    
    const selRank = document.getElementById('selectRank');
    selRank.innerHTML = `
        <option value="d">${t.ranks['d']}</option>
        <option value="c">${t.ranks['c']}</option>
        <option value="b">${t.ranks['b']}</option>
        <option value="a">${t.ranks['a']}</option>
        <option value="s">${t.ranks['s']}</option>`;
        
    const selTipo = document.getElementById('selectTipo');
    selTipo.innerHTML = `
        <option value="curto">${t.tipos['curto']}</option>
        <option value="longo">${t.tipos['longo']}</option>
        <option value="epica">${t.tipos['epica']}</option>`;

    document.getElementById('btnPt').classList.toggle('ativo', idioma === 'pt');
    document.getElementById('btnEn').classList.toggle('ativo', idioma === 'en');
    
    // Troca a cor do botão de rodapé se for gringo!
    const btnDoacao = document.querySelector('.area-pix-rodape .btn-pix-rpg');
    if (idioma === 'en') {
        btnDoacao.classList.add('btn-inter-rpg');
    } else {
        btnDoacao.classList.remove('btn-inter-rpg');
    }

    renderizarMissoes();
    renderizarTitulos();
}

function mudarIdioma(novoIdioma) {
    idioma = novoIdioma; localStorage.setItem('guildaIdioma', idioma); aplicarTraducoes();
}

// ==========================================
// BARDO E ÁUDIO
// ==========================================
const sfxTaverna = new Audio('./Musica/774883__destructo20__background-music-of-uncertainty.wav'); sfxTaverna.loop = true; sfxTaverna.volume = 0.4; 
const sfxCliqueUI = new Audio('./Musica/547414__ian_g__wood-hit.wav'); sfxCliqueUI.volume = 0.5;
const sfxEspada = new Audio('./Musica/448009__kneeling__cleaver.mp3'); sfxEspada.volume = 0.6;

document.addEventListener('click', (e) => {
    if (e.target.closest('button') && !e.target.closest('.btn-bmac') && !e.target.closest('.btn-kofi')) {
        sfxCliqueUI.currentTime = 0; sfxCliqueUI.play().catch(() => {});
    }
});

function alternarMusica() {
    const btnBardo = document.getElementById('btnBardo');
    const t = dicionario[idioma];
    if (sfxTaverna.paused) {
        sfxTaverna.play().catch(() => {});
        btnBardo.innerHTML = `🎵 <span data-i18n="bardoTocando">${t.bardoTocando}</span>`;
        btnBardo.classList.remove('bardo-pausado');
    } else {
        sfxTaverna.pause();
        btnBardo.innerHTML = `🔇 <span data-i18n="bardoPausado">${t.bardoPausado}</span>`;
        btnBardo.classList.add('bardo-pausado');
    }
}

// --- MAGIA PWA (INSTALAR APP) ---
if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(()=>{}); }
let promptDeInstalacao; const btnInstalar = document.getElementById('btnInstalarApp');
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); promptDeInstalacao = e; if (window.innerWidth <= 600) { btnInstalar.classList.remove('escondido'); } });
btnInstalar.addEventListener('click', async () => { if (promptDeInstalacao) { promptDeInstalacao.prompt(); const { outcome } = await promptDeInstalacao.userChoice; if (outcome === 'accepted') { btnInstalar.classList.add('escondido'); } promptDeInstalacao = null; } });

// --- FEITIÇOS SONOROS MÁGICOS (Sintetizador) ---
function tocarSomMoeda() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.1); 
    ganho.gain.setValueAtTime(0, audioCtx.currentTime); ganho.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05); ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.connect(ganho); ganho.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.3);
}
function tocarSomLevelUp() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'square'; osc.frequency.setValueAtTime(440, audioCtx.currentTime); osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1); osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.3); 
    ganho.gain.setValueAtTime(0, audioCtx.currentTime); ganho.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1); ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
    osc.connect(ganho); ganho.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.6);
}
function tocarSomTitulo() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.3); osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.45); 
    ganho.gain.setValueAtTime(0, audioCtx.currentTime); ganho.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1); ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
    osc.connect(ganho); ganho.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.8);
}
function tocarSomPasso() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(300, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    ganho.gain.setValueAtTime(0, audioCtx.currentTime); ganho.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.02); ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(ganho); ganho.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}
function tocarSomAlarme() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(800, audioCtx.currentTime); osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1); osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.2); osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.3);
    ganho.gain.setValueAtTime(0, audioCtx.currentTime); ganho.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05); ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.connect(ganho); ganho.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + 0.5);
}

// --- DADOS E LOCAL STORAGE ---
let missoes = JSON.parse(localStorage.getItem('guildaMissoes')) || [];
let xpAtual = parseInt(localStorage.getItem('guildaXp')) || 0;
let nivelAtual = parseInt(localStorage.getItem('guildaNivel')) || 1;
let estatisticas = JSON.parse(localStorage.getItem('guildaStats')) || { totalCompletas: 0 };
let titulosDesbloqueados = JSON.parse(localStorage.getItem('guildaTitulos')) || [];

const xpPorNivel = 100;
const recompensas = { 'd': 10, 'c': 20, 'b': 40, 'a': 70, 's': 100 };

// --- CONTROLE DA TELA ---
function checarVitrine() {
    const btnEntrar = document.getElementById('btnEntrar');
    if (nivelAtual > 1 || xpAtual > 0 || missoes.length > 0 || estatisticas.totalCompletas > 0) {
        btnEntrar.innerText = "🗡️ " + dicionario[idioma].btnContinuarCacada;
    }
}
function abrirPortoes() {
    document.getElementById('telaApresentacao').classList.add('escondido');
    document.getElementById('telaApp').classList.remove('escondido');
    sfxEspada.play().catch(() => {});
    sfxTaverna.play().catch(() => {});
}

function atualizarStatus() {
    document.getElementById('textoNivelNum').innerText = nivelAtual;
    document.getElementById('textoXp').innerText = `${xpAtual} / ${xpPorNivel} XP`;
    let porcentagem = (xpAtual / xpPorNivel) * 100;
    document.getElementById('barraXp').style.width = `${porcentagem}%`;
    localStorage.setItem('guildaXp', xpAtual);
    localStorage.setItem('guildaNivel', nivelAtual);
}

function renderizarTitulos() {
    const t = dicionario[idioma].titulos;
    const area = document.getElementById('areaTitulos');
    area.innerHTML = '';
    titulosDesbloqueados.forEach(id => {
        if(t[id]) {
            const span = document.createElement('span');
            span.className = 'badge-titulo';
            span.title = t[id].desc; 
            span.innerText = `${t[id].icone} ${t[id].nome}`;
            area.appendChild(span);
        }
    });
}

function formatarTempo(segs) {
    let m = Math.floor(segs / 60); let s = segs % 60;
    return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}

function renderizarMissoes() {
    const t = dicionario[idioma];
    const listaAtivas = document.getElementById('listaMissoes');
    const listaConcluidas = document.getElementById('listaConcluidas');
    listaAtivas.innerHTML = ''; listaConcluidas.innerHTML = '';
    
    missoes.forEach((missao, index) => {
        const li = document.createElement('li');
        li.className = `missao rank-${missao.rank}`;
        
        if(!missao.concluida) {
            let htmlMeio = ''; let botaoAcao = '';

            if (missao.tipo === 'curto' || missao.tipo === 'longo') {
                htmlMeio = `
                    <div class="display-timer">
                        <span id="timer-${index}">${formatarTempo(missao.tempoRestante)}</span>
                        <button class="btn-play" onclick="alternarTimer(${index})" id="btn-play-${index}">
                            ${missao.rodando ? '⏸' : '▶'}
                        </button>
                    </div>`;
                botaoAcao = `<button class="btn-completar" onclick="concluirTarefa(${index})">${t.txtConcluir}</button>`;
            } else if (missao.tipo === 'epica') {
                htmlMeio = `
                    <div class="container-epica">
                        <div class="barra-fundo-epica">
                            <div class="barra-fill-epica" style="width: ${missao.progresso}%"></div>
                        </div>
                        <span class="texto-epica">👑 ${missao.progresso}% ${t.txtForjado}</span>
                    </div>`;
                botaoAcao = `<button class="btn-avancar" onclick="avancarEpica(${index})">${t.txtMartelar}</button>`;
            }

            li.innerHTML = `
                <div class="missao-info">
                    <div class="missao-topo">
                        <span class="missao-titulo">${missao.texto}</span>
                        <span class="missao-rank">${t.ranks[missao.rank]} - ${recompensas[missao.rank]} XP</span>
                    </div>
                    ${missao.tipo === 'epica' ? htmlMeio : ''}
                </div>
                ${missao.tipo !== 'epica' ? htmlMeio : ''}
                <div class="botoes-acao">
                    ${botaoAcao}
                    <button class="btn-excluir" onclick="removerMissao(${index})">${t.txtAbandonar}</button>
                </div>`;
            listaAtivas.appendChild(li);
        } else {
            li.innerHTML = `
                <div class="missao-info">
                    <span class="missao-titulo">${missao.texto}</span>
                    <span class="missao-rank">${t.txtPergaminhoFechado}</span>
                </div>
                <button class="btn-excluir" onclick="removerMissao(${index})">${t.txtLimpar}</button>
            `;
            listaConcluidas.appendChild(li);
        }
    });
    
    localStorage.setItem('guildaMissoes', JSON.stringify(missoes));
}

function adicionarMissao() {
    const input = document.getElementById('inputMissao');
    const selectRank = document.getElementById('selectRank');
    const selectTipo = document.getElementById('selectTipo').value;
    
    if (input.value.trim() === '') return;
    
    let tempoBase = 0;
    if (selectTipo === 'curto') tempoBase = 15 * 60;
    if (selectTipo === 'longo') tempoBase = 45 * 60;
    
    missoes.push({
        texto: input.value, rank: selectRank.value, tipo: selectTipo,
        tempoTotal: tempoBase, tempoRestante: tempoBase, rodando: false,
        progresso: 0, concluida: false
    });
    
    input.value = ''; renderizarMissoes();
}

function removerMissao(index) { missoes.splice(index, 1); renderizarMissoes(); }

function checarTitulos(missao) {
    let ganhouNovo = false;

    estatisticas.totalCompletas++;
    if (estatisticas.totalCompletas === 3) ganhouNovo = desbloquearTitulo('t_ini') || ganhouNovo;
    if (estatisticas.totalCompletas === 10) ganhouNovo = desbloquearTitulo('t_vet') || ganhouNovo;

    if (missao.tipo === 'curto' || missao.tipo === 'longo') {
        let metadeTempo = missao.tempoTotal / 2;
        if (missao.tempoRestante >= metadeTempo) ganhouNovo = desbloquearTitulo('t_speed') || ganhouNovo;
        if (missao.tempoRestante <= 10 && missao.tempoRestante > 0) ganhouNovo = desbloquearTitulo('t_clutch') || ganhouNovo;
    }

    if (missao.tipo === 'epica' && missao.progresso === 100) ganhouNovo = desbloquearTitulo('t_epic') || ganhouNovo;

    localStorage.setItem('guildaStats', JSON.stringify(estatisticas));
    
    if (!ganhouNovo) { darXP(missao.rank); } 
    else { xpAtual += recompensas[missao.rank]; checarLevelUpSilencioso(); }
}

function desbloquearTitulo(id) {
    if (!titulosDesbloqueados.includes(id)) {
        const t = dicionario[idioma].titulos;
        titulosDesbloqueados.push(id); localStorage.setItem('guildaTitulos', JSON.stringify(titulosDesbloqueados));
        document.getElementById('nomeTituloModal').innerText = `${t[id].icone} ${t[id].nome}`;
        document.getElementById('descTituloModal').innerText = t[id].desc;
        setTimeout(() => {
            tocarSomTitulo(); document.getElementById('modalTitulo').classList.remove('escondido'); renderizarTitulos();
        }, 500);
        return true;
    }
    return false;
}

function checarLevelUpSilencioso() {
    if (xpAtual >= xpPorNivel) {
        let sobras = xpAtual - xpPorNivel; nivelAtual++; xpAtual = sobras;
        setTimeout(() => { mostrarModalLevelUp(); }, 3000); 
    }
    atualizarStatus();
}

function darXP(rank) {
    tocarSomMoeda(); xpAtual += recompensas[rank];
    if (xpAtual >= xpPorNivel) {
        let sobras = xpAtual - xpPorNivel; nivelAtual++; xpAtual = sobras;
        mostrarModalLevelUp();
    }
    atualizarStatus();
}

function concluirTarefa(index) {
    const missao = missoes[index]; missao.rodando = false; missao.concluida = true;
    checarTitulos(missao); renderizarMissoes();
}

function avancarEpica(index) {
    missoes[index].progresso += 10;
    if (missoes[index].progresso >= 100) { missoes[index].progresso = 100; concluirTarefa(index); } 
    else { renderizarMissoes(); }
}

function alternarTimer(index) { missoes[index].rodando = !missoes[index].rodando; renderizarMissoes(); }

setInterval(() => {
    let precisaSalvar = false;
    missoes.forEach((m, i) => {
        if ((m.tipo === 'curto' || m.tipo === 'longo') && m.rodando && !m.concluida && m.tempoRestante > 0) {
            m.tempoRestante--; precisaSalvar = true;
            const spanTempo = document.getElementById(`timer-${i}`);
            if(spanTempo) spanTempo.innerText = formatarTempo(m.tempoRestante);
            if (m.tempoRestante <= 0) {
                m.rodando = false; tocarSomAlarme();
                const msg = dicionario[idioma].alertaEsgotado.replace('{0}', m.texto);
                alert(msg); renderizarMissoes(); 
            }
        }
    });
    if (precisaSalvar) localStorage.setItem('guildaMissoes', JSON.stringify(missoes));
}, 1000);

function mostrarModalLevelUp() { document.getElementById('nivelModal').innerText = nivelAtual; document.getElementById('modalLevelUp').classList.remove('escondido'); tocarSomLevelUp(); }
function fecharModal(idModal) { document.getElementById(idModal).classList.add('escondido'); }

// --- O BAÚ INTELIGENTE ---
function abrirModalDoacao() { 
    const caixaPix = document.getElementById('conteudoPix');
    const caixaInter = document.getElementById('conteudoInternacional');
    const modalBox = document.querySelector('.caixa-pix'); 

    if (idioma === 'pt') {
        caixaPix.classList.remove('escondido');
        caixaInter.classList.add('escondido');
        modalBox.classList.remove('caixa-internacional'); 
    } else {
        caixaPix.classList.add('escondido');
        caixaInter.classList.remove('escondido');
        modalBox.classList.add('caixa-internacional'); 
    }
    document.getElementById('modalDoacao').classList.remove('escondido'); 
}

function copiarChavePix() {
    const chave = document.getElementById('inputChavePix').value;
    const botao = document.getElementById('btnCopiarPix');
    const msgOriginal = dicionario[idioma].btnCopiarPix;
    const msgCopiado = dicionario[idioma].copiadoSucesso;
    
    navigator.clipboard.writeText(chave).then(() => {
        botao.innerText = msgCopiado; botao.style.backgroundColor = "var(--borda-metal)"; 
        setTimeout(() => { botao.innerText = msgOriginal; botao.style.backgroundColor = ""; }, 2000);
    });
}

// Inicia
aplicarTraducoes(); checarVitrine(); atualizarStatus(); renderizarMissoes(); renderizarTitulos(); 
document.getElementById('inputMissao').addEventListener('keypress', function (e) { if (e.key === 'Enter') adicionarMissao(); });