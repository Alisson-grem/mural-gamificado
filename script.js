const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// --- MAGIA PWA (INSTALAR APP) ---
// Acorda o Service Worker nas sombras
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log("Feitiço SW registrado!");
    });
}

let promptDeInstalacao;
const btnInstalar = document.getElementById('btnInstalarApp');

window.addEventListener('beforeinstallprompt', (e) => {
    // Impede o celular de mostrar o aviso feio dele
    e.preventDefault();
    promptDeInstalacao = e;
    
    // Só mostra o NOSSO botão furtivo se for tela pequena (Celular)
    if (window.innerWidth <= 600) {
        btnInstalar.classList.remove('escondido');
    }
});

btnInstalar.addEventListener('click', async () => {
    if (promptDeInstalacao) {
        promptDeInstalacao.prompt();
        const { outcome } = await promptDeInstalacao.userChoice;
        if (outcome === 'accepted') {
            btnInstalar.classList.add('escondido'); // O humano aceitou, a gente some!
        }
        promptDeInstalacao = null;
    }
});

// --- BIBLIOTECA DE FEITIÇOS SONOROS ---
function tocarSomMoeda() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.1); 
    ganho.gain.setValueAtTime(0, audioCtx.currentTime);
    ganho.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.connect(ganho); ganho.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.3);
}

function tocarSomLevelUp() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'square'; osc.frequency.setValueAtTime(440, audioCtx.currentTime); 
    osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1); 
    osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); 
    osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.3); 
    ganho.gain.setValueAtTime(0, audioCtx.currentTime);
    ganho.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
    ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
    osc.connect(ganho); ganho.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.6);
}

function tocarSomTitulo() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
    osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); 
    osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.3); 
    osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.45); 
    ganho.gain.setValueAtTime(0, audioCtx.currentTime);
    ganho.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
    osc.connect(ganho); ganho.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.8);
}

function tocarSomPasso() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'triangle'; osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    ganho.gain.setValueAtTime(0, audioCtx.currentTime);
    ganho.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
    ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(ganho); ganho.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}

function tocarSomAlarme() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator(); const ganho = audioCtx.createGain();
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
    osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.2);
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.3);
    ganho.gain.setValueAtTime(0, audioCtx.currentTime);
    ganho.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    ganho.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.connect(ganho); ganho.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.5);
}

// --- DADOS E LOCAL STORAGE ---
let missoes = JSON.parse(localStorage.getItem('guildaMissoes')) || [];
let xpAtual = parseInt(localStorage.getItem('guildaXp')) || 0;
let nivelAtual = parseInt(localStorage.getItem('guildaNivel')) || 1;
let estatisticas = JSON.parse(localStorage.getItem('guildaStats')) || { totalCompletas: 0 };
let titulosDesbloqueados = JSON.parse(localStorage.getItem('guildaTitulos')) || [];

const xpPorNivel = 100;
const recompensas = { 'd': 10, 'c': 20, 'b': 40, 'a': 70, 's': 100 };
const nomesRanks = { 'd': 'Rank D', 'c': 'Rank C', 'b': 'Rank B', 'a': 'Rank A', 's': 'Rank S' };

const todosOsTitulos = {
    't_ini': { icone: '🥉', nome: 'Batedor Iniciante', desc: 'Completou suas 3 primeiras missões!' },
    't_vet': { icone: '🏆', nome: 'Veterano Implacável', desc: 'Completou 10 missões com sucesso!' },
    't_speed': { icone: '⚡', nome: 'O Relâmpago', desc: 'Terminou uma missão correndo, com mais da metade do tempo sobrando!' },
    't_clutch': { icone: '🗡️', nome: 'No Fio da Espada', desc: 'Emoção pura! Concluiu faltando 10s ou menos.' },
    't_epic': { icone: '👑', nome: 'Mestre Forjador', desc: 'Completou 100% de uma Missão Épica.' }
};

// --- CONTROLE DA TELA DE APRESENTAÇÃO ---
function checarVitrine() {
    const btnEntrar = document.getElementById('btnEntrar');
    if (nivelAtual > 1 || xpAtual > 0 || missoes.length > 0 || estatisticas.totalCompletas > 0) {
        btnEntrar.innerText = "🗡️ Continuar Jornada";
    }
}

function abrirPortoes() {
    document.getElementById('telaApresentacao').classList.add('escondido');
    document.getElementById('telaApp').classList.remove('escondido');
    if (audioCtx.state === 'suspended') audioCtx.resume();
    tocarSomPasso();
}

// --- FUNÇÕES DE ATUALIZAÇÃO ---
function atualizarStatus() {
    document.getElementById('textoNivel').innerText = `Nível ${nivelAtual}`;
    document.getElementById('textoXp').innerText = `${xpAtual} / ${xpPorNivel} XP`;
    let porcentagem = (xpAtual / xpPorNivel) * 100;
    document.getElementById('barraXp').style.width = `${porcentagem}%`;
    localStorage.setItem('guildaXp', xpAtual);
    localStorage.setItem('guildaNivel', nivelAtual);
}

function renderizarTitulos() {
    const area = document.getElementById('areaTitulos');
    area.innerHTML = '';
    titulosDesbloqueados.forEach(id => {
        if(todosOsTitulos[id]) {
            const span = document.createElement('span');
            span.className = 'badge-titulo';
            span.title = todosOsTitulos[id].desc; 
            span.innerText = `${todosOsTitulos[id].icone} ${todosOsTitulos[id].nome}`;
            area.appendChild(span);
        }
    });
}

function formatarTempo(segs) {
    let m = Math.floor(segs / 60); let s = segs % 60;
    return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}

function renderizarMissoes() {
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
                botaoAcao = `<button class="btn-completar" onclick="concluirTarefa(${index})">✔ Concluir</button>`;
            } else if (missao.tipo === 'epica') {
                htmlMeio = `
                    <div class="container-epica">
                        <div class="barra-fundo-epica">
                            <div class="barra-fill-epica" style="width: ${missao.progresso}%"></div>
                        </div>
                        <span class="texto-epica">👑 ${missao.progresso}% Concluído</span>
                    </div>`;
                botaoAcao = `<button class="btn-completar btn-avancar" onclick="avancarEpica(${index})">+10%</button>`;
            }

            li.innerHTML = `
                <div class="missao-info">
                    <div class="missao-topo">
                        <span class="missao-titulo">${missao.texto}</span>
                        <span class="missao-rank">${nomesRanks[missao.rank]} - ${recompensas[missao.rank]} XP</span>
                    </div>
                    ${missao.tipo === 'epica' ? htmlMeio : ''}
                </div>
                ${missao.tipo !== 'epica' ? htmlMeio : ''}
                <div class="botoes-acao">
                    ${botaoAcao}
                    <button class="btn-excluir" onclick="removerMissao(${index})">✖</button>
                </div>`;
            listaAtivas.appendChild(li);
        } else {
            li.innerHTML = `
                <div class="missao-info">
                    <span class="missao-titulo">${missao.texto}</span>
                    <span class="missao-rank">FINALIZADA</span>
                </div>
                <button class="btn-excluir" onclick="removerMissao(${index})">✖</button>
            `;
            listaConcluidas.appendChild(li);
        }
    });
    
    localStorage.setItem('guildaMissoes', JSON.stringify(missoes));
}

// --- LÓGICA PRINCIPAL ---
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
    
    input.value = '';
    renderizarMissoes();
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
        titulosDesbloqueados.push(id);
        localStorage.setItem('guildaTitulos', JSON.stringify(titulosDesbloqueados));
        document.getElementById('nomeTituloModal').innerText = `${todosOsTitulos[id].icone} ${todosOsTitulos[id].nome}`;
        document.getElementById('descTituloModal').innerText = todosOsTitulos[id].desc;
        setTimeout(() => {
            tocarSomTitulo();
            document.getElementById('modalTitulo').classList.remove('escondido');
            renderizarTitulos();
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
    const missao = missoes[index];
    missao.rodando = false; missao.concluida = true;
    checarTitulos(missao); renderizarMissoes();
}

function avancarEpica(index) {
    tocarSomPasso(); missoes[index].progresso += 10;
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
                alert(`O tempo esgotou, aventureiro!`); renderizarMissoes(); 
            }
        }
    });
    if (precisaSalvar) localStorage.setItem('guildaMissoes', JSON.stringify(missoes));
}, 1000);

function mostrarModalLevelUp() { document.getElementById('nivelModal').innerText = nivelAtual; document.getElementById('modalLevelUp').classList.remove('escondido'); tocarSomLevelUp(); }
function fecharModal(idModal) { document.getElementById(idModal).classList.add('escondido'); }
function abrirModalPix() { document.getElementById('modalPix').classList.remove('escondido'); }
function copiarChavePix() {
    const chave = document.getElementById('inputChavePix').value;
    const botao = document.getElementById('btnCopiarPix');
    navigator.clipboard.writeText(chave).then(() => {
        botao.innerText = "Copiado! ✔"; botao.style.backgroundColor = "#fff"; botao.style.color = "var(--cor-pix)";
        setTimeout(() => { botao.innerText = "Copiar"; botao.style.backgroundColor = "var(--cor-pix)"; botao.style.color = "#fff"; }, 2000);
    });
}

checarVitrine(); atualizarStatus(); renderizarMissoes(); renderizarTitulos(); 
document.getElementById('inputMissao').addEventListener('keypress', function (e) { if (e.key === 'Enter') adicionarMissao(); });