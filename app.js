// Configuração dos lotes
const lotes = [
    {
        id: '08',
        quadra: 'AD',
        lote: '08',
        x: 0.1452,
        y: 0.2643,
        area: '596,70',
        frente: '17,87',
        fundos: '22,00',
        profundidade: '30,02',
        topografia: 'Declive',
        valor: '980.000,00',
        status: 'Disponível'
    },
    {
        id: '03',
        quadra: 'P',
        lote: '03',
        x: 0.3712,
        y: 0.4336,
        area: '523,68',
        frente: '16,13',
        fundos: '17,70',
        profundidade: '31,03',
        topografia: 'Aclive',
        valor: '967.550,00',
        status: 'Disponível'
    },
    {
        id: '04',
        quadra: 'P',
        lote: '04',
        x: 0.3676,
        y: 0.4407,
        area: '561,83',
        frente: '16,16',
        fundos: '20,21',
        profundidade: '30,94',
        topografia: 'Aclive',
        valor: '1.037.550,00',
        status: 'Disponível'
    },
    {
        id: '06',
        quadra: 'J',
        lote: '06',
        x: 0.4150,
        y: 0.5463,
        area: '471,19',
        frente: '15,19',
        fundos: '16,23',
        profundidade: '30,00',
        topografia: 'Plano',
        valor: '980.000,00',
        status: 'Disponível'
    }
];

let viewer;
let currentSelectedMarker = null;
let currentSelectedLoteId = null;
let tooltipFixo = false;
const isMobile = window.innerWidth <= 768;

console.log('Script carregado. isMobile:', isMobile);

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, criando viewer...');
    
    viewer = OpenSeadragon({
        id: "openseadragon-viewer",
        prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
        tileSources: {
            type: 'image',
            url: 'imagens/implantacao.png'
        },
        showNavigator: !isMobile,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorAutoFade: false,
        showNavigationControl: false,
        gestureSettingsMouse: { clickToZoom: false },
        defaultZoomLevel: 2.2,
        minZoomLevel: 0.3,
        maxZoomLevel: isMobile ? 20 : 8
    });
    
    viewer.addHandler('open', function() {
        console.log('Viewer aberto!');
        document.getElementById('loading').style.display = 'none';
        
        // AGUARDAR os overlays estarem completamente prontos
        viewer.addHandler('animation-finish', function inicializarMarcadores() {
            console.log('Animação finalizada, criando marcadores...');
            
            // Remover este handler para não executar várias vezes
            viewer.removeHandler('animation-finish', inicializarMarcadores);
            
            // Aguardar mais um pouco para garantir
            setTimeout(() => {
                criarMarcadoresLotes();
                
                if (!isMobile) {
                    console.log('Desktop detectado, criando lista...');
                    criarListaLotes();
                }
            }, 500);
        });
    });
    
    // Fechar tooltip ao clicar fora (mobile)
    if (isMobile) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.lote-marker') && !e.target.closest('.lote-tooltip')) {
                esconderTooltip();
                tooltipFixo = false;
            }
        });
    }
    
    document.getElementById('zoom-in').onclick = () => viewer.viewport.zoomBy(1.5);
    document.getElementById('zoom-out').onclick = () => viewer.viewport.zoomBy(0.7);
    document.getElementById('zoom-home').onclick = () => viewer.viewport.goHome();
});

// Criar marcadores
function criarMarcadoresLotes() {
    console.log('criarMarcadoresLotes chamado');
    
    lotes.forEach((lote, index) => {
        console.log(`Criando marcador ${index + 1}/${lotes.length} - Lote ${lote.id}`);
        
        const marker = document.createElement('div');
        marker.className = 'lote-marker';
        marker.innerHTML = lote.id;
        marker.dataset.loteId = lote.id;
        marker.style.pointerEvents = 'auto';
        marker.style.cursor = 'pointer';
        
        // Adicionar overlay PRIMEIRO
        viewer.addOverlay({
            element: marker,
            location: new OpenSeadragon.Point(lote.x, lote.y),
            placement: OpenSeadragon.Placement.CENTER,
            checkResize: false
        });
        
        // Aguardar o marcador estar no DOM antes de adicionar listeners
        setTimeout(() => {
            console.log(`Adicionando listeners ao marcador ${lote.id}`);
            
            if (isMobile) {
                // MOBILE: Apenas clique = tooltip fixo
                marker.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('MOBILE: Clique no marcador', lote.id);
                    
                    if (tooltipFixo) {
                        esconderTooltip();
                        tooltipFixo = false;
                    } else {
                        mostrarTooltipFixo(e, lote);
                        tooltipFixo = true;
                    }
                });
            } else {
                // DESKTOP: Hover + Clique
                marker.addEventListener('mouseenter', function(e) {
                    if (!document.getElementById('sidebar').classList.contains('active')) {
                        console.log('DESKTOP: Hover no marcador', lote.id);
                        mostrarTooltip(e, lote);
                    }
                });
                
                marker.addEventListener('mouseleave', function() {
                    esconderTooltip();
                });
                
                marker.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('DESKTOP: CLIQUE NO MARCADOR', lote.id);
                    selecionarLote(lote.id, this);
                });
                
                console.log(`Listeners adicionados ao marcador ${lote.id}`);
            }
        }, 100 * (index + 1)); // Delay escalonado para cada marcador
    });
}

// Tooltip hover (desktop)
function mostrarTooltip(event, lote) {
    const tooltip = document.getElementById('tooltip');
    
    tooltip.innerHTML = `
        <strong>Quadra ${lote.quadra} - Lote ${lote.lote}</strong><br>
        <small>Área: ${lote.area} m²</small><br>
        <small>Valor: R$ ${lote.valor}</small><br>
        <small>Topografia: ${lote.topografia}</small>
    `;
    tooltip.style.display = 'block';
    tooltip.style.left = (event.pageX + 15) + 'px';
    tooltip.style.top = (event.pageY + 15) + 'px';
}

// Tooltip fixo (mobile)
function mostrarTooltipFixo(event, lote) {
    const tooltip = document.getElementById('tooltip');
    
    tooltip.innerHTML = `
        <strong>Quadra ${lote.quadra} - Lote ${lote.lote}</strong><br>
        <small>Área: ${lote.area} m²</small><br>
        <small>Valor: R$ ${lote.valor}</small><br>
        <small>Topografia: ${lote.topografia}</small>
    `;
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.display = 'block';
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = (rect.top - 80) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
}

function esconderTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
    tooltip.style.transform = '';
}

// DESKTOP: Criar lista de lotes
function criarListaLotes() {
    console.log('criarListaLotes chamado');
    const content = document.getElementById('sidebar-content');
    
    content.innerHTML = lotes.map(lote => `
        <div class="lote-card" data-lote-id="${lote.id}">
            <div class="lote-card-header">
                <div class="lote-card-title">Quadra ${lote.quadra} - Lote ${lote.lote}</div>
                <div class="lote-card-id">${lote.id}</div>
            </div>
            <div class="lote-card-info">
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Área</span>
                    <span class="lote-card-info-value">${lote.area} m²</span>
                </div>
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Valor</span>
                    <span class="lote-card-info-value">R$ ${lote.valor}</span>
                </div>
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Frente</span>
                    <span class="lote-card-info-value">${lote.frente} m</span>
                </div>
                <div class="lote-card-info-item">
                    <span class="lote-card-info-label">Topografia</span>
                    <span class="lote-card-info-value">${lote.topografia}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Adicionar event listener em cada card
    document.querySelectorAll('.lote-card').forEach(card => {
        card.addEventListener('click', function() {
            const loteId = this.dataset.loteId;
            console.log('CLIQUE NO CARD:', loteId);
            selecionarLoteDaLista(loteId);
        });
    });
    
    console.log('Lista de lotes criada com', lotes.length, 'cards');
}

// DESKTOP: Selecionar lote do mapa
function selecionarLote(loteId, marker) {
    console.log('>>> selecionarLote chamado:', loteId, marker);
    esconderTooltip();
    
    // Se clicar no mesmo, fechar
    if (currentSelectedLoteId === loteId) {
        console.log('Mesmo lote, fechando sidebar');
        closeSidebar();
        return;
    }
    
    // Remover seleção anterior
    if (currentSelectedMarker) {
        console.log('Removendo seleção anterior');
        currentSelectedMarker.classList.remove('selected');
    }
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Nova seleção
    console.log('Adicionando classe selected ao marcador');
    marker.classList.add('selected');
    currentSelectedMarker = marker;
    currentSelectedLoteId = loteId;
    
    // Selecionar card
    const card = document.querySelector(`.lote-card[data-lote-id="${loteId}"]`);
    if (card) {
        console.log('Card encontrado, adicionando selected');
        card.classList.add('selected');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        console.log('ERRO: Card não encontrado!');
    }
    
    // Abrir sidebar
    const sidebar = document.getElementById('sidebar');
    console.log('Abrindo sidebar...');
    sidebar.classList.add('active');
    console.log('Sidebar classes:', sidebar.classList.toString());
}

// DESKTOP: Selecionar lote da lista
function selecionarLoteDaLista(loteId) {
    console.log('>>> selecionarLoteDaLista chamado:', loteId);
    const lote = lotes.find(l => l.id === loteId);
    if (!lote) {
        console.log('ERRO: Lote não encontrado!');
        return;
    }
    
    const marker = document.querySelector(`.lote-marker[data-lote-id="${loteId}"]`);
    if (marker) {
        console.log('Marcador encontrado, selecionando...');
        selecionarLote(loteId, marker);
        
        // Centralizar no mapa
        viewer.viewport.panTo(new OpenSeadragon.Point(lote.x, lote.y));
        viewer.viewport.zoomTo(4);
    } else {
        console.log('ERRO: Marcador não encontrado!');
    }
}

// Fechar sidebar
function closeSidebar() {
    console.log('>>> closeSidebar chamado');
    document.getElementById('sidebar').classList.remove('active');
    
    if (currentSelectedMarker) {
        currentSelectedMarker.classList.remove('selected');
        currentSelectedMarker = null;
    }
    
    document.querySelectorAll('.lote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    currentSelectedLoteId = null;
}
